// ==UserScript==
// @name        Bitbucket server need-work-pr highlighter
// @namespace   rogama25
// @version     1.2
// @author      rogama25
// @description Highlights when a PR needs work in Bitbucket server
// ==/UserScript==

window.addEventListener('load', async function() {
    const result = await fetch("/rest/api/latest/dashboard/pull-requests?limit=1000&state=OPEN")
    const data = await result.json()

    const paint = function () {
        setTimeout(() => {
            const prRows = document.querySelectorAll(".dashboard-pull-request-table .pull-request-row")
            data.values.forEach(pr => {
                if (pr.reviewers.some(r => r.status === "NEEDS_WORK")) {
                    const row = Array.from(prRows).find(row => row.querySelector("a").href.includes(pr.links.self[0].href))
                    if (!row) return
                    row.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
                }
            })
        },100)
    }
    paint()
    const observer = new MutationObserver(() => paint())
    Array.from(this.document.getElementsByTagName("table")).forEach(tb => observer.observe(tb, {childList: true, subtree:true}))
});
