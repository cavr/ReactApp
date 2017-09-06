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
