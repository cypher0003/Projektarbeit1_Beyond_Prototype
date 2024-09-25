import { SearchObjectDocumentAssignment } from "../../Data/SearchObject/SearchObjectDocumentAssignment.mjs";

import { SearchObjectUser } from "../../Data/SearchObject/SearchObjectUser.mjs";

export class SearchHelper {
  static getSearchParameters(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      for (const property in searchObject) {
        if (
          searchObject[property] !== undefined &&
          searchObject[property] !== null
        ) {
          dictSearch[property] = searchObject[property].toString();
        }
      }
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForProductVariant(searchObject) {
    return this.getSearchParameters(searchObject);
  }

  static getSearchParametersForDocumentAssignment(searchObject) {
    return this.getSearchParameters(searchObject);
  }

  static getSearchParametersForDocument(searchObject) {
    return this.getSearchParameters(searchObject);
  }

  static getSearchParametersForDeviceType(searchObject) {
    return this.getSearchParameters(searchObject);
  }

  static getSearchParametersForMailHistory(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.subject = searchObject.subject;

      dictSearch.success = searchObject.success?.toString();

      dictSearch.recipients = searchObject.recipients;

      dictSearch.utcTimestamp = searchObject.utcTimestamp?.toISOString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForProduct(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.name = searchObject.name;

      dictSearch.version = searchObject.version;

      dictSearch.licenseModelName = searchObject.licenseModelName;

      dictSearch.family = searchObject.family;

      dictSearch.businessgroup = searchObject.businessgroup;

      dictSearch.materialnumber = searchObject.materialnumber;

      dictSearch.variantname = searchObject.variantname;

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForFeature(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.name = searchObject.name;

      dictSearch.version = searchObject.version;

      dictSearch.licenseModelName = searchObject.licenseModelName;

      dictSearch.businessgroup = searchObject.businessgroup;

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();

      dictSearch.displayName = searchObject.displayName;
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForOrganization(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.name = searchObject.name;

      dictSearch.number = searchObject.number;

      dictSearch.organizationType = searchObject.organizationType?.toString();

      dictSearch.salesOrganization = searchObject.salesOrganization;

      dictSearch.city = searchObject.city;

      dictSearch.country = searchObject.country;

      dictSearch.state = searchObject.state?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForEntitlement(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.creationDateFrom = searchObject.creationDateFrom
        ?.toISOString()
        .split("T")[0];

      dictSearch.creationDateTo = searchObject.creationDateTo
        ?.toISOString()
        .split("T")[0];

      dictSearch.distributorNumber = searchObject.distributorNumber;

      dictSearch.endCustomerNumber = searchObject.endCustomerNumber;

      dictSearch.entitlementId = searchObject.entitlementId;

      dictSearch.factoryNumber = searchObject.factoryNumber;

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.productKey = searchObject.productKey;

      dictSearch.productMaterialNumber = searchObject.productMaterialNumber;

      dictSearch.productVariantId = searchObject.productVariantId;

      dictSearch.productName = searchObject.productName;

      dictSearch.productVersion = searchObject.productVersion;

      dictSearch.salesOrder = searchObject.salesOrder;

      dictSearch.searchPattern = searchObject.searchPattern?.toString();

      dictSearch.sSC1Number = searchObject.sSC1Number;

      dictSearch.sSC2Number = searchObject.sSC2Number;

      dictSearch.state = searchObject.state?.toString();

      dictSearch.subscriptionNumber = searchObject.subscriptionNumber;

      dictSearch.serialNumber = searchObject.serialNumber;

      dictSearch.entitlementsWithAvailableQuantity =
        searchObject.entitlementsWithAvailableQuantity?.toString();

      dictSearch.productFamily = searchObject.productFamily;
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForLicense(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.creationDateFrom = searchObject.creationDateFrom
        ?.toISOString()
        .split("T")[0];

      dictSearch.creationDateTo = searchObject.creationDateTo
        ?.toISOString()
        .split("T")[0];

      dictSearch.productKey = searchObject.productKey;

      dictSearch.activationtId = searchObject.activationtId;

      dictSearch.entitlementId = searchObject.entitlementId;

      dictSearch.productName = searchObject.productName;

      dictSearch.productVersion = searchObject.productVersion;

      dictSearch.productMaterialNumber = searchObject.productMaterialNumber;

      dictSearch.customerNumber = searchObject.customerNumber;

      dictSearch.deviceId = searchObject.deviceId;

      dictSearch.deviceName = searchObject.deviceName;

      dictSearch.serialNumber = searchObject.serialNumber;

      dictSearch.factoryNumber = searchObject.factoryNumber;

      dictSearch.distributorNumber = searchObject.distributorNumber;

      dictSearch.sSC1Number = searchObject.sSC1Number;

      dictSearch.sSC2Number = searchObject.sSC2Number;

      dictSearch.endCustomerNumber = searchObject.endCustomerNumber;

      dictSearch.isTest = searchObject.isTest?.toString();

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForDevice(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.friendlyName = searchObject.friendlyName;

      dictSearch.lockCode = searchObject.lockCode;

      dictSearch.organizationId = searchObject.organizationId;

      dictSearch.distributorNumber = searchObject.distributorNumber;

      dictSearch.endCustomerNumber = searchObject.endCustomerNumber;

      dictSearch.factoryNumber = searchObject.factoryNumber;

      dictSearch.ssc1Number = searchObject.ssc1Number;

      dictSearch.ssc2Number = searchObject.ssc2Number;

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();

      dictSearch.deviceTypeId = searchObject.deviceTypeId;

      dictSearch.deviceTypeName = searchObject.deviceTypeName;
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForUser(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.firstName = searchObject.firstName;

      dictSearch.lastName = searchObject.lastName;

      dictSearch.email = searchObject.email;

      dictSearch.organizationNumber = searchObject.organizationNumber;

      dictSearch.organizationId = searchObject.organizationId;

      dictSearch.organizationName = searchObject.organizationName;

      dictSearch.pageSize = searchObject.pageSize?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static getSearchParametersForJob(searchObject) {
    let dictSearch = {};

    if (searchObject !== null) {
      dictSearch.status = searchObject.status.toString();

      dictSearch.name = searchObject.name;

      dictSearch.firstName = searchObject.predecessorId?.toString();

      dictSearch.predecessorId = searchObject.pageSize?.toString();

      dictSearch.pageStartIndex = searchObject.pageStartIndex?.toString();

      dictSearch.searchPattern = searchObject.searchPattern?.toString();
    }

    return this.createQueryByParameters(dictSearch);
  }

  static createQueryByParameters(listOfParameters) {
    let query = "";

    for (const [key, value] of Object.entries(listOfParameters)) {
      if (value !== undefined && value !== null && value.trim() !== "") {
        query +=
          (query.length > 0 ? "&" : "?") +
          `${key}=${encodeURIComponent(value)}`;
      }
    }

    return query;
  }
}
