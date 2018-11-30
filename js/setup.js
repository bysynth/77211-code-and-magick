'use strict';

var RandomData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COATCOLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYESCOLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  COUNT: 4
};

var ESC_CODE = 27;
var ENTER_CODE = 13;

var setupOpen = document.querySelector('.setup-open');
var userDialog = document.querySelector('.setup');
var setupClose = userDialog.querySelector('.setup-close');
var usernameInput = userDialog.querySelector('.setup-user-name');

var list = userDialog.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Вопрос - как быть с наименованием обработчиков, ведь одни и те же обработкичи я навешиваю как на клик, так и на нажатие кнопки. Например, openPopup стоит назвать setupOpenClickKeydownHandler? или onSetupOpenClickKeydown? Или оставить как есть?

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  var activeElement = document.activeElement;

  if (evt.keyCode === ESC_CODE && usernameInput !== activeElement) {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
});

var randomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var generateWizardName = function (names, surnames) {
  var optionNameSurname = names[randomIndex(names)] + ' ' + surnames[randomIndex(surnames)];
  var optionSurnameName = surnames[randomIndex(surnames)] + ' ' + names[randomIndex(names)];

  return Math.round(Math.random()) ? optionNameSurname : optionSurnameName;
};

var generateWizardData = function () {
  var wizard = {};

  wizard.name = generateWizardName(RandomData.NAMES, RandomData.SURNAMES);
  wizard.coatColor = RandomData.COATCOLORS[randomIndex(RandomData.COATCOLORS)];
  wizard.eyesColor = RandomData.EYESCOLORS[randomIndex(RandomData.EYESCOLORS)];

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
