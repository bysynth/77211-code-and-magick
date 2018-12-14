'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var form = userDialog.querySelector('.setup-wizard-form');

  var setUserDialogInitialPosition = function () {
    userDialog.removeAttribute('style');
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onSetupOpenEscKeydown);
    form.addEventListener('submit', onFormSubmit);
  };

  var closePopup = function () {
    setUserDialogInitialPosition();
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onSetupOpenEscKeydown);
    form.removeEventListener('submit', onFormSubmit);
  };

  var onSetupOpenClick = function () {
    openPopup();
  };

  var onSetupOpenEnterKeydown = function (evt) {
    if (window.utils.isEnterEvent(evt)) {
      openPopup();
    }
  };

  var onSetupOpenEscKeydown = function (evt) {
    var target = evt.target;
    if (window.utils.isEscEvent(evt) && !target.classList.contains('setup-user-name')) {
      closePopup();
    }
  };

  var onSetupCloseClick = function () {
    closePopup();
  };

  var onSetupCloseEnterKeydown = function (evt) {
    if (window.utils.isEnterEvent(evt)) {
      closePopup();
    }
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), closePopup, window.error);
    evt.preventDefault();
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenEnterKeydown);

  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterKeydown);

  window.dialog = userDialog;

})();
