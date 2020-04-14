var characterArr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
var randomKeysArr = [];
var points = 0;
var errors = 0;
var currentCharacter = "";
var currentAnswer = "";

function getRandomSet() {
  randomKeysArr = [];
  var keysArr = characterArr.map(function (it, key) {
    return key;
  });

  for (var i = 0; i < 9; i++) {
    var randomKey = Math.floor(Math.random() * keysArr.length);
    randomKeysArr.push(keysArr[randomKey]);
    keysArr.splice(randomKey, 1);
  }

  currentCharacter = getNextCharacter();
  document.getElementById("correctChar").innerText = "";
  document.getElementById("remainingChar").innerText = currentCharacter;
}

function createSet() {
  currentAnswer = "";
  var container = document.getElementById("container");
  container.innerHTML = "";
  for (var i = 0; i < 9; i++) {
    var element = document.createElement("div");
    element.classList.add("button");
    element.id = "button_" + i;
    var character = characterArr[randomKeysArr[i]];
    var text = document.createTextNode(character);
    element.appendChild(text);
    container.appendChild(element);

    document
      .getElementById("button_" + i)
      .addEventListener("click", function (el) {
        el.target.style.backgroundColor = "#777";
        el.target.style.color = "#fff";
        next(el.target.innerText);
      });
  }
}

function getNextCharacter() {
  var characters = "";
  var minMax = Math.floor(Math.random() * 5) + 2;
  for (var i = 0; i < minMax; i++) {
    characters +=
      characterArr[
        randomKeysArr[Math.floor(Math.random() * randomKeysArr.length)]
      ];
  }

  return characters;
}

function next(answer) {
  document.getElementById("remainingChar").innerText = currentCharacter.substr(
    currentAnswer.length + 1,
    currentCharacter.length - 1
  );
  currentAnswer += answer;

  if (currentCharacter[currentAnswer.length - 1] == answer) {
    document.getElementById("correctChar").innerText = currentAnswer;
  } else {
    errors++;
    document.getElementById("errors").innerText = errors;
    getRandomSet();
    createSet();
  }

  if (currentAnswer.length === currentCharacter.length) {
    if (currentCharacter === currentAnswer) {
      points++;
      document.getElementById("points").innerText = points;
    } else {
      errors++;
      document.getElementById("errors").innerText = errors;
    }

    getRandomSet();
    createSet();
  }
}

(function () {
  getRandomSet();
  createSet();
})();
