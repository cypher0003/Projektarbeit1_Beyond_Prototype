import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import { DialogOkDiscardComponent } from "./DialogOkDiscard";

import { RevocationComponentViewModel } from "../../src/Moduls/LicenseModul/Model/RevocationComponentViewModel.mjs";
import {
  Headline,
  Grid,
  Container,
  Cell,
  Button,
  TextArea,
  Logo,
} from "@zeiss/beyond-online-react";

const ManualActivationComponent = () => {
  const [productKey_EntitlementID, setProductKey_EntitlementKey] = useState("");
  const [device_hostId, setDevice_HostId] = useState("");
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
    <Grid>
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
              value={productKey_EntitlementID}
              onChange={(e) => setProductKey_EntitlementKey(e.target.value)}
            ></TextArea>
          </Cell.Basic>

          <Cell.Basic></Cell.Basic>
          <Cell.Basic colSpan={[3, 4]}>
            <TextArea
              size="m"
              label="Device / HostId:"
              placeholder="Enter Device / HostId here"
              helperText=""
              value={device_hostId}
              onChange={(e) => setDevice_HostId(e.target.value)}
            ></TextArea>
          </Cell.Basic>
        </Container.InnerGrid>
        <Cell.Basic>
          <Button
            className="Upload-Button"
            onClick={handleFetchLicense}
            disabled={!productKey_EntitlementID || !device_hostId}
          >
            Next
          </Button>
          {loading && <div>Loading...</div>}

          {error && <div>Error: {error}</div>}

          {license && <pre>{JSON.stringify(license, null, 2)}</pre>}
        </Cell.Basic>
      </Container.InnerGrid>
    </Grid>
  );
};
export default ManualActivationComponent;
