export class LicenseFile {
  constructor() {
    this.DeviceId = "";
    this.Extension = "";
    this.LicenseString = "";
    this.FileName = "";
  }
}

export class LicenseFileV1 extends LicenseFile {
  constructor() {
    super();
    this.EntitlementId = "";
    this.ProductKeyID = "";
    this.ActivationId = "";
  }
}

export class LicenseFileV2 extends LicenseFile {
  constructor() {
    super();
    this.Items = [];
  }
}
