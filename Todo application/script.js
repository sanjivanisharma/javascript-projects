const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask() {
    if(inputBox.value === "") 
        alert("Please enter task")
    else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        listContainer.append(li)
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    inputBox.value = ""
    saveTodos()
}

listContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveTodos()
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove()
        saveTodos()
    }
}, false)

function saveTodos() {
    localStorage.setItem("todos", listContainer.innerHTML)
}

function showTodos() {
    listContainer.innerHTML = localStorage.getItem("todos")
}

showTodos()