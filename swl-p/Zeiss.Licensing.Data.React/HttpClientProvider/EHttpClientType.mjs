export const EHttpClientType = Object.freeze({
  Product: "Product",

  Entitlement: "Entitlement",

  User: "User",

  Organization: "Organization",

  AppSetting: "AppSetting",

  Report: "Report",

  Device: "Device",

  License: "License",

  Order: "Order",

  ESBSAPCore: "ESBSAPCore",

  ESBMail: "ESBMail",

  EMS: "EMS",

  ESBSD: "ESBSD",

  ZeissIdRead: "ZeissIdRead",

  ZeissIdDevice: "ZeissIdDevice",

  Activation: "Activation",

  LicenseGenerator: "LicenseGenerator",

  Job: "Job",

  ReportDatabase: "ReportDatabase",

  ZeissIdUnsubscribe: "ZeissIdUnsubscribe",

  ESBEvaPlatform: "ESBEvaPlatform",

  ESBLicensingIntegration: "ESBLicensingIntegration",

  ESBAuthZ: "ESBAuthZ",

  AuthZ: "AuthZ",
});

console.log("Client types to generate HTTP client for:");

Object.values(EHttpClientType).forEach((type) => {
  console.log(type);
});
