document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function showModal() {
    var instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.open()
}

const file = document.querySelector("#file");
file.addEventListener("change", (e) => {
    // Get the selected file
    const fileObj = e.target.files;
    var files = []
    for (var i = 0, l = fileObj.length; i < l; i++)
    {
        files.push(fileObj[i])
    }
    console.log(files);

    var fileList = document.getElementById("fileList");
    if (files)
    {
        document.getElementById("no-file").remove()
        document.getElementById("upload").disabled = false
    }
    files.forEach(file => {
        let collection = document.createElement("li")
        collection.classList.add("collection-item")
        collection.innerHTML = `<i class="material-icons">description</i>${file.name}`
        fileList.appendChild(collection)
    });
});