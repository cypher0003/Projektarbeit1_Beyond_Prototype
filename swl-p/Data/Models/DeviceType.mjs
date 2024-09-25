class DeviceType {
  constructor() {
    this.name = "";

    this.isServer = false;

    this.creatableOnActivation = false;

    this.allowedIds = [];

    this.enhanceDeviceId = false;

    this.allowDemoLicense = false;

    this.enabled = false;

    this.businessgroup = "";

    this.creationDate = new Date();

    this.lastModifiedDate = null;

    this.uniqueName = false;

    this.validation = "";

    this.globalId = "";
  }
}

export default DeviceType;
