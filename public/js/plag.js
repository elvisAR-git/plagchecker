let report = {}
var icons = window.FileIcons;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);


    var side_nav = document.querySelectorAll('.sidenav');

    let nav = M.Sidenav.init(side_nav);
    nav[0].open()

    var elems_collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems_collapsible);
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
            instance.close()
            if (this.response)
            {
                if (JSON.parse(this.response).isError)
                {
                    M.toast({
                        html: JSON.parse(this.response).message,
                        classes: "orange white-text"
                    })
                    return

                } else
                {
                    report = JSON.parse(this.response).file
                    console.log(report)
                }
                M.toast({
                    html: `Loaded ${report.dump.originalname}`,
                    classes: "green rounded"
                })
                showReport()
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
            li.innerHTML = `<i class="${icons.getClass(file.dump.originalname)} circle"></i>
            
            <div class="col s8">
                <div class="progress grey lighten-3">
                    <div class="determinate red" style="width:${(safe_array.length * 100) / report.total}%"></div>
                </div>
            <div>
            
            <span class="badge blue grey-text lighten-5">${similarities.similarities.length} similarlities</span>
            <span class="badge title text-lighten-3 teal-text">${file.dump.originalname}</span>
            <a href="compare/${report._id}/${file._id}" class="secondary-content btn btn-flat blue white-text waves-effect waves-light">compare</a>`
            li.classList.add('collection-item')
            li.classList.add('collection-item')
            li.classList.add('avatar')
            li.classList.add('tooltipped')
            li.setAttribute("data-position", "right")
            li.setAttribute("data-tooltip", `${Math.round(((safe_array.length * 100) / report.total))}% similar`)
            if (((safe_array.length * 100) / report.total) > 49 && ((safe_array.length * 100) / report.total) < 60)
            {
                li.classList.add('pink')
                li.classList.add('lighten-5')
            }

            if (((safe_array.length * 100) / report.total) > 59 && ((safe_array.length * 100) / report.total) < 70)
            {
                li.classList.add('pink')
                li.classList.add('lighten-4')
            }
            if (((safe_array.length * 100) / report.total) > 69)
            {
                li.classList.add('pink')
                li.classList.add('lighten-3')
            }
            if (((safe_array.length * 100) / report.total) > 29 && ((safe_array.length * 100) / report.total) < 50)
            {
                li.classList.add('yellow')
                li.classList.add('lighten-5')
            }
            if (((safe_array.length * 100) / report.total) > 14 && ((safe_array.length * 100) / report.total) < 30)
            {
                li.classList.add('yellow')
                li.classList.add('lighten-5')
            }
            document.getElementById('similar-files').appendChild(li)
        });
    } else
    {
        document.getElementById("similar-files").innerHTML = `<div><i class="material-icons large">sentiment_satisfied</i><p>Nothing here</p></div>`
        document.getElementById("lines").innerText = "all lines are unique"
        document.getElementById("description").innerText = "No similar files found"
    }
    let Toolelems = document.querySelectorAll('.tooltipped');
    let Toolinstances = M.Tooltip.init(Toolelems);
}