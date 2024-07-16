document.getElementById("addCardBtn").addEventListener("click", addCard);

function addCard() {
  const cardName = prompt("Enter card name:");
  if (!cardName) return;

  const card = document.createElement("div");
  card.className = "card";

  const header = document.createElement("header");
  header.textContent = cardName;
  card.appendChild(header);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add a task and press Enter";
  input.addEventListener("keydown", addTask);
  card.appendChild(input);

  const taskList = document.createElement("ul");
  taskList.addEventListener("dragover", dragOver);
  taskList.addEventListener("drop", drop);
  card.appendChild(taskList);

  document.getElementById("board").appendChild(card);
}

function addTask(event) {
  if (event.key !== "Enter" || !event.target.value.trim()) return;

  const taskText = event.target.value.trim();
  const task = document.createElement("li");
  task.textContent = taskText;
  task.draggable = true;
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "cancel-task";
  cancelBtn.addEventListener("click", () => task.remove());
  task.appendChild(cancelBtn);

  event.target.nextElementSibling.appendChild(task);
  event.target.value = "";
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  setTimeout(() => {
    event.target.classList.add("dragging");
  }, 0);
}

function dragEnd(event) {
  event.target.classList.remove("dragging");
}

function dragOver(event) {
  event.preventDefault();
  const afterElement = getDragAfterElement(event.target, event.clientY);
  const draggable = document.querySelector(".dragging");
  const taskList = event.target.closest("ul");
  if (afterElement == null) {
    taskList.appendChild(draggable);
  } else {
    taskList.insertBefore(draggable, afterElement);
  }
}

function drop(event) {
  event.preventDefault();
  const draggable = document.querySelector(".dragging");
  draggable.classList.remove("dragging");
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
