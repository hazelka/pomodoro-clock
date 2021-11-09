"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Timer = function Timer() {
  var _this = this;

  _classCallCheck(this, Timer);

  _defineProperty(this, "increaseBreak", function () {
    _this["break"]++;
    document.getElementById('break').innerHTML = _this["break"];

    if (!_this.inSession) {
      _this.minute = _this["break"];
      _this.second = 0;

      _this.updateTimer();
    }
  });

  _defineProperty(this, "decreaseBreak", function () {
    if (_this["break"] > 1) {
      _this["break"]--;
      document.getElementById('break').innerHTML = _this["break"];

      if (!_this.inSession) {
        _this.minute = _this["break"];
        _this.second = 0;

        _this.updateTimer();
      }
    }
  });

  _defineProperty(this, "increaseSession", function () {
    _this.session++;
    document.getElementById('session').innerHTML = _this.session;

    if (_this.inSession) {
      _this.minute = _this.session;
      _this.second = 0;

      _this.updateTimer();
    }
  });

  _defineProperty(this, "decreaseSession", function () {
    if (_this.session > 1) {
      _this.session--;
      document.getElementById('session').innerHTML = _this.session;

      if (_this.inSession) {
        _this.minute = _this.session;
        _this.second = 0;

        _this.updateTimer();
      }
    }
  });

  _defineProperty(this, "toggleTimer", function () {
    if (_this.timerId) {
      clearInterval(_this.timerId);
      _this.timerId = null;
    } else {
      _this.timerId = setInterval(function () {
        _this.tick();

        _this.updateTimer();
      }, 1000);
    }
  });

  _defineProperty(this, "tick", function () {
    if (_this.second === 0) {
      if (_this.minute > 0) {
        _this.minute--;
        _this.second = 59;
      } else {
        _this.inSession = !_this.inSession;
        _this.minute = _this.inSession ? _this.session : _this["break"];
        document.getElementById('current').innerHTML = _this.inSession ? 'Session' : 'Break';
      }
    } else {
      _this.second--;
    }
  });

  _defineProperty(this, "updateTimer", function () {
    var minute = _this.minute.toString().padStart(2, "0");

    var second = _this.second.toString().padStart(2, "0");

    document.getElementById('timer').innerHTML = minute + ":" + second;
  });

  _defineProperty(this, "resetTimer", function () {
    clearInterval(_this.timerId);
    _this["break"] = 5;
    _this.session = 25;
    _this.minute = 25;
    _this.second = 0;
    _this.inSession = true;
    _this.timerId = null;
    document.getElementById('break').innerHTML = _this["break"];
    document.getElementById('session').innerHTML = _this.session;
    document.getElementById('current').innerHTML = "Session";

    _this.updateTimer();
  });

  this["break"] = 5;
  this.session = 25;
  this.minute = 25;
  this.second = 0;
  this.timerId = null;
  this.inSession = true;
};

var TodoList = function TodoList() {
  var _this2 = this;

  _classCallCheck(this, TodoList);

  _defineProperty(this, "addTask", function () {
    document.getElementById('task').style.display = "block";
    document.getElementById('addTask').style.display = "none";
  });

  _defineProperty(this, "cancelTask", function () {
    document.getElementById('task').style.display = "none";
    document.getElementById('addTask').style.display = "block";
  });

  _defineProperty(this, "submitTask", function () {
    var description = document.getElementById('description');
    var estimate = document.getElementById('estimate');

    if (!description.value) {
      alert('Please enter task you are working on');
    } else if (estimate.value <= 0 || !Number.isInteger(+estimate.value)) {
      alert('Please enter a valid interger');
    } else {
      _this2.createTodo(description.value, Math.floor(estimate.value));

      description.value = "";
      estimate.value = "";
    }
  });

  _defineProperty(this, "createTodo", function (desc, est) {
    var del = document.createElement('BUTTON');
    del.innerHTML = 'X';
    del.style["float"] = "right";
    del.onclick = _this2.removeTodo;
    var complete = document.createElement('BUTTON');
    complete.innerHTML = "<i class='fa fa-square-o'></i>";
    complete.onclick = _this2.toggleTodo;
    var task = document.createElement('DIV');
    var description = document.createElement('SPAN');
    description.innerHTML = desc;
    task.append(del, complete, description);
    var estimate = document.createElement('DIV');
    estimate.innerHTML = est + " min";
    estimate.style.textAlign = "right";
    _this2.timeNeed += +est;
    var todo = document.createElement('DIV');
    todo.append(task, estimate);
    todo.className = "todo";
    document.getElementById('todos').appendChild(todo);

    _this2.updateFinishTime();
  });

  _defineProperty(this, "toggleTodo", function (event) {
    var time = parseInt(event.currentTarget.parentNode.nextSibling.innerHTML);
    var checkboxNode = event.currentTarget;
    var descriptionNode = event.currentTarget.nextSibling;

    if (descriptionNode.style.textDecoration === "line-through") {
      checkboxNode.innerHTML = '<i class="fa fa-square-o"></i>';
      descriptionNode.style.textDecoration = "none";
      _this2.timeNeed += time;
    } else {
      checkboxNode.innerHTML = '<i class="fa fa-check-square-o"></i>';
      descriptionNode.style.textDecoration = "line-through";
      _this2.timeNeed -= time;
    }

    _this2.updateFinishTime();
  });

  _defineProperty(this, "updateFinishTime", function () {
    if (!_this2.timeNeed) {
      document.getElementById('finish').innerHTML = "Everything is finished!";
      return;
    }

    var finishTime = new Date(Date.now() + _this2.timeNeed * 60000);
    var fmin = "".concat(finishTime.getHours()).padStart(2, '0');
    var fsec = "".concat(finishTime.getMinutes()).padStart(2, '0');
    document.getElementById('finish').innerHTML = "Estimate to finish at ".concat(fmin, " : ").concat(fsec);
  });

  _defineProperty(this, "removeTodo", function (event) {
    var todo = event.target.closest('.todo');
    _this2.timeNeed -= parseInt(todo.lastChild.innerHTML);

    _this2.updateFinishTime();

    todo.remove();
  });

  this.timeNeed = 0;
};

var Quotes = function Quotes() {
  var _this3 = this;

  _classCallCheck(this, Quotes);

  _defineProperty(this, "fetchQuotes", function () {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      _this3.quotes = data.quotes;
      document.getElementById('quote').innerHTML = _this3.quotes[0].quote;
      document.getElementById('quote-author').innerHTML = '- ' + _this3.quotes[0].author;
      setInterval(function () {
        return _this3.getRandomQuote(_this3.quotes.length);
      }, 5000);
    });
  });

  _defineProperty(this, "getRandomQuote", function (n) {
    var random = Math.floor(Math.random() * n);
    document.getElementById('quote').innerHTML = _this3.quotes[random].quote;
    document.getElementById('quote-author').innerHTML = '- ' + _this3.quotes[random].author;
  });
};

var timer = new Timer();
var todoList = new TodoList();
var quotes = new Quotes();
quotes.fetchQuotes();
document.getElementById('clock').addEventListener('click', function (event) {
  if (!event.target.dataset.action) return;
  timer[event.target.dataset.action]();
});
document.getElementById('addTask').addEventListener('click', function (event) {
  todoList.addTask();
});
document.getElementById('cancel').addEventListener('click', function (event) {
  todoList.cancelTask();
});
document.getElementById('submit').addEventListener('click', function (event) {
  todoList.submitTask();
});
