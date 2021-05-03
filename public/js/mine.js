var icons = window.FileIcons;
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

    var fileList = document.getElementById("fileList");
    fileList.classList.add("collection")
    if (files)
    {
        try
        {
            document.getElementById("no-file").remove()
        } catch (error)
        {

        }
        document.getElementById("upload").disabled = false
    }
    files.forEach(file => {
        let collection = document.createElement("li")
        collection.classList.add("collection-item")
        collection.classList.add("avatar")
        collection.innerHTML = `<i class="${icons.getClass(file.name)} circle"></i><p>${file.name}</p> <span class="grey-text">${Math.round(file.size / 1024)}KB</span>`
        fileList.appendChild(collection)
    });
});