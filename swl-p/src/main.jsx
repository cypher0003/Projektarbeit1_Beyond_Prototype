import React from "react";
import ReactDOM from "react-dom/client";
import RevocationComponent from "../LicenseModule/Components/RevocationComponent";
import { HttpClientProvider } from "../WebServiceClient/Clients/HttpClientProvider.mjs";
import {
  ProtectedSessionStorage,
  ProtectedSessionStorageRepositoryHelper,
} from "../src/ComponentsLibrary/Helper/PortectedStorageHelper.mjs";
import { ActivationClient } from "../WebServiceClient/Clients/ActivationClient.mjs";
import { UserClient } from "../WebServiceClient/Clients/UserClient.mjs";
import ManualActivationComponent from "../LicenseModule/Components/ManualActivationComponent";
import "./main.css";
import { Logo, Cell, Grid, Headline } from "@zeiss/beyond-online-react";
import { FileUploadComponent } from "../LicenseModule/Components/FileUploadComponent";
import { Footer_Comp } from "./Components/Footer";
import { FileUploadComponentViewModel } from "./Moduls/LicenseModul/Model/FileUploadComponentModel.mjs";
import { LocationPrefixValidator } from "../WebServiceClient/Clients/LocationPrefixValidator.mjs";
import { configurationVal } from "../WebServiceClient/Config/prefixValidatorTest.mjs";

const protectedSessionStorage = new ProtectedSessionStorage();
const locationprefixVal = new LocationPrefixValidator(configurationVal);

const protectedSessionStorageRepositoryHelper =
  new ProtectedSessionStorageRepositoryHelper(protectedSessionStorage);

const cache = {};

const configuration = {
  Endpoint: {
    baseUrlProduct: "https://test-Url",
    baseUrlEntitlement: "https://test-Url",
    baseUrlUser: "https://test-Url",
    baseUrlOrganization: "https://test-Url",
    baseUrlAppSetting: "https://test-Url",
    baseUrlReport: "https://test-Url",
    baseUrlDevice: "https://test-Url",
    baseUrlLicense: "https://test-Url",
    baseUrlOrder: "https://test-Url",
    baseUrlFunctionApps: "https://test-Url",
  },
};

const httpClientProvider = new HttpClientProvider(
  configuration,
  null,
  cache,
  protectedSessionStorageRepositoryHelper
);

const activationClient = new ActivationClient(httpClientProvider, null);

const userClient = new UserClient(httpClientProvider, null);

const handleClear = () => {
  console.log("cleared");
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Logo onClick={function noRefCheck() {}} size="l" variant="default" />
    <Headline
      headline="Software Licensing"
      subHeadline="ZEISS License Management"
      size="xl"
    />

    <Grid>
      <FileUploadComponent
        onClear={handleClear}
        activationClient={activationClient}
        locationPrefixValidator={locationprefixVal}
        configuration={configurationVal}
      />
      <ManualActivationComponent
        activationClient={activationClient}
        locationPrefixValidator={locationprefixVal}
      />
      <Cell.MaxWidth></Cell.MaxWidth>
      <RevocationComponent
        userClient={userClient}
        activationClient={activationClient}
        onClear={handleClear}
      />
    </Grid>
    <Footer_Comp />
  </React.StrictMode>
);
