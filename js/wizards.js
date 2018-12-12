'use strict';

(function () {

  var list = window.dialog.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderAllWizards = function (wizardsDataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizardsDataArray[i]));
    }
    list.appendChild(fragment);

    window.dialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(renderAllWizards, window.error);

})();
