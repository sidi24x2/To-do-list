function main() {

let rootElement = document.querySelector(`ul`);
let screen = document.querySelector(`#display`);

let toDo = localStorage.toDoList ? JSON.parse(localStorage.getItem(`toDoList`)) : [];
let completedToDo = [];
let active_todo = [];
let all_todo = [];
let active_btn = document.querySelector(`button`);
let completed_btn = active_btn.nextElementSibling;
let all_btn = completed_btn.nextElementSibling;
let clear_btn = all_btn.nextElementSibling;
// Event on entering a name : 
screen.addEventListener(`keypress` , (event) => {
  if(event.key == `Enter` && event.target.value !== "") {
    toDo.push( {
      name : event.target.value ,
      idDone : false
    })
    toDoUI(toDo);
    localStorage.setItem(`toDoList` , JSON.stringify(toDo));

  }   
})

// Creating the toDo Application !! -> 

function toDoUI(obj = toDo) {
  rootElement.innerHTML =``;
  obj.forEach((thing,index) => {
    let label = document.createElement(`label`);
    label.for = index;
    label.classList.add(`flex`);
    let div = document.createElement(`div`);
    div.classList.add(`flex` ,`start` , `max-width`)
    let input = document.createElement(`input`);
    input.type = `checkbox`;
    input.checked = thing.isDone;
    input.id = index;
    input.addEventListener(`change`, inputHandler);
    let p = document.createElement(`p`);
    p.innerText = thing.name;
    div.append(input , p);
    let span = document.createElement(`span`);
    span.innerText = `❌`;
    span.setAttribute(`data-id` ,index);
    span.addEventListener(`click` ,closeHandler);
    label.append(div, span);
    rootElement.append(label);
    screen.value = ``;
    localStorage.setItem(`toDoList` , JSON.stringify(toDo));
  })
}

// Adding Close Handler -> 

function closeHandler(event) {
   let value = event.target.dataset.id;
   toDo.splice(value , 1)
  toDoUI(toDo);
  localStorage.setItem(`toDoList` , JSON.stringify(toDo));
}


// All Todo's



// CheckBox Handler ->

function inputHandler(event) {
  let value = event.target.id;
  toDo[value].isDone = !toDo[value].isDone;
  toDoUI()
  activeBtn(all_btn);
  localStorage.setItem(`toDoList` , JSON.stringify(toDo));
}



active_btn.addEventListener(`click` , () => {
  active_todo = toDo.filter(ele => ele.isDone !== true); 
  toDoUI(active_todo);
  activeBtn(active_btn);
})

completed_btn.addEventListener(`click` , () => {
  completedToDo = toDo.filter(ele => ele.isDone === true);
  toDoUI(completedToDo);
  activeBtn(completed_btn);
})

all_btn.addEventListener(`click` , () => {
  toDoUI();
  activeBtn(all_btn);
})

clear_btn.addEventListener(`click` ,() => {
  toDo = toDo.filter(ele => ele.isDone !== true);
  localStorage.setItem(`toDoList` , JSON.stringify(toDo));
s
  toDoUI();
  activeBtn(all_btn)
})
// localStorage.clear();

// Active btn 

function activeBtn(btn) {
  active_btn.classList.remove(`active`);
  completed_btn.classList.remove(`active`);
  all_btn.classList.remove(`active`);
  btn.classList.add(`active`);
}
}
main();