// main.js - 论文列表折叠/展开
//
// 论文条目已由 tools/build.js 预渲染进 index.html（不执行 JavaScript 的爬虫和大模型也能读到完整列表）。
// 本脚本只负责交互：<head> 中的内联脚本为 <html> 添加 "js" 类，CSS 据此默认折叠 #more_papers；
// 禁用 JavaScript 时全部论文直接显示。

document.addEventListener("DOMContentLoaded", function () {
    var morePapers = document.getElementById("more_papers");
    var btnContainer = document.getElementById("btn-container");
    if (!morePapers || morePapers.children.length === 0) {
        if (btnContainer) btnContainer.style.display = "none";
        return;
    }
    // 通过锚点（如 #pub-17-sppf）直接访问折叠区中的论文时，自动展开
    var target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target && morePapers.contains(target)) {
        morePapers.classList.add("expanded");
        target.scrollIntoView();
    }
    updateButtonText(morePapers.classList.contains("expanded"));
});

function togglePapers() {
    var morePapers = document.getElementById("more_papers");
    var expanded = morePapers.classList.toggle("expanded");
    updateButtonText(expanded);
}

function updateButtonText(isExpanded) {
    var btn = document.getElementById("toggle_btn");
    var hiddenCount = document.getElementById("more_papers").children.length;
    btn.innerHTML = isExpanded
        ? "Show Less Papers ▲"
        : "Show All Publications (" + hiddenCount + " more) ▼";
}
