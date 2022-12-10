import React from "react";

export default function InfoTooltip({ onClose, infoRegister }) {
  return (
    <div
      className={`popup popup_type_registration ${
        infoRegister.status && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button popup__close-button_type_registration"
          aria-label="кнопка закрыть."
        ></button>
        <div
          className={`popup__icon popup__icon_type_${infoRegister.icon}`}
        ></div>
        <p className="popup__caption">{infoRegister.message}</p>
      </div>
    </div>
  );
}
