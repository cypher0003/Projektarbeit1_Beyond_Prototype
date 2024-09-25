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
    baseUrlProduct: "https://czag01r20wa-productservice-test.azurewebsites.net",
    baseUrlEntitlement:
      "https://czag01r20wa-entitlementservice-test.azurewebsites.net",
    baseUrlUser: "https://czag01r20wa-userservice-test.azurewebsites.net",
    baseUrlOrganization:
      "https://czag01r20wa-organizationservice-test.azurewebsites.net",
    baseUrlAppSetting:
      "https://czag01r20wa-appsettingservice-test.azurewebsites.net",
    baseUrlReport: "https://czag01r20wa-reportservice-test.azurewebsites.net",
    baseUrlDevice: "https://czag01r20wa-deviceservice-test.azurewebsites.net",
    baseUrlLicense: "https://czag01r20wa-licenseservice-test.azurewebsites.net",
    baseUrlOrder: "https://czag01r20wa-orderservice-test.azurewebsites.net",
    baseUrlFunctionApps: "https://czswlservices-test.azurewebsites.net",
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
