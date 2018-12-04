'use strict';

var RandomData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  COUNT: 4
};

var ESC_CODE = 27;
var ENTER_CODE = 13;

var setupOpen = document.querySelector('.setup-open');
var userDialog = document.querySelector('.setup');
var setupClose = userDialog.querySelector('.setup-close');

var list = userDialog.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Дополнительные функции для обработчиков

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onSetupOpenEscKeydown);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onSetupOpenEscKeydown);
};

// Обработчики

var onSetupOpenClick = function () {
  openPopup();
};

var onSetupOpenEnterKeydown = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openPopup();
  }
};

var onSetupOpenEscKeydown = function (evt) {
  var target = evt.target;
  if (evt.keyCode === ESC_CODE && !target.classList.contains('setup-user-name')) {
    closePopup();
  }
};

var onSetupCloseClick = function () {
  closePopup();
};

var onSetupCloseEnterKeydown = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
};

// Слушатели событий

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupOpenEnterKeydown);

setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseEnterKeydown);

// Изменение цвета плаща, глаз и файрбола персонажа

var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');

var wizardCoatInput = userDialog.querySelector('input[name="coat-color"]');
var wizardEyesInput = userDialog.querySelector('input[name="eyes-color"]');
var fireballInput = userDialog.querySelector('input[name="fireball-color"]');

wizardCoat.addEventListener('click', function () {
  var coatColor = chooseColor(RandomData.COAT_COLORS);
  wizardCoat.style.fill = coatColor;
  wizardCoatInput.value = coatColor;
});

wizardEyes.addEventListener('click', function () {
  var eyesColor = chooseColor(RandomData.EYES_COLORS);
  wizardEyes.style.fill = eyesColor;
  wizardEyesInput.value = eyesColor;
});

fireball.addEventListener('click', function () {
  var fireballColor = chooseColor(RandomData.FIREBALL_COLORS);
  fireball.style.background = fireballColor;
  fireballInput.value = fireballColor;
});

// Генерация персонажей

var randomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var generateWizardName = function (names, surnames) {
  var optionNameSurname = names[randomIndex(names)] + ' ' + surnames[randomIndex(surnames)];
  var optionSurnameName = surnames[randomIndex(surnames)] + ' ' + names[randomIndex(names)];

  return Math.round(Math.random()) ? optionNameSurname : optionSurnameName;
};

var chooseColor = function (colors) {
  return colors[randomIndex(colors)];
};

var generateWizardData = function () {
  var wizard = {};

  wizard.name = generateWizardName(RandomData.NAMES, RandomData.SURNAMES);
  wizard.coatColor = chooseColor(RandomData.COAT_COLORS);
  wizard.eyesColor = chooseColor(RandomData.EYES_COLORS);

  return wizard;
};

var generateWizardsDataArray = function (number) {
  var arr = [];

  for (var i = 0; i < number; i++) {
    arr.push(generateWizardData());
  }

  return arr;
};

var renderWizard = function (wizard) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderAllWizards = function (wizardsDataArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsDataArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsDataArray[i]));
  }

  list.appendChild(fragment);
};

var wizardsData = generateWizardsDataArray(RandomData.COUNT);

renderAllWizards(wizardsData);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
