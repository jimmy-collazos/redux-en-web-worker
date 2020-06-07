import {createStore} from './reduxFront.js';
import {actions} from './actions.js';

const storeFinnal = createStore();
const input = document.querySelector("input");
const list = document.querySelector("ul");

function render() {
  const todos = storeFinnal.getState();
  const html = todos.map(function (todo) {
    return `<li id="${todo.id}" class="${(todo.completed ? "completed" : "")}">
        <div class="view">
          <input class="toggle" type="checkbox"${(todo.completed ? "checked" : "")}/>
          <label>${todo.text}</label>
          <button class="destroy"></button>
        </div>
      </li>`;
  });
  list.innerHTML = html.join('');
}

input.addEventListener("change", function (e) {
  const value = e.target.value;
  storeFinnal.dispatch(actions.addTodo(value));
  e.target.value = "";
});

list.addEventListener("click", function (e) {
  const target = e.target;
  let id;

  switch (target.tagName) {
    case "BUTTON":
      id = target.parentNode.parentNode.id;
      storeFinnal.dispatch(actions.deleteTodo(id));
      break;
    case "INPUT":
      id = target.parentNode.parentNode.id;
      storeFinnal.dispatch(actions.completeTodo(id));
      break;
  }
});

storeFinnal.subscribe(render);
