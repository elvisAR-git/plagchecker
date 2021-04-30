let report = {}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});


function fetchReport(target) {
    var instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.open()
    let id = target.id;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `fetch/${id}`);
    xhr.onload = function () {
        if (this.status == 200)
        {
            try
            {
                report = JSON.parse(this.response)
            } catch (error)
            {

            }
            instance.close()
            if (this.response)
            {
                M.toast({
                    html: `Loaded ${report.dump.originalname}`,
                    classes: "green rounded"
                })
                showReport()
            } else
            {
                M.toast({
                    html: 'Processing file, try again later',
                    classes: "orange white-text"
                })
            }
        }
    };
    xhr.send();
}

function showReport() {
    try
    {
        document.getElementById("none").remove()
    } catch (error)
    {

    }
    document.getElementById("list").childNodes.forEach(element => {
        try
        {
            element.classList.remove("active")
        } catch (err)
        {

        }
    });

    // progress bar params
    document.getElementById(report._id).classList.add("active")
    document.getElementById("report").classList.remove("hide")
    // console.log(report.unique, report)
    document.getElementById("progressbar").setAttribute("style", "width :" + report.unique + "%")
    document.getElementById("unique").innerText = `About ${Math.round(report.unique)}% unique`


    if (report.unique < 100)
    {
        document.getElementById("description").textContent = `We found similarities in ${report.relations.length} different file(s)`

        document.getElementById("lines").textContent = `${report.plagiarised_lines.length} Line(s) of code shared similar text with other files`

        document.getElementById("similar-files").innerHTML = ''
        report.relations.forEach(file => {
            let li = document.createElement("li")
            let similarities = report.report.report.filter(sim => {
                if (file._id === sim.file)
                {
                    return sim
                }
            })
            similarities = similarities[0]

            let included_lines = []

            let safe_array = []
            for (let index = 0; index < similarities.similarities.length; index++)
            {
                if (included_lines.includes(similarities.similarities[index].sourceLine))
                {
                    similarities.similarities.splice(index, 1)

                } else
                {
                    safe_array.push(similarities.similarities[index])
                    included_lines.push(similarities.similarities[index].sourceLine)
                }


            }
            console.log(included_lines)
            li.innerHTML = `<a href="compare/${report._id}/${file._id}"><div><i class="material-icons">description</i>
            <span>${file.dump.originalname}<span>
            <span class="badge blue grey-text lighten-5">${similarities.similarities.length} similarlities</span> <span class="badge red white-text">${safe_array.length} instances</span>
          </div></a>`
            li.classList.add('collection-item')
            document.getElementById('similar-files').appendChild(li)
        });
    } else
    {
        document.getElementById("similar-files").innerHTML = `<li class="collection-item">No files</li>`
        document.getElementById("lines").innerText = "all lines are unique"
        document.getElementById("description").innerText = "No similar files found"
    }

}