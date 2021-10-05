/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", main);

const data = {
  labels:  [
    'חברתי',
    'חוגים',
    'לימודים',
    'מטלות אישיות',
    'שונות'
  ],
  datasets: [
    {
      label: 'משימות',
      data: [2, 5, 3, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
    },
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  },
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

/* main() FUNCTION */

function main() {

  // get alltodos and initialise listeners
  addTodo();

  // add new todos on user input
  const add = document.getElementById("add-btn");
  const txtInput = document.querySelector(".txt-input");
  const txtCategory = document.getElementById("category");
  const kidsChoice = document.getElementById("kids");

  add.addEventListener("click", function () {
    const item = txtInput.value.trim();
    const itemCategory = txtCategory.value.trim();
    const itemKids = kidsChoice.value.trim();

    if (item && itemCategory && itemKids) {
      txtInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = {
        item,
        itemCategory,
        itemKids,
        isCompleted: false,
      };

      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    txtInput.focus();
  });
  // add todo also on enter key event
  txtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });
  // filter todo - all, active, completed
  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });
  // clear completed
  document
    .getElementById("clear-completed")
    .addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".card.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".todos .card")].indexOf(card)
        );
        card.classList.add("fall");
        card.addEventListener("animationend", function (e) {
          setTimeout(function () {
            card.remove();
          }, 100);
        });
      });
      removeManyTodo(deleteIndexes);
    });
}

/* stateTodo() FUNCTION TO UPDATE TODO ABOUT COMPLETION */

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* removeManyTodo() FUNCTION TO REMOVE ONE TODO */

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* removeManyTodo FUNCTION TO REMOVE MANY TODOS */

function removeManyTodo(indexes) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(function (todo, index) {
    return !indexes.includes(index);
  });
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
    item.textContent = `${todo.item} - ${todo.itemKids}`;
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
      itemsLeft.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });
    // Add click listener to clear button
    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;
      correspondingCard.classList.add("fall");
      removeTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        )
      );
      correspondingCard.addEventListener("animationend", function () {
        setTimeout(function () {
          correspondingCard.remove();
          itemsLeft.textContent = document.querySelectorAll(
            ".todos .card:not(.checked)"
          ).length;
        }, 100);
      });
    });
    // parent.appendChild(child)
    button.textContent = 'X';
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todos").appendChild(card);
  });
  // Update itemsLeft
  itemsLeft.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}

function sendEmail() {
  window.open('mailto:pbv.family@gmail.com');
}