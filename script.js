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
