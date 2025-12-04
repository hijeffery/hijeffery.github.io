// main.js - 逻辑控制脚本
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("paper-container");
    const moreContainer = document.getElementById("more_papers");
    const btnContainer = document.getElementById("btn-container");
    const btn = document.getElementById("toggle_btn");

    // 1. 生成论文列表
    papersData.forEach((paper, index) => {
        // 创建论文的 HTML 容器
        const paperDiv = document.createElement("div");
        paperDiv.className = "paper";

        // 生成底部链接按钮 (pdf, code, project page...)
        let linksHtml = "";
        if (paper.links && paper.links.length > 0) {
            paper.links.forEach((link, i) => {
                // 判断是否需要按钮样式 (Project Page, Code, Demo, etc.)
                const isButton = ["project page", "code", "demo", "paper"].includes(link.name.toLowerCase());
                const cssClass = isButton ? 'class="button"' : '';
                
                linksHtml += `<a href="${link.url}" ${cssClass}>${link.name}</a>`;
                
                // 如果不是按钮样式，且不是最后一个，添加分隔符 " / "
                if (!isButton && i < paper.links.length - 1) {
                    // 检查下一个是否也是普通链接，是的话才加分隔符
                    const nextIsButton = ["project page", "code", "demo", "paper"].includes(paper.links[i+1].name.toLowerCase());
                    if (!nextIsButton) {
                        linksHtml += " / ";
                    } else {
                         linksHtml += " "; // 按钮之间加空格
                    }
                } else {
                    linksHtml += " ";
                }
            });
        }

        // 处理标题链接：如果有 website 字段，标题可点击；否则只是普通加粗文本
        const titleHtml = paper.website 
            ? `<a class="paper" href="${paper.website}"><strong>${paper.title}</strong></a>`
            : `<a class="paper"><strong>${paper.title}</strong></a>`;

        const htmlContent = `
            <img class="paper" src="${paper.image}" height="100"/>
            <div>
                ${titleHtml}
                <br /> ${paper.authors}
                <br /> ${paper.venue}
            </div>
            ${linksHtml}
            <div class="spanner"></div>
        `;

        paperDiv.innerHTML = htmlContent;

        // 2. 决定放在“可见区”还是“隐藏区”
        if (index < VISIBLE_COUNT) {
            container.appendChild(paperDiv);
        } else {
            moreContainer.appendChild(paperDiv);
        }
    });

    // 3. 处理按钮逻辑：如果没有隐藏的论文，隐藏“Show All”按钮
    if (moreContainer.children.length === 0) {
        btnContainer.style.display = "none";
    } else {
        updateButtonText(false);
    }
});

function togglePapers() {
    const morePapers = document.getElementById("more_papers");
    const isHidden = (morePapers.style.display === "none");
    
    morePapers.style.display = isHidden ? "block" : "none";
    updateButtonText(isHidden);
}

function updateButtonText(isExpanded) {
    const btn = document.getElementById("toggle_btn");
    const hiddenCount = document.getElementById("more_papers").children.length;

    if (isExpanded) {
        btn.innerHTML = "Show Less Papers ▲";
    } else {
        btn.innerHTML = `Show All Publications (${hiddenCount} more) ▼`;
    }
}