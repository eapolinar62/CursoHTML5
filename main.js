// JavaScript source code

let form = document.getElementById("form");
let textinput = document.getElementById("textinput");
let msg = document.getElementById("msg");
let data = []; // almacenamos la info del formulario
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let cont;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {

    if (form.textinput.value === "") {
        console.log("error form");
        msg.innerHTML = "La tarea no puede ser vac�a";
        /*return;*/
    }
    else {
        console.log("OK form");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        });
    }

};


let acceptData = () => {
    /*
    data["text      "] = form.textinput.value;
    data["date      "] = form.dateinput.value;
    data["textarea  "] = form.textarea.value;
    createTask();
    console.log(data); */
    

    data.push({
        text: form.textinput.value,
        date:form.dateinput.value,
        textarea:form.textarea.value
    });
    console.log(data);
    
    localStorage.setItem("data", JSON.stringify(data));   
    createTask();
};

let createTask = () => {
    tasks.innerHTML = " ";
     data.map((x, y) => {
        return (tasks.innerHTML += `
            <div>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secundary">${x.date}</span>
                <p>${x.textarea}</p>
                <span class="options">
                    <i onclick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                    <i onclick ="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                </span>
            </div>`);
    });
    

  /*  tasks.innerHTML += `
    <div>
        <span class="fw-bold">${data.text}</span>
        <span class="small text-secundary">${data.date}</span>
        <p>${data.textarea}</p>
        <span class="options">
            <i onclick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onclick ="deleteTask(this)" class="fa-solid fa-trash-can"></i>
        </span>
    </div>`*/

    resetForms();
};

let resetForms = () => {
    form.textinput.value = "";
    form.dateinput.value = "";
    form.textarea.value = "";

};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    //seleccionar la tarjeta
    let selectTask = e.parentElement.parentElement;

    //llenar formularios
    form.textinput.value = selectTask.children[0].innerHTML;
    form.dateinput.value = selectTask.children[1].innerHTML;
    form.textarea.value = selectTask.children[2].innerHTML;

    selectTask.remove();
};



let listTasks = () => {

    data.map((x, y) => {
        return (tasks.innerHTML += `
            <div>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secundary">${x.date}</span>
                <p>${x.textarea}</p>
                <span class="options">
                    <i onclick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                    <i onclick ="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                </span>
            </div>`);
    });
    
};

// funcion que recupera los datos del localstorage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
    console.log(data);
    
})();
