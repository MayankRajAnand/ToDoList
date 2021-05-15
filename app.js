const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

const check = "fa-check-circle";
const uncheck = "fa-circle";
const line = "lineThrough";

let listarr, id;

let data = localStorage.getItem("TODO");


if (data) {
    listarr = JSON.parse(data);
    id = listarr.length;
    loadList(listarr);
}
else {
    listarr = [],
        id = 0;
}


function loadList(arr) {
    arr.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
// Date

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

date.innerHTML = today.toLocaleDateString('en-US', options);

// End of Date

function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? check : uncheck;
    const line = done ? line : "";
    const item = `
    <li class="item"> 
    <i class="far fa-circle ${DONE} co" job="complete" id=${id}></i>
    <p class="text" ${line}>${toDo}</p>
    <i class="fa fa-trash-alt de" job="delete" id=${id}></i></li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo);
            listarr.push({
                name: toDo,
                id: id,
                done: false,
                trash: false

            });
            input.value = "";
            localStorage.setItem("TODO", JSON.stringify(listarr));
            id++;


        }



    }





});
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line);

    listarr[element.id].done = listarr[element.id].done ? false : true;

}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listarr[element.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;//returns the clicked element iside the list
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {

        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO".JSON.stringify(listarr));
})