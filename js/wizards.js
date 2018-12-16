'use strict';

(function () {

  var list = window.dialog.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];
  var coatColor;
  var eyesColor;

  var renderWizard = function (wizard) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderAllWizards = function (wizardsDataArray) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizardsDataArray.length > 4 ? 4 : wizardsDataArray.length;
    list.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizardsDataArray[i]));
    }
    list.appendChild(fragment);

    window.dialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    renderAllWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }

      return rankDiff;
    }));
  };

  var onWizardCoatClick = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onWizardEyesClick = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onSuccessLoad, window.error);

  window.wizards = {
    onWizardCoatClick: onWizardCoatClick,
    onWizardEyesClick: onWizardEyesClick,

    wizards: wizards
  };

})();
