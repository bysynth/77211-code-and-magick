'use strict';

var RandomData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COATCOLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYESCOLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  NUMBER: 4
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var list = userDialog.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция для генерации случайного числа на основе длинны переданного массива
var randomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция для генерации имени волшебника
var generateWizardName = function (names, surnames) {
  var optionNameSurname = names[randomIndex(names)] + ' ' + surnames[randomIndex(surnames)];
  var optionSurnameName = surnames[randomIndex(surnames)] + ' ' + names[randomIndex(names)];

  return Math.round(Math.random()) ? optionNameSurname : optionSurnameName;
};

// Функция для генерации данных о волшебнике
var generateWizardData = function () {
  var wizard = {};

  wizard.name = generateWizardName(RandomData.NAMES, RandomData.SURNAMES);
  wizard.coatColor = RandomData.COATCOLORS[randomIndex(RandomData.COATCOLORS)];
  wizard.eyesColor = RandomData.EYESCOLORS[randomIndex(RandomData.EYESCOLORS)];

  return wizard;
};

// Функция для генерации массива с данными о волшебниках
var generateWizardsDataArray = function (number) {
  var arr = [];

  for (var i = 0; i < number; i++) {
    arr.push(generateWizardData());
  }

  return arr;
};

// Функция для отрисовки волшебника
var renderWizard = function (wizard) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция для отрисовки списка волшебников
var renderAllWizards = function (wizardsDataArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsDataArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsDataArray[i]));
  }

  list.appendChild(fragment);
};

// Создаем массив с данными о волшебниках
var wizardsData = generateWizardsDataArray(RandomData.NUMBER);

// Запуск отрисовки списка похожих персонажей
renderAllWizards(wizardsData);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
