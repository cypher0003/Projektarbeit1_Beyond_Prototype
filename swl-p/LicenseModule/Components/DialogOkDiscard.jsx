import React, { useState } from "react";

import PropTypes from "prop-types";

export const DialogOkDiscardComponent = ({
  caption = "",

  text = "",

  onOkClick,

  onDiscardClick,

  onCloseClick,

  showDialog,

  showCheckBox = false,

  checkText = "",

  checked = false,

  isLoading = false,

  showDiscard = true,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleOkClick = () => {
    if (onOkClick) onOkClick(text);
  };

  const handleDiscardClick = () => {
    if (onDiscardClick) onDiscardClick("Discard pressed");
  };

  const handleCloseClick = () => {
    if (onCloseClick) onCloseClick(text);
  };

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  if (!showDialog) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleCloseClick}></div>

      <div className="modal-content">
        <header className="modal-card-head">
          <p className="modal-card-title">{caption}</p>

          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseClick}
          ></button>
        </header>

        <section className="modal-card-body">
          {text.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}

          {showCheckBox && (
            <div className="field">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckBoxChange}
              />

              <label className="checkbox">{checkText}</label>
            </div>
          )}
        </section>

        <footer className="modal-card-foot">
          <button
            className={`button is-primary ${isLoading ? "is-loading" : ""}`}
            onClick={handleOkClick}
          >
            OK
          </button>

          {showDiscard && (
            <button className="button" onClick={handleDiscardClick}>
              Discard
            </button>
          )}
        </footer>
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={handleCloseClick}
      ></button>
    </div>
  );
};

DialogOkDiscardComponent.propTypes = {
  caption: PropTypes.string,

  text: PropTypes.string.isRequired,

  onOkClick: PropTypes.func.isRequired,

  onDiscardClick: PropTypes.func.isRequired,

  onCloseClick: PropTypes.func.isRequired,

  showDialog: PropTypes.bool.isRequired,

  showCheckBox: PropTypes.bool,

  checkText: PropTypes.string,

  checked: PropTypes.bool,

  isLoading: PropTypes.bool,

  showDiscard: PropTypes.bool,
};
