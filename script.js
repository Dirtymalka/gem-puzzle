const fields = {
  'gameBoard3*3': 8,
  'gameBoard4*4': 15,
  'gameBoard5*5': 24,
  'gameBoard6*6': 35,
  'gameBoard7*7': 48,
  'gameBoard8*8': 63,
};

function createField(field) {
  // Title
  const title = document.createElement('div');
  title.classList = 'title';
  title.innerHTML = 'GEM PUZZLE';
  document.body.append(title);

  // Create Option Buttons
  const optionField = document.createElement('div');
  optionField.classList = 'option-field';
  document.body.append(optionField);
  for (let i = 0; i < 4; i += 1) {
    const button = document.createElement('button');
    if (i === 0) {
      button.classList = 'start';
      button.innerText = 'Mix and Start';
    }
    if (i === 1) {
      button.classList = 'stop';
      button.innerText = 'Stop';
    }
    if (i === 2) {
      button.classList = 'save';
      button.innerText = 'Save';
    }
    if (i === 3) {
      button.classList = 'total';
      button.innerText = 'Results';
    }
    optionField.append(button);
  }

  // Create Information Field about Steps and Time
  const informationField = document.createElement('div');
  informationField.classList = 'information-field';
  document.body.append(informationField);

  const stepsContainer = document.createElement('div');
  stepsContainer.classList = 'steps-container';
  informationField.append(stepsContainer);

  const steps = document.createElement('p');
  steps.innerText = 'Steps: ';
  stepsContainer.append(steps);
  const stepsCurrent = document.createElement('span');
  stepsCurrent.classList = 'steps-current';
  stepsCurrent.innerText = '0';
  stepsContainer.append(stepsCurrent);

  const timeContainer = document.createElement('div');
  timeContainer.classList = 'time-container';
  informationField.append(timeContainer);

  const timeStart = document.createElement('p');
  timeStart.innerText = 'Time: ';
  timeContainer.append(timeStart);
  const minutes = document.createElement('span');
  minutes.classList = 'minutes';
  minutes.innerText = '00';
  timeContainer.append(minutes);
  minutes.insertAdjacentHTML('afterend', ':');
  const seconds = document.createElement('span');
  seconds.classList = 'seconds';
  seconds.innerText = '00';
  timeContainer.append(seconds);

  // Create Game Board
  const fieldGame = document.createElement('div');
  fieldGame.classList = 'container';
  document.body.append(fieldGame);

  const blockDisplay = document.createElement('div');
  blockDisplay.classList = 'block-display';
  const blockDisplayText = document.createElement('span');
  blockDisplayText.innerHTML = 'Please click "Mix and Start" for begining a New Game or "Start" for continue';
  blockDisplay.append(blockDisplayText);
  fieldGame.append(blockDisplay);

  for (let i = 0; i < field; i += 1) {
    const box = document.createElement('div');
    box.classList = `check cub ${'cub' + (i + 1)}`;
    box.innerText = `${i + 1}`;
    fieldGame.append(box);
  }
  const free = document.createElement('div');
  free.classList = 'cub free';
  fieldGame.append(free);

  // Create Field for Change Size
  const sizesField = document.createElement('div');
  sizesField.classList = 'sizesField';
  document.body.append(sizesField);

  const factSize = document.createElement('div');
  factSize.classList = 'factSize';
  sizesField.append(factSize);
  const factSizeField = document.createElement('p');
  factSizeField.innerText = 'Playing field Size: ';
  factSize.append(factSizeField);
  const size = document.createElement('span');
  size.classList = 'size';
  size.innerText = '4*4';
  factSize.append(size);

  const changeSize = document.createElement('div');
  changeSize.classList = 'changeSize';
  sizesField.append(changeSize);
  const enotherSizes = document.createElement('p');
  enotherSizes.innerText = 'Other Sizes: ';
  changeSize.append(enotherSizes);

  let j = 3;
  for (let i = 0; i < 6; i += 1) {
    const button = document.createElement('button');
    button.innerText = `${j}*${j}`;
    button.classList = `gameBoard${j}*${j}`;
    changeSize.append(button);
    j += 1;
  }

  const rulesButton = document.createElement('button');
  rulesButton.classList = 'rules-button';
  rulesButton.innerHTML = 'RULES';
  document.body.append(rulesButton);

  const rules = document.createElement('div');
  rules.classList = 'rules';
  document.body.append(rules);
  const rulesText = document.createElement('span');
  rulesText.classList = 'rules-text';
  rulesText.innerText = 'Welcome to the wonderful game\n"GEM PUZZLE"\n Please read the rules before starting the game\n 1) Choose the size of the playing field in the section "Other Sizes"\n2) To start a new game click "Mix and Start"\n3) If you want to save the game and finish later, click "Stop" and "Save". And after restarting the application, you can continue by pressing the "Start"\n\n Click "OK" and Good Luck';
  rules.append(rulesText);

  const buttonOk = document.createElement('button');
  buttonOk.classList = 'button-ok';
  buttonOk.innerText = 'OK';
  rules.append(buttonOk);

  if (localStorage.getItem('result')) {
    document.querySelector('.resultsList').textContent = localStorage.getItem('result');
  } else {
    const results = document.createElement('div');
    results.classList = 'resultsList';
    results.innerText = 'Your results!\n ';
    document.body.append(results);
  }

}


if (localStorage.getItem('gameBoard')) {
  document.body.innerHTML = localStorage.getItem('gameBoard');
} else {
  createField(fields['gameBoard4*4']);
}

let defaultField = document.querySelectorAll('.cub');

document.querySelector('.button-ok').onclick = () => {
  document.querySelector('.rules').style.visibility = 'hidden';
};

document.querySelector('.rules-button').onclick = () => {
  document.querySelector('.rules').style.visibility = 'initial';
};

const blockDisplay = document.querySelector('.block-display');

// Moving Cubs
const container = document.querySelector('.container');

// Add Puzzles ClickHandler
const addPuzzlesClickHandler = () => {
  document.querySelectorAll('.cub').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      const freeElement = container.querySelector('.free');
      const movingCub = item;
      const coordinateFree = freeElement.getBoundingClientRect();
      const coordinateMovingCub = movingCub.getBoundingClientRect();


      const itemWidth = item.getBoundingClientRect().width - 4;
      const itemHeight = item.getBoundingClientRect().height - 4;

      let shiftX = event.clientX - item.getBoundingClientRect().left;
      let shiftY = event.clientY - item.getBoundingClientRect().top;

      const cubs = document.querySelectorAll('.cub');

      if (!(coordinateMovingCub.left + coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top
        || coordinateMovingCub.top + coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        || coordinateMovingCub.top - coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        || coordinateMovingCub.left - coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top) || item.classList.contains('free')) return;

      let freeClone = freeElement.cloneNode(true);
      freeClone.className = 'clone';
      item.replaceWith(freeClone);


      item.style.position = 'absolute';
      item.style.width = itemWidth + 'px';
      item.style.height = itemHeight + 'px';
      item.style.zIndex = 90;
      document.body.append(item);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        item.style.left = pageX - shiftX + 'px';
        item.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      item.onmouseup = function (event) {
        if (event.pageX >= freeElement.getBoundingClientRect().left && event.pageX <= freeElement.getBoundingClientRect().left + freeElement.getBoundingClientRect().width
          && event.pageY >= freeElement.getBoundingClientRect().top && event.pageY <= freeElement.getBoundingClientRect().top + freeElement.getBoundingClientRect().height) {
          document.querySelector('.free').replaceWith(item);
          document.querySelector('.clone').replaceWith(freeElement);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
          countSteps();
        } else if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width
          && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + document.querySelector('.clone').getBoundingClientRect().height) {
          document.querySelector('.free').replaceWith(item);
          document.querySelector('.clone').replaceWith(freeElement);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
          countSteps();
        } else {
          document.querySelector('.clone').replaceWith(item);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
        }
        document.removeEventListener('mousemove', onMouseMove);
        item.onmouseup = null;

        function check(arr1, arr2) {
          let checking = true;
          for (let i = 0; i < arr1.length; i += 1) {
            if (arr1[i] != arr2[i]) {
              checking = false;
              break;
            }
          }
          return checking;
        }
        const finish = check(Array.from(defaultField), Array.from(document.querySelectorAll('.cub')));

        if (finish === true) {
          const complited = document.createElement('div');
          complited.classList = 'complited';
          complited.textContent = `Congratulations\n You solved the puzzle\n ${document.querySelector('.steps-container').innerText}\n ${document.querySelector('.time-container').innerText}`;
          document.body.append(complited);
          document.querySelector('.resultsList').textContent += `\n ${document.querySelector('.steps-container').innerText}    ${document.querySelector('.time-container').innerText}`;
          localStorage.setItem('result', `${document.querySelector('.resultsList').textContent}`);
          document.querySelector('.complited').onclick = () => {
            document.querySelector('.complited').style.visibility = 'hidden';
          };
        }
      };
    });

  });
};

addPuzzlesClickHandler();



// Count Steps
const countSteps = (function startCount() {
  let count = +document.querySelector('.steps-current').innerHTML;
  return function () {
    if (document.querySelector('.start').classList.contains('start-timer')) count = 0;
    //count = 0 ;
    document.querySelector('.steps-current').innerHTML = count++;
  };
}());

const optionField = document.querySelector('.option-field');

// Timer
const timer = function () {
  let countMinutes = +document.querySelector('.minutes').innerHTML;
  let countSeconds = +document.querySelector('.seconds').innerHTML;
  let fieldLength = document.querySelectorAll('.cub').length;
  const timerId = setInterval(() => {
    if (document.querySelectorAll('.cub').length != fieldLength) {
      clearInterval(timerId);
      countSeconds = 0;
      countMinutes = 0;
    }
    if (document.querySelector('.stop').classList.contains('stop-timer')) {
      let countMinutesAfterStop = countMinutes;
      let countSecondsAfterStop = countSeconds;
      clearInterval(timerId);
    }
    if (document.querySelector('.start').classList.contains('start-timer')) {
      countSeconds = 0;
      countMinutes = 0;
    }
    countSeconds += 1;
    if (countSeconds > 59) {
      countSeconds = 0;
      countMinutes += 1;

    }
    document.querySelector('.minutes').innerHTML = countMinutes;
    document.querySelector('.seconds').innerHTML = countSeconds;
  }, 1000);
  // return timerId;
};

// Event with click on option buttons
optionField.addEventListener('click', (event) => {
  if (event.target.classList.contains('start')) {
    event.target.classList.add('start-timer');
    document.querySelector('.stop').classList.remove('stop-timer');
    document.querySelector('.steps-current').innerHTML = 0;
    mixCubs();
    timer();
    countSteps();
    setTimeout(() => event.target.classList.remove('start-timer'), 1000);
  }
  if (event.target.classList.contains('stop')) {
    document.querySelector('.stop').classList.toggle('stop-timer');
    if (!document.querySelector('.stop').classList.contains('stop-timer')) {
      document.querySelector('.block-display').style.visibility = 'hidden'; //remove();
      event.target.innerHTML = 'Stop';
      timer();
    }
    if (document.querySelector('.stop').classList.contains('stop-timer')) {
      document.querySelector('.block-display').style.visibility = 'initial'; //append(blockDisplay);

      event.target.innerHTML = 'Start';
    }
  }
  if (event.target.classList.contains('save')) {
    localStorage.setItem('gameBoard', document.body.innerHTML);
  }
  if (event.target.classList.contains('total')) {
    document.querySelector('.resultsList').style.visibility = 'initial';
    document.querySelector('.resultsList').onclick = () => { document.querySelector('.resultsList').style.visibility = 'hidden'; };
  }
});

// Mix Cubs
function mixCubs() {
  const cubs = document.querySelectorAll('.cub');
  const cubsLength = cubs.length;
  document.querySelector('.container').innerHTML = '';
  const mixingcubs = [];
  const mixcounts = createCollectionRandom(0, cubsLength);
  cubs.forEach((item, index) => {
    mixingcubs[mixcounts[index]] = item;
  });
  mixingcubs.forEach((item) => {
    document.querySelector('.container').append(item);
  });
  document.querySelector('.container').append(blockDisplay);
  document.querySelector('.block-display').style.visibility = 'hidden';
}

// Create random collection for a mixin cubs
function createCollectionRandom(min, max) {
  const set = new Set();
  while (set.size <= max) {
    const rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    set.add(rand);
  }
  let a = [];
  set.forEach(item => {
    a.push(item);
  })
  return a;
}

// Event for a change game field size
const changeSize = document.querySelector('.changeSize');
changeSize.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    document.querySelectorAll("div.changeSize > button").forEach(item => {
      item.classList.remove('active-size');
    });
    changeSizeOfBoard(event.target.getAttribute('class'));
    document.querySelector('.size').innerHTML = event.target.innerHTML;
    addPuzzlesClickHandler();
    event.target.classList.add('active-size');
    document.querySelector('.stop').classList.remove('stop-timer');
    document.querySelector('.stop').innerHTML = 'Stop';
  }
});

// function for a change size
function changeSizeOfBoard(size) {
  const fieldGame = document.querySelector('.container');
  fieldGame.innerHTML = '';
  for (let i = 0; i < fields[size]; i += 1) {
    const box = document.createElement('div');
    box.classList = `check cub ${'cub' + (i + 1)}`;
    box.innerText = `${i + 1}`;
    fieldGame.append(box);
  }
  const free = document.createElement('div');
  free.classList = 'cub free';
  fieldGame.append(free);
  defaultField = document.querySelectorAll('.cub');
  document.querySelector('.container').append(blockDisplay);
  document.querySelector('.block-display').style.visibility = 'initial';

  const quantityColumn = Math.sqrt(fields[size] + 1);
  fieldGame.style.gridTemplateColumns = `repeat(${quantityColumn}, 1fr)`;
}
