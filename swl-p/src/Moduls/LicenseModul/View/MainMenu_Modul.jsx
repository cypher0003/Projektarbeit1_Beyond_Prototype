import React, { useState } from "react";

const LicenseComponent = () => {
  const [activationID, setActivationID] = useState("");

  const [license, setLicense] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleFetchLicense = async () => {
    setLoading(true);

    setError(null);

    try {
      const fetchedLicense = await licenseController.fetchLicense(activationID);

      setLicense(fetchedLicense);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>License Data:</h1>

      <input
        type="text"
        value={activationID}
        onChange={(e) => setActivationID(e.target.value)}
        placeholder="Enter Activation ID"
      />

      <button onClick={handleFetchLicense}>Fetch License</button>

      {loading && <div>Loading...</div>}

      {error && <div>Error: {error}</div>}

      {license && <pre>{JSON.stringify(license, null, 2)}</pre>}
    </div>
  );
};

export default LicenseComponent;

import { Footer_Comp } from "../../../Components/Footer.jsx";
import {
  Headline,
  Grid,
  Container,
  Cell,
  Button,
  TextArea,
  Logo,
} from "@zeiss/beyond-online-react";
import FileUploadDropdown from "../../../Components/MainMenu_Components/DropDownBox_Component.jsx";
import "../../../Components/MainMenu_Components/MainMenu_Modul.css";

export const MainMenu = () => {
  const [activationID, setActivationID] = useState("");
  const [license, setLicense] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleFetchLicense = async () => {
    setLoading(true);

    setError(null);

    try {
      const fetchedLicense = await licenseController.fetchLicense(activationID);

      setLicense(fetchedLicense);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Logo onClick={function noRefCheck() {}} size="l" variant="default" />
      <Headline
        headline="Software Licensing"
        subHeadline="ZEISS License Management"
        size="xl"
      />
      <Grid>
        <Container.InnerGrid className="Headline-Container">
          <Cell.Basic colSpan={[3, 4, 5]}>{}</Cell.Basic>
          <Container.InnerGrid className="Upload-Container">
            <Cell.MaxWidth></Cell.MaxWidth>
            <Cell.MaxWidth>
              <Headline
                className="Headline"
                subHeadline="File upload"
                size="xl"
              ></Headline>
            </Cell.MaxWidth>
            <Cell.Basic colSpan={[2, 3, 4]}>
              <div className="Restrictions-Container">
                Allowed filetypes:
                <ul>
                  <p></p>
                  <li> Activation request (*.xml; *.json)</li>
                  <p></p>
                  <li> Upgrade request (*.json)</li>
                  <p></p>
                  <li> Revocation proof (*.json)</li>
                  <p></p>
                  <li> Return request (*.xml; *.json)</li>
                  <p></p>
                  <li> Repair request (*.xml)</li>
                </ul>
              </div>
            </Cell.Basic>
            <Cell.Basic colSpan={[5, 6, 7, 8]}>
              {<FileUploadDropdown />}
            </Cell.Basic>
            <Cell.MaxWidth>
              {<Button className="Upload-Button">Next</Button>}
            </Cell.MaxWidth>
          </Container.InnerGrid>

          <Container.InnerGrid className="Manual-Activation-Container">
            <Container.InnerGrid className="Items-Container">
              <Cell.MaxWidth>
                <Headline
                  className="Headline"
                  subHeadline="Manual activation"
                ></Headline>
              </Cell.MaxWidth>
              <Cell.Basic colSpan={[3, 4]}>
                <TextArea
                  size="m"
                  label="Product key / Entitlement Id:"
                  placeholder="Enter Product Key/ Entitlement Id here"
                  helperText=""
                  value={activationID}
                  onChange={(e) => setActivationID(e.target.value)}
                ></TextArea>
              </Cell.Basic>

              <Cell.Basic></Cell.Basic>
              <Cell.Basic colSpan={[3, 4]}>
                <TextArea
                  size="m"
                  label="Device / HostId:"
                  placeholder="Enter Device / HostId here"
                  helperText=""
                ></TextArea>
              </Cell.Basic>
            </Container.InnerGrid>
            <Cell.Basic>
              <Button className="Upload-Button" onClick={handleFetchLicense}>
                Next
              </Button>
              {loading && <div>Loading...</div>}

              {error && <div>Error: {error}</div>}

              {license && <pre>{JSON.stringify(license, null, 2)}</pre>}
            </Cell.Basic>
          </Container.InnerGrid>

          <Container.InnerGrid className="Request-Revocation-Container">
            <Container.InnerGrid className="Items-Container">
              <Cell.MaxWidth>
                <Headline
                  className="Headline"
                  subHeadline="Request revocation"
                ></Headline>
              </Cell.MaxWidth>
              <Cell.Basic></Cell.Basic>
              <Cell.MaxWidth>
                <TextArea
                  size="m"
                  label="Activation ID:"
                  placeholder="Enter Activation ID here"
                  helperText=""
                ></TextArea>
              </Cell.MaxWidth>
            </Container.InnerGrid>

            <Cell.Basic>
              <Button className="Upload-Button">Next</Button>
            </Cell.Basic>
          </Container.InnerGrid>
        </Container.InnerGrid>
        <Cell.MaxWidth></Cell.MaxWidth>
      </Grid>

      <div className="Footer-Container">
        <Footer_Comp></Footer_Comp>
      </div>
    </>
  );
};
