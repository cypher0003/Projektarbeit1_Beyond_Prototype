import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { MainMenu } from "./Moduls/LicenseModul/View/MainMenu_Modul.jsx";
import { DialogOkDiscardComponent } from "../LicenseModule/Components/DialogOkDiscard.jsx";

import { useState } from "react";

const App = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOkClick = () => {
    console.log("OK clicked");

    setShowDialog(false); // Dialog schließen
  };

  const handleDiscardClick = () => {
    console.log("Discard clicked");

    setShowDialog(false); // Dialog schließen
  };

  const handleCloseClick = () => {
    console.log("Close clicked");

    setShowDialog(false); // Dialog schließen
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>Show Dialog</button>

      <DialogOkDiscardComponent
        caption="Confirm Action"
        text="Are you sure you want to proceed?"
        showDialog={showDialog}
        onOkClick={handleOkClick}
        onDiscardClick={handleDiscardClick}
        onCloseClick={handleCloseClick}
        showCheckBox={false}
        checkText=""
        checked={false}
        isLoading={false}
        showDiscard={true}
      />
    </div>
  );
};

export { App };
