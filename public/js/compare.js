let stateObj = {}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });
    let url = document.URL.replace("compare", "report")

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
        if (this.status == 200)
        {
            try
            {
                stateObj = JSON.parse(this.response)
            } catch (error)
            {

            }

            if (this.response)
            {
                loadCode()
                M.toast({
                    html: "Successfully loaded!",
                    classes: "green white-text"
                })
            } else
            {
                M.toast({
                    html: 'An error occured, try again later',
                    classes: "red white-text"
                })
            }
        }
    };
    xhr.send();
})

function smoothScroll(event, target) {
    target.classList.remove("pink-text")
    target.classList.add("blue-text")
    target.classList.remove("text-lighten-1")
    window.target = target
    let t = target.id
    setTimeout(() => {
        document.getElementById(t).classList.remove("blue-text")
        document.getElementById(t).classList.add("pink-text")
        document.getElementById(t).classList.add("text-lighten-1")
    }, 4000)

    var scrollContainer = target;
    do
    { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    var targetY = -280
    do
    { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function (c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
function getMatchRefLine(lineNumber, target_objs) {

    for (let index = 0; index < target_objs.length; index++)
    {
        const obj = target_objs[index];
        if (lineNumber + 1 === obj.sourceLine)
        {
            return { palgLine: obj.palgLine, text: obj.lineText }
        }
    }
}
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getTextRange(from, to, list) {
    let text = ''
    list = list.slice(from, to)

    list.forEach(element => {
        text += "<br>" + `<span class="white-text blurry-text">` + escapeHtml(element) + "</span>"
    });
    return text
}


function back() {
    history.back()
}



function loadCode() {
    // console.log(stateObj.report)
    document.getElementById("loader").remove()
    let similarities = stateObj.report.similarities
    let plag_target_lines = []
    let plag_reference_lines = []

    let target_objs = []

    similarities.forEach(s => {
        plag_target_lines.push(s.sourceLine)
        target_objs.push({ sourceLine: s.sourceLine, palgLine: s.palgLine, lineText: s.line2 })
        plag_reference_lines.push(s.palgLine)
    });
    let index = 0

    stateObj.reference_file_raw.forEach(line => {
        let span = document.createElement("small")
        span.innerText = `${index + 1} ${line}`
        if (plag_reference_lines.includes(index + 1))
        {
            span.classList.add("pink-text")
            span.classList.add("text-lighten-1")
            span.classList.add("lime")
            span.classList.add("lighten-4")
            span.setAttribute("id", `ref${index + 1}`)

        } else
        {
            span.classList.add("grey-text")
        }

        document.getElementById("reference_file").appendChild(span)
        index += 1
    });

    index = 0

    stateObj.target_file_raw.forEach(line => {
        let span = document.createElement("small")
        span.innerText = `${index + 1} ${line}`
        if (plag_target_lines.includes(index + 1))
        {
            span.classList.add("red-text")
            span.classList.add("pink")
            span.classList.add("lighten-5")

            span.classList.add('tooltipped')
            span.setAttribute("data-position", "right")

            span.setAttribute("onclick", `smoothScroll(this,document.getElementById("ref" + ${getMatchRefLine(index, target_objs).palgLine}))`)
            span.setAttribute("data-tooltip", `<p class="white-text darken-3 small">Matches line ${getMatchRefLine(index, target_objs).palgLine} of ${stateObj.reference_file.dump.originalname}<p><hr class="white">
            <pre><code>${getTextRange(getMatchRefLine(index, target_objs).palgLine - 5, getMatchRefLine(index, target_objs).palgLine - 1, stateObj.reference_file_raw)}<br>${escapeHtml(getMatchRefLine(index, target_objs).text)}${getTextRange(getMatchRefLine(index, target_objs).palgLine, getMatchRefLine(index, target_objs).palgLine + 4, stateObj.reference_file_raw)}<code></pre>`)
        } else
        {
            span.classList.add("grey-text")
        }
        document.getElementById("target_file").appendChild(span)

        index += 1
    });



    let Toolelems = document.querySelectorAll('.tooltipped');
    let Toolinstances = M.Tooltip.init(Toolelems);
}