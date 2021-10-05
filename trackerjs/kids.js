/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", main);

const user = "מורן"; 
const welcome = document.getElementById('welcome');
welcome.textContent = `${user} שלום`;

/* main() FUNCTION */

function main() {

  // get alltodos and initialise listeners
  addTodo();
}

/* stateTodo() FUNCTION TO UPDATE TODO ABOUT COMPLETION */

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}


/* addTodo() FUNCTION TO LIST/CREATE TODOS AND ADD EVENT LISTENERS */

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }
  const itemsLeft = document.getElementById("items-left");
  // create cards
  todos.forEach(function (todo) {
    if(todo.itemKids === user){
          const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    // Add classes
    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");
    // Set attributes
    cbInput.setAttribute("type", "checkbox");
    // set todo item for card
    item.textContent = `${todo.item}`;
    // if completed -> add respective class / attribute
    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }

    // Add click listener to checkbox
    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");

    });
    // parent.appendChild(child)
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    document.querySelector(".todos").appendChild(card);
    }

  });

}
