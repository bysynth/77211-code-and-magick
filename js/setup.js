'use strict';

(function () {

  var wizardCoat = window.dialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.dialog.querySelector('.setup-wizard .wizard-eyes');
  var fireball = window.dialog.querySelector('.setup-fireball-wrap');

  var wizardCoatInput = window.dialog.querySelector('input[name="coat-color"]');
  var wizardEyesInput = window.dialog.querySelector('input[name="eyes-color"]');
  var fireballInput = window.dialog.querySelector('input[name="fireball-color"]');

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.utils.chooseColor(window.data.COAT_COLORS);
    wizardCoat.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var eyesColor = window.utils.chooseColor(window.data.EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  });

  fireball.addEventListener('click', function () {
    var fireballColor = window.utils.chooseColor(window.data.FIREBALL_COLORS);
    fireball.style.background = fireballColor;
    fireballInput.value = fireballColor;
  });

})();
