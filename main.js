document.getElementById("task").focus();
let container = document.getElementById("tasks");
var taskList = [];
function checkContainer() {
  if (container.innerHTML === "") {
    container.style.opacity = 0;
    container.classList.add("hidden");
    window.localStorage.clear();
  }
}

function addItem(task) {
  taskList.push(task);
  let taskContainer = document.createElement("li");
  taskContainer.classList.add("task");
  taskContainer.innerHTML = `<span>${task}</span><span class="deleteBtn">Delete</span>`;
  container.appendChild(taskContainer);
  container.style.opacity = 1;
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      newList = taskList.filter(
        (item) => btn.parentElement.firstChild.innerHTML !== item
      );
      taskList = newList;
      let tasksValues = taskList.toString();
      window.localStorage.setItem("task", tasksValues);
      btn.parentElement.remove();
      checkContainer();
    });
  });
}
if (window.localStorage.getItem("task") == null) {
  checkContainer();
} else {
  if (window.localStorage.getItem("task").length == 0) {
    checkContainer();
  } else {
    window.localStorage
      .getItem("task")
      .split(",")
      .forEach((elem) => {
        addItem(elem);
      });
  }
}
var myForm = document.getElementById("myform");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var task = document.getElementById("task").value;
  document.getElementById("task").value = "";
  document.getElementById("task").focus();
  if (task !== "") {
    if (!taskList.includes(task)) {
      addItem(task);
      window.localStorage.setItem("task", taskList);
    } else {
      alert("Already There!");
    }
  } else {
    alert("The Task Field Is Empty");
  }
});
