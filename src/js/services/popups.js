import Popup from 'react-popup';

export function informationPopup(title, content) {
  return Popup.register({
    title,
    content,
    buttons: {
      right: [{
        text: 'Accept',
        className: 'bluetab-button',
        action: (popup) => {
          popup.close();
        },
      }],
    },
  });
}

export function warningAndChoicePopup(title, content, callback) {
  return Popup.register({
    title,
    content,
    buttons: {
      left: [{
        text: 'Accept',
        className: 'bluetab-button',
        action: (popup) => {
          popup.close();
          callback();
        },
      }],
      right: [{
        text: 'Decline',
        className: 'bluetab-button',
        action: (popup) => {
          popup.close();
        },
      }],
    },
  });
}
