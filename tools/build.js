#!/usr/bin/env node
/*
 * tools/build.js
 *
 * 将 src/papers.js 预渲染为静态 HTML，并生成面向搜索引擎与大模型的机器可读元数据。
 * 原先论文列表由浏览器端 JavaScript 动态生成，不执行 JS 的爬虫与大模型网页读取工具看到的是空列表；
 * 构建后，论文列表直接写入 index.html，同时生成：
 *   - index.html 中的 Open Graph 标签与 schema.org JSON-LD（Person + ScholarlyArticle）
 *   - llms.txt     纯文本/Markdown 版个人简介与完整论文列表
 *   - sitemap.xml  主页与本站托管的 PDF
 *
 * 用法（仓库根目录）：  node tools/build.js
 * 依赖：Node.js >= 12，无第三方包。git pre-commit 钩子会在提交时自动运行本脚本。
 *
 * 需要手工维护的内容：
 *   - src/papers.js            论文数据（唯一数据源）
 *   - index.html 中 <meta name="description"> 与 <p id="bio">  （简介，构建时同步到 JSON-LD 与 llms.txt）
 *   - 本文件顶部的 PERSON / PROFILES / EXTRA_SAME_AS            （档案链接，构建时生成图标行与 sameAs）
 * index.html 中 <!-- BUILD:xxx:START --> 与 <!-- BUILD:xxx:END --> 之间的内容会被覆盖，请勿手工编辑。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://hijeffery.github.io/';

// ---------------------------------------------------------------------------
// 作者与档案信息
// ---------------------------------------------------------------------------
const PERSON = {
  name: 'Lingyan Ran',
  nameZh: '冉令燕',
  givenName: 'Lingyan',
  familyName: 'Ran',
  jobTitle: 'Professor',
  image: 'Photos/lran.png',
  department: {
    name: 'School of Computer Science, Northwestern Polytechnical University',
    url: 'https://jsj.nwpu.edu.cn/en/Home.htm',
  },
  organization: {
    name: 'Northwestern Polytechnical University',
    alternateName: ['NWPU', '西北工业大学'],
    url: 'https://en.nwpu.edu.cn/',
  },
  knowsAbout: [
    'Computer vision',
    'Remote sensing image interpretation',
    'Semantic segmentation',
    'Change detection',
    'Low-altitude UAV perception',
    'Infrared small target detection',
    'Semi-supervised learning',
    'Continual learning',
    'Efficient deep learning on resource-constrained and domestic computing platforms',
    'Aerospace intelligent computing',
  ],
  memberOf: [
    { name: 'China Computer Federation (CCF)', url: 'https://www.ccf.org.cn/' },
    { name: 'China Society of Image and Graphics (CSIG)', url: 'http://www.csig.org.cn/' },
    { name: 'Chinese Association of Automation (CAA)', url: 'https://www.caa.org.cn/' },
  ],
};

// 出现在 "All publications and tech reports" 图标行中的档案
const PROFILES = [
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=e0zDEvcAAAAJ&hl=en', icon: 'Photos/scholar.png' },
  { name: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=55351990600', icon: 'Photos/scopus.png' },
  { name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/LBH-7199-2024', icon: 'Photos/webofs.png' },
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Lingyan-Ran', icon: 'Photos/rg.png' },
  { name: 'DBLP', url: 'https://dblp.org/pid/118/3505.html', icon: 'Photos/dblp.webp' },
  { name: 'Semantic Scholar', url: 'https://www.semanticscholar.org/author/Lingyan-Ran/2769063', icon: 'Photos/semantic.png' },
  { name: 'SciProfiles', url: 'https://sciprofiles.com/profile/lran', icon: 'Photos/SciProfiles.png' },
];

// 不显示图标、仅写入 JSON-LD sameAs 的身份链接（注册 ORCID 后建议加在这里）
const EXTRA_SAME_AS = [
  'http://teacher.nwpu.edu.cn/lran.html',
  'https://github.com/hijeffery',
];

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const TODAY = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const LAST_UPDATE = `Last update: ${MONTHS[now.getMonth()]} ${now.getFullYear()}.`;

const stripTags = s => String(s || '').replace(/<[^>]*>/g, '');
const decodeEntities = s => s
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const plain = s => decodeEntities(stripTags(s)).replace(/\s+/g, ' ').trim();
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// HTML 属性中的 URL：空格转 %20，裸 & 转 &amp;
const hrefAttr = u => String(u || '').replace(/ /g, '%20').replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;');
const absUrl = u => {
  if (!u) return '';
  try { return new URL(String(u).replace(/ /g, '%20'), SITE_URL).href; } catch (e) { return ''; }
};
const isRemote = u => /^[a-z]+:/i.test(String(u || ''));
const CIRCLED_NUM = /[①-⑳]\s*/g; // ① – ⑳（主页上用于标注期刊序号，机器可读输出中去掉）
const cleanVenue = v => plain(v).replace(CIRCLED_NUM, '').replace(/[\s.]+$/, '').trim();
const yearOf = p => { const m = plain(p.venue).match(/\b(?:19|20)\d{2}\b/); return m ? m[0] : ''; };
const doiOf = p => {
  const m = (plain(p.venue) + ' ' + (p.website || '')).match(/\b10\.\d{4,9}\/[^\s"<>,;]+/);
  return m ? m[0].replace(/\.(?:short|full|abstract|pdf)$/i, '').replace(/[.)]+$/, '') : '';
};
const authorsOf = p => plain(p.authors)
  .replace(/\.$/, '')
  .split(/\s*,\s*(?:and\s+)?|\s+and\s+/)
  .map(a => a.replace(/[*^]+$/g, '').trim())
  .filter(a => a && !/^etc\.?$/i.test(a));
const isSelf = name => /^lingyan ran$/i.test(name);
const findLink = (p, re) => (p.links || []).find(l => re.test(l.name));

// ---------------------------------------------------------------------------
// 读取数据
// ---------------------------------------------------------------------------
function loadPapers() {
  const file = path.join(ROOT, 'src', 'papers.js');
  const code = fs.readFileSync(file, 'utf8');
  return vm.runInNewContext(
    code + '\n;({ VISIBLE_COUNT: VISIBLE_COUNT, papersData: papersData });',
    {}, { filename: file });
}

function paperIds(papers) {
  const used = new Set();
  return papers.map(p => {
    const m = String(p.image || '').match(/^Papers\/([^/]+)\//);
    let base = m ? m[1] : plain(p.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
    base = 'pub-' + base.toLowerCase();
    let id = base;
    for (let k = 2; used.has(id); k++) id = `${base}-${k}`;
    used.add(id);
    return id;
  });
}

function readHandWritten(html) {
  const d = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const b = html.match(/<p\b[^>]*\bid="bio"[^>]*>([\s\S]*?)<\/p>/i);
  if (!d) throw new Error('index.html 缺少 <meta name="description" content="...">');
  if (!b) throw new Error('index.html 缺少 <p id="bio">...</p>');
  return { description: decodeEntities(d[1]), bio: plain(b[1]) };
}

// ---------------------------------------------------------------------------
// 渲染：论文条目（与原 main.js 的版式一致）
// ---------------------------------------------------------------------------
const BUTTON_NAMES = ['project page', 'code', 'demo', 'paper'];

function renderLinks(links) {
  let h = '';
  (links || []).forEach((link, i) => {
    const isButton = BUTTON_NAMES.includes(link.name.toLowerCase());
    h += `<a href="${hrefAttr(link.url)}"${isButton ? ' class="button"' : ''}>${link.name}</a>`;
    if (!isButton && i < links.length - 1) {
      h += BUTTON_NAMES.includes(links[i + 1].name.toLowerCase()) ? ' ' : ' / ';
    } else {
      h += ' ';
    }
  });
  return h.trim();
}

function renderPaper(p, id) {
  const title = p.website
    ? `<a class="paper" href="${hrefAttr(p.website)}"><strong>${p.title}</strong></a>`
    : `<a class="paper"><strong>${p.title}</strong></a>`;
  const links = renderLinks(p.links);
  return [
    `<div class="paper" id="${id}">`,
    `  <img class="paper" src="${hrefAttr(p.image)}" height="100" alt="${escAttr(plain(p.title))}" loading="lazy" />`,
    `  <div>`,
    `    ${title}`,
    `    <br /> ${p.authors}`,
    `    <br /> ${p.venue}`,
    `  </div>`,
    links ? `  ${links}` : null,
    `  <div class="spanner"></div>`,
    `</div>`,
  ].filter(x => x !== null).join('\n');
}

function renderProfiles() {
  return PROFILES.map(pf =>
    `<a href="${hrefAttr(pf.url)}" target="_blank" rel="me noopener" title="${escAttr(pf.name)}" ` +
    `style="display: inline-flex; align-items: center; text-decoration: none;">` +
    `<img src="${pf.icon}" alt="${escAttr(pf.name)}" style="width:20px; height:20px; margin-right:4px; vertical-align:middle;"></a>`
  ).join('\n');
}

// ---------------------------------------------------------------------------
// 渲染：<head> 中的 Open Graph 与 JSON-LD
// ---------------------------------------------------------------------------
function buildJsonLd(papers, ids, meta) {
  const personId = SITE_URL + '#person';
  const org = {
    '@type': 'CollegeOrUniversity',
    name: PERSON.organization.name,
    alternateName: PERSON.organization.alternateName,
    url: PERSON.organization.url,
    department: { '@type': 'Organization', name: PERSON.department.name, url: PERSON.department.url },
  };
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: PERSON.name,
    alternateName: [PERSON.nameZh],
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: PERSON.jobTitle,
    description: meta.bio,
    url: SITE_URL,
    image: absUrl(PERSON.image),
    worksFor: org,
    affiliation: org,
    alumniOf: { '@type': 'CollegeOrUniversity', name: PERSON.organization.name, url: PERSON.organization.url },
    memberOf: PERSON.memberOf.map(o => ({ '@type': 'Organization', name: o.name, url: o.url })),
    knowsAbout: PERSON.knowsAbout,
    sameAs: PROFILES.map(p => p.url).concat(EXTRA_SAME_AS),
  };
  const page = {
    '@type': 'ProfilePage',
    '@id': SITE_URL + '#profilepage',
    url: SITE_URL,
    name: `${PERSON.name} (${PERSON.nameZh})`,
    description: meta.description,
    inLanguage: 'en',
    dateModified: TODAY,
    mainEntity: { '@id': personId },
  };
  const articles = papers.map((p, i) => {
    const a = {
      '@type': 'ScholarlyArticle',
      '@id': SITE_URL + '#' + ids[i],
      name: plain(p.title),
      author: authorsOf(p).map(n => (isSelf(n) ? { '@id': personId } : { '@type': 'Person', name: n })),
    };
    const year = yearOf(p);
    if (year) a.datePublished = year;
    const venue = cleanVenue(p.venue);
    if (venue) a.isPartOf = { '@type': 'CreativeWork', name: venue };
    if (p.website) a.url = absUrl(p.website);
    const doi = doiOf(p);
    if (doi) {
      a.identifier = { '@type': 'PropertyValue', propertyID: 'DOI', value: doi };
      a.sameAs = 'https://doi.org/' + doi;
    }
    const pdf = findLink(p, /^(pdf|paper)$/i);
    if (pdf) a.encoding = { '@type': 'MediaObject', contentUrl: absUrl(pdf.url), encodingFormat: 'application/pdf' };
    return a;
  });
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [page, person].concat(articles) }, null, 2);
  return json.replace(/<\//g, '<\\/');
}

function renderHead(papers, ids, meta) {
  const title = `${PERSON.name} (${PERSON.nameZh})`;
  return [
    `<meta property="og:type" content="profile">`,
    `<meta property="og:title" content="${escAttr(title)}">`,
    `<meta property="og:description" content="${escAttr(meta.description)}">`,
    `<meta property="og:url" content="${SITE_URL}">`,
    `<meta property="og:image" content="${absUrl(PERSON.image)}">`,
    `<meta property="profile:first_name" content="${PERSON.givenName}">`,
    `<meta property="profile:last_name" content="${PERSON.familyName}">`,
    `<meta name="twitter:card" content="summary">`,
    `<script type="application/ld+json">`,
    buildJsonLd(papers, ids, meta),
    `</script>`,
  ].join('\n');
}

// ---------------------------------------------------------------------------
// 渲染：llms.txt 与 sitemap.xml
// ---------------------------------------------------------------------------
function buildLlmsTxt(papers, ids, meta) {
  const L = [];
  L.push(`# ${PERSON.name} (${PERSON.nameZh})`, '');
  L.push(`> ${meta.description}`, '');
  L.push(meta.bio, '');
  L.push('## Profiles', '');
  L.push(`- [Homepage](${SITE_URL})`);
  L.push(`- [NWPU faculty page](http://teacher.nwpu.edu.cn/lran.html)`);
  PROFILES.forEach(p => L.push(`- [${p.name}](${p.url})`));
  L.push('', '## Publications', '');
  L.push('Same order as on the homepage. "*" marks the corresponding author; "^" marks co-first authors.', '');
  papers.forEach((p, i) => {
    const url = p.website ? absUrl(p.website) : `${SITE_URL}#${ids[i]}`;
    let line = `- [${plain(p.title)}](${url}): ${plain(p.authors).replace(/[\s.]+$/, '')}. ${cleanVenue(p.venue)}.`;
    (p.links || []).forEach(l => {
      if (/^bibtex$/i.test(l.name)) return;
      const label = /^(pdf|paper)$/i.test(l.name) ? 'PDF' : l.name;
      line += ` [${label}](${absUrl(l.url)})`;
    });
    L.push(line);
  });
  L.push('', `Generated from ${SITE_URL} on ${TODAY}.`, '');
  return L.join('\n');
}

function buildSitemap(papers) {
  const urls = [{ loc: SITE_URL, lastmod: TODAY }];
  const seen = new Set([SITE_URL]);
  const add = u => {
    if (!u || isRemote(u) || !/\.pdf$/i.test(u)) return;
    if (!fs.existsSync(path.join(ROOT, u))) return;
    const loc = absUrl(u);
    if (!seen.has(loc)) { seen.add(loc); urls.push({ loc }); }
  };
  papers.forEach(p => { add(p.website); (p.links || []).forEach(l => add(l.url)); });
  const esc = s => s.replace(/&/g, '&amp;');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`),
    '</urlset>',
    '',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// 写入
// ---------------------------------------------------------------------------
function replaceBlock(html, name, content, indent) {
  const re = new RegExp(`(<!-- BUILD:${name}:START -->)[\\s\\S]*?(<!-- BUILD:${name}:END -->)`);
  if (!re.test(html)) throw new Error(`index.html 中缺少标记 <!-- BUILD:${name}:START/END -->`);
  const inner = content.includes('\n') || indent
    ? '\n' + content.split('\n').map(l => (l ? indent + l : l)).join('\n') + '\n' + indent
    : content;
  return html.replace(re, (_, a, b) => a + inner + b);
}

function writeIfChanged(rel, content) {
  const file = path.join(ROOT, rel);
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (old === content) return false;
  fs.writeFileSync(file, content);
  return true;
}

function main() {
  const { VISIBLE_COUNT, papersData: papers } = loadPapers();
  const ids = paperIds(papers);
  const indexFile = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(indexFile, 'utf8');
  const meta = readHandWritten(html);

  // 检查本地文件是否存在
  const warnings = [];
  papers.forEach(p => {
    const refs = [p.image, p.website].concat((p.links || []).map(l => l.url));
    refs.forEach(u => {
      if (u && !isRemote(u) && !fs.existsSync(path.join(ROOT, decodeURI(u.split('#')[0])))) {
        warnings.push(`  缺失文件: ${u}  (${plain(p.title).slice(0, 60)})`);
      }
    });
    if (!yearOf(p)) warnings.push(`  未识别年份: ${plain(p.title).slice(0, 60)}  venue="${plain(p.venue)}"`);
  });

  const visible = papers.slice(0, VISIBLE_COUNT);
  const more = papers.slice(VISIBLE_COUNT);
  html = replaceBlock(html, 'HEAD', renderHead(papers, ids, meta), '  ');
  html = replaceBlock(html, 'PROFILES', renderProfiles(), '  ');
  html = replaceBlock(html, 'PAPERS', visible.map((p, i) => renderPaper(p, ids[i])).join('\n'), '    ');
  html = replaceBlock(html, 'MORE', more.map((p, i) => renderPaper(p, ids[VISIBLE_COUNT + i])).join('\n'), '    ');
  html = replaceBlock(html, 'BUTTON', more.length ? `Show All Publications (${more.length} more) ▼` : '', '');
  html = replaceBlock(html, 'UPDATED', LAST_UPDATE, '');

  const changed = [];
  if (writeIfChanged('index.html', html)) changed.push('index.html');
  if (writeIfChanged('llms.txt', buildLlmsTxt(papers, ids, meta))) changed.push('llms.txt');
  if (writeIfChanged('sitemap.xml', buildSitemap(papers))) changed.push('sitemap.xml');

  console.log(`[build] ${papers.length} 篇论文（默认展示 ${visible.length} 篇，折叠 ${more.length} 篇）`);
  console.log(`[build] 已更新: ${changed.length ? changed.join(', ') : '无变化'}`);
  if (warnings.length) console.log('[build] 提示:\n' + warnings.join('\n'));
}

main();
