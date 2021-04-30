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
                M.toast({
                    html: "Successfully loaded!",
                    classes: "green white-text"
                })
                loadCode()
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

function back() {
    history.back()
}

function loadCode() {
    // console.log(stateObj.report)
    document.getElementById("loader").remove()
    let similarities = stateObj.report.similarities
    let plag_target_lines = []
    let plag_reference_lines = []

    similarities.forEach(s => {
        plag_target_lines.push(s.sourceLine)
        plag_reference_lines.push(s.palgLine)
    });

    let index = 0

    stateObj.target_file_raw.forEach(line => {
        let span = document.createElement("span")
        span.innerText = `${index + 1} ${line}`
        if (plag_target_lines.includes(index + 1))
        {
            span.classList.add("red-text")
        } else
        {
            span.classList.add("grey-text")
        }

        document.getElementById("target_file").appendChild(span)
        document.getElementById("target_file").appendChild(document.createElement("br"))
        index += 1
    });


    index = 0

    stateObj.reference_file_raw.forEach(line => {
        let span = document.createElement("span")
        span.innerText = `${index + 1} ${line}`
        if (plag_reference_lines.includes(index + 1))
        {
            span.classList.add("red-text")
        } else
        {
            span.classList.add("grey-text")
        }

        document.getElementById("reference_file").appendChild(span)
        document.getElementById("reference_file").appendChild(document.createElement("br"))
        index += 1
    });

}