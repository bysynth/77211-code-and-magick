'use strict';

(function () {

  var list = window.dialog.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizardName = function (names, surnames) {
    var optionNameSurname = names[window.utils.randomIndex(names)] + ' ' + surnames[window.utils.randomIndex(surnames)];
    var optionSurnameName = surnames[window.utils.randomIndex(surnames)] + ' ' + names[window.utils.randomIndex(names)];

    return Math.round(Math.random()) ? optionNameSurname : optionSurnameName;
  };

  var generateWizardData = function () {
    var wizard = {};

    wizard.name = generateWizardName(window.data.NAMES, window.data.SURNAMES);
    wizard.coatColor = window.utils.chooseColor(window.data.COAT_COLORS);
    wizard.eyesColor = window.utils.chooseColor(window.data.EYES_COLORS);

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

  renderAllWizards(generateWizardsDataArray(window.data.COUNT));

  window.dialog.querySelector('.setup-similar').classList.remove('hidden');

})();
