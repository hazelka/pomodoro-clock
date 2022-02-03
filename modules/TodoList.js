class TodoList {
	constructor() {
		this.timeNeed = 0;
	}

	addTask = () => {
		document.getElementById('task').style.display = "block";
		document.getElementById('addTask').style.display = "none";
	}

	cancelTask = () => {
		document.getElementById('task').style.display = "none";
		document.getElementById('addTask').style.display = "block";
	}

	submitTask = () => {
		const description = document.getElementById('description');
		const estimate = document.getElementById('estimate');

		if (!description.value) {
			alert('Please enter task you are working on');
		} else if (estimate.value <= 0 || !Number.isInteger(+estimate.value)) {
			alert('Please enter a valid interger');
		} else {
			this.createTodo(description.value, Math.floor(estimate.value));
			description.value = "";
			estimate.value = "";
		}
	}

	createTodo = (desc, est) => {

		const del = document.createElement('BUTTON');
		del.innerHTML = 'X';
		del.style.float = "right";
		del.onclick = this.removeTodo;

		const complete = document.createElement('BUTTON');
		complete.innerHTML = "<i class='fa fa-square-o'></i>";
		complete.onclick = this.toggleTodo;

		const task = document.createElement('DIV');
		const description = document.createElement('SPAN');

		description.innerHTML = desc;
		task.append(del, complete, description);

		const estimate = document.createElement('DIV');
		estimate.innerHTML = est + " min";
		estimate.style.textAlign = "right";
		this.timeNeed += +est;

		const todo = document.createElement('DIV');
		todo.append(task, estimate);
		todo.className = "todo";

		document.getElementById('todos').appendChild(todo);
		this.updateFinishTime();
	}

	toggleTodo = (event) => {
		const time = parseInt(event.currentTarget.parentNode.nextSibling.innerHTML);
		const checkboxNode = event.currentTarget;
		const descriptionNode = event.currentTarget.nextSibling;

		if (descriptionNode.style.textDecoration === "line-through") {
			checkboxNode.innerHTML = '<i class="fa fa-square-o"></i>';
			descriptionNode.style.textDecoration = "none";
			this.timeNeed += time;
		} else {
			checkboxNode.innerHTML = '<i class="fa fa-check-square-o"></i>';
			descriptionNode.style.textDecoration = "line-through";
			this.timeNeed -= time;
		}
		this.updateFinishTime();
	}

	updateFinishTime = () => {
		if (!this.timeNeed) {
			document.getElementById('finish').innerHTML = "Everything is finished!";
			return;
		}

		const finishTime = new Date(Date.now() + this.timeNeed * 60000);
		const fmin = `${finishTime.getHours()}`.padStart(2, '0');
		const fsec = `${finishTime.getMinutes()}`.padStart(2, '0');

		document.getElementById('finish').innerHTML = `Estimate to finish at ${fmin} : ${fsec}`;
	}

	removeTodo = (event) => {
		const todo = event.target.closest('.todo');
		this.timeNeed -= parseInt(todo.lastChild.innerHTML);
		this.updateFinishTime();
		todo.remove();
	}
}

export default TodoList;