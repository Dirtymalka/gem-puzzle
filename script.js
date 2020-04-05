const fields = {
  'gameBoard3*3': 8,
  'gameBoard4*4': 15,
  'gameBoard5*5': 24,
  'gameBoard6*6': 35,
  'gameBoard7*7': 48,
  'gameBoard8*8': 63,
};

function createField(field) {
  const optionField = document.createElement('div');
  optionField.classList = 'option-field';
  document.body.append(optionField);
  for (let i = 0; i < 4; i += 1) {
    const button = document.createElement('button');
    if (i === 0) {
      button.classList = 'start';
      button.innerText = 'Перемешать и начать';
    }
    if (i === 1) {
      button.classList = 'stop';
      button.innerText = 'Стоп';
    }
    if (i === 2) {
      button.classList = 'save';
      button.innerText = 'Сохранить';
    }
    if (i === 3) {
      button.classList = 'total';
      button.innerText = 'Результаты';
    }
    optionField.append(button);
  }

  const informationField = document.createElement('div');
  informationField.classList = 'information-field';
  document.body.append(informationField);

  const stepsContainer = document.createElement('div');
  stepsContainer.classList = 'steps-container';
  informationField.append(stepsContainer);

  const steps = document.createElement('p');
  steps.innerText = 'Ходов: ';
  stepsContainer.append(steps);
  const stepsCurrent = document.createElement('span');
  stepsCurrent.classList = 'steps-current';
  stepsCurrent.innerText = '0';
  stepsContainer.append(stepsCurrent);

  const timeContainer = document.createElement('div');
  timeContainer.classList = 'time-container';
  informationField.append(timeContainer);

  const timeStart = document.createElement('p');
  timeStart.innerText = 'Время: ';
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


  const fieldGame = document.createElement('div');
  fieldGame.classList = 'container';
  document.body.append(fieldGame);

  for (let i = 0; i < field; i += 1) {
    const box = document.createElement('div');
    box.classList = `cub ${'cub' + (i + 1)}`;
    box.innerText = `${i + 1}`;
    fieldGame.append(box);
  }
  const free = document.createElement('div');
  free.classList = 'cub free';
  fieldGame.append(free);


  const sizesField = document.createElement('div');
  sizesField.classList = 'sizesField';
  document.body.append(sizesField);

  const factSize = document.createElement('div');
  factSize.classList = 'factSize';
  sizesField.append(factSize);
  const factSizeField = document.createElement('p');
  factSizeField.innerText = 'Размер поля: ';
  factSize.append(factSizeField);
  const size = document.createElement('span');
  size.classList = 'size';
  size.innerText = '4*4';
  factSize.append(size);

  const changeSize = document.createElement('div');
  changeSize.classList = 'changeSize';
  sizesField.append(changeSize);
  const enotherSizes = document.createElement('p');
  enotherSizes.innerText = 'Другие размеры: ';
  changeSize.append(enotherSizes);

  let j = 3;
  for (let i = 0; i < 6; i += 1) {
    const button = document.createElement('button');
    button.innerText = `${j}*${j}`;
    button.classList = `gameBoard${j}*${j}`;
    changeSize.append(button);
    j += 1;
  }
}

createField(fields['gameBoard4*4']);


// Moving Cubs
const container = document.querySelector('.container');
// container.addEventListener('click', (event) => {
//   const freeElement = container.querySelector('.free');
//   const movingCub = event.target;
//   let coordinateFree = freeElement.getBoundingClientRect();
//   let coordinateMovingCub = movingCub.getBoundingClientRect();

//   if (movingCub.classList.contains('cub') && !movingCub.classList.contains('free')) {
//     if (coordinateMovingCub.left + coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top) {
//       movingCubs();
//       countSteps();
//     }

//     if (coordinateMovingCub.top + coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left) {
//       movingCubs();
//       countSteps();
//     }

//     if (coordinateMovingCub.top - coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left) {
//       movingCubs();
//       countSteps();
//     }

//     if (coordinateMovingCub.left - coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top) {
//       movingCubs();
//       countSteps();
//     }
//   }

//   function movingCubs() {
//     const outerMovingCub = movingCub.outerHTML;
//     movingCub.outerHTML = freeElement.outerHTML;
//     freeElement.outerHTML = outerMovingCub;
//   }
// });
const addPuzzlesClickHandler = () => {
  document.querySelectorAll('.cub').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      const freeElement = container.querySelector('.free');
      const movingCub = item;
      let coordinateFree = freeElement.getBoundingClientRect();
      let coordinateMovingCub = movingCub.getBoundingClientRect();
      const itemWidth = coordinateMovingCub.width;
      const itemHeight = coordinateMovingCub.height;

      const cubs = document.querySelectorAll('.cub');

      if (!(coordinateMovingCub.left + coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top
        || coordinateMovingCub.top + coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        || coordinateMovingCub.top - coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        || coordinateMovingCub.left - coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top) || item.classList.contains('free')) return;

      let freeClone = freeElement.cloneNode(true);
      freeClone.className = 'clone';
      item.replaceWith(freeClone);

      let shiftX = event.clientX - item.getBoundingClientRect().left;
      let shiftY = event.clientY - item.getBoundingClientRect().top;

      item.style.position = 'absolute';
      item.style.width = itemWidth + 'px';
      item.style.height = itemHeight + 'px';
      item.style.zIndex = 90;
      document.body.append(item);


      console.log(event);
      console.log(shiftX);
      console.log(item.getBoundingClientRect().left);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        item.style.left = pageX - item.offsetWidth / 2 + 'px';
        item.style.top = pageY - item.offsetHeight / 2 + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        console.log('h');
      }

      document.addEventListener('mousemove', onMouseMove);


      item.onmouseup = function (event) {
        // if (coordinateMovingCub.left + coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top
        //   || coordinateMovingCub.top + coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        //   || coordinateMovingCub.top - coordinateMovingCub.height === coordinateFree.top && coordinateMovingCub.left === coordinateFree.left
        //   || coordinateMovingCub.left - coordinateMovingCub.width === coordinateFree.left && coordinateMovingCub.top === coordinateFree.top) {
        if (event.pageX >= freeElement.getBoundingClientRect().left && event.pageX <= freeElement.getBoundingClientRect().left + freeElement.getBoundingClientRect().width
          && event.pageY >= freeElement.getBoundingClientRect().top && event.pageY <= freeElement.getBoundingClientRect().top + freeElement.getBoundingClientRect().height) {
          // console.log('1');
          document.querySelector('.free').replaceWith(item);
          document.querySelector('.clone').replaceWith(freeElement);
          //container.append(item);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
          countSteps();
        } else if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width
          && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + document.querySelector('.clone').getBoundingClientRect().height) {

          document.querySelector('.free').replaceWith(item);
          document.querySelector('.clone').replaceWith(freeElement);
          //container.append(item);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
          countSteps();
        } else {
          //container.append(item);
          document.querySelector('.clone').replaceWith(item);
          item.style.position = 'static';
          item.style.width = '';
          item.style.height = '';
        }
        document.removeEventListener('mousemove', onMouseMove);
        item.onmouseup = null;
      };
    });
  });
};

addPuzzlesClickHandler();


// Count Steps
const countSteps = (function startCount() {
  let count = 0;
  return function () {
    count += 1;
    document.querySelector('.steps-current').innerHTML = count;
  };
}());


const optionField = document.querySelector('.option-field');

// Timer
const timer = function () {
  let countMinutes = 0;
  let countSeconds = 0;
  const timerId = setInterval(() => {
    if (document.querySelector('.stop').classList.contains('stop-timer')) {
      console.log('fr');
      clearInterval(timerId);
    }
    countSeconds += 1;
    if (countSeconds > 59) {
      countSeconds = 0;
      countMinutes += 1;
      document.querySelector('.minutes').innerHTML = countMinutes;
    }

    document.querySelector('.seconds').innerHTML = countSeconds;
  }, 1000);
  return timerId;
};

// Event with click on option buttons
optionField.addEventListener('click', (event) => {
  if (event.target.classList.contains('start')) {
    event.target.classList.remove('active');
    event.target.classList.add('active');
    document.querySelector('.stop').classList.remove('stop-timer');
    document.querySelector('.steps-current').innerHTML = 0;
    mixCubs();
    timer();
  }
  if (event.target.classList.contains('stop')) {
    document.querySelector('.stop').classList.add('stop-timer');
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
  console.log(mixingcubs);
  mixingcubs.forEach((item) => {
    document.querySelector('.container').append(item);
  });
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
    changeSizeOfBoard(event.target.getAttribute('class'));
    document.querySelector('.size').innerHTML = event.target.innerHTML;
    addPuzzlesClickHandler();
  }
});

// function for a change size
function changeSizeOfBoard(size) {
  let fieldGame = document.querySelector('.container');
  fieldGame.innerHTML = '';
  for (let i = 0; i < fields[size]; i += 1) {
    const box = document.createElement('div');
    box.classList = `cub ${'cub' + (i + 1)}`;
    box.innerText = `${i + 1}`;
    fieldGame.append(box);
  }
  const free = document.createElement('div');
  free.classList = 'cub free';
  fieldGame.append(free);

  const quantityColumn = Math.sqrt(fields[size] + 1);
  fieldGame.style.gridTemplateColumns = `repeat(${quantityColumn}, 1fr)`;
}
