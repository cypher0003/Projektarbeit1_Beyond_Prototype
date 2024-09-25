import { expect } from "chai";

import sinon from "sinon";

import { FileUploadComponentViewModel } from "../src/Moduls/LicenseModul/Model/FileUploadComponentModel.mjs";

import { RequestFileFactory } from "../WebServiceClient/Models/RequestFileFactory.mjs";

import { FileHelper } from "../src/ComponentsLibrary/Helper/FileHelper.mjs";
import { LicenseResource } from "../src/RessourceLibrary/LicenseRessource/LicenseRessource.mjs";

/*eslint-env mocha*/

describe("FileUploadComponentViewModel", () => {
  let activationClientStub;

  let jsRuntimeStub;

  let configurationStub;

  let locationPrefixValidatorStub;

  let viewModel;

  beforeEach(() => {
    activationClientStub = sinon.stub();

    jsRuntimeStub = sinon.stub();

    configurationStub = sinon.stub();

    locationPrefixValidatorStub = sinon.stub();

    viewModel = new FileUploadComponentViewModel(
      activationClientStub,

      jsRuntimeStub,

      configurationStub,

      locationPrefixValidatorStub
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should set the correct dialog text and caption for an activation request with invalid items", async () => {
    const fileContent = '{"type": "Activation", "data": {}}';

    viewModel.fileContent = fileContent;

    const mockValidationResponse = {
      activationValidationResponse: {
        invalidItems: [{ itemId: "1", reason: "Invalid reason" }],

        activationItemIds: ["1", "2", "3"],

        activatableItems: [{ productKey: "1" }, { productKey: "2" }],
      },
    };

    const requestFileFactoryStub = sinon
      .stub(RequestFileFactory.prototype, "createUploadFile")
      .returns({
        type: "Activation",

        validate: sinon.stub().resolves(mockValidationResponse),
      });

    await viewModel.analyzeUploadedFile();

    expect(viewModel.dialogCaption).to.equal(
      LicenseResource.ACTIVATIONREQUESTCONTAINSINVALIDITEMSCAPTION
    );

    expect(viewModel.dialogText).to.equal("- Invalid reason");
  });

  it("should process and download files for a trusted storage return", async () => {
    const fileContent = '{"type": "TrustedStorageReturn", "data": {}}';

    viewModel.fileContent = fileContent;

    const mockValidationResponse = {
      activationValidationResponse: {
        invalidItems: [],

        activationItemIds: [],

        activatableItems: [],
      },
    };

    const requestFileFactoryStub = sinon
      .stub(RequestFileFactory.prototype, "createUploadFile")
      .returns({
        type: "TrustedStorageReturn",

        validate: sinon.stub().resolves(mockValidationResponse),

        process: sinon.stub().resolves([
          {
            fileName: "test.txt",
            fileContent: "test content",
            isBinary: false,
          },
        ]),
      });

    const fileHelperStub = sinon.stub(FileHelper, "saveFile").resolves();

    await viewModel.analyzeUploadedFile();

    expect(viewModel.dialogCaption).to.equal(
      LicenseResource.PROCESSSUCCESSFULCAPTION
    );

    expect(viewModel.dialogText).to.equal(
      LicenseResource.PROCESSSUCCESSFULTEXT
    );

    expect(fileHelperStub.calledOnce).to.be.true;

    expect(fileHelperStub.calledWith(jsRuntimeStub, "test.txt", "test content"))
      .to.be.true;
  });

  it("should throw an error for an unhandled file type", async () => {
    const fileContent = '{"type": "UnknownType", "data": {}}';

    viewModel.fileContent = fileContent;

    const requestFileFactoryStub = sinon
      .stub(RequestFileFactory.prototype, "createUploadFile")
      .returns({
        type: "UnknownType",

        validate: sinon.stub().resolves({}),
      });

    let error;

    try {
      await viewModel.analyzeUploadedFile();
    } catch (e) {
      error = e;
    }

    expect(error).to.be.an("error");

    expect(error.message).to.equal("Unhandled file type: UnknownType");
  });

  it("should save binary files correctly", async () => {
    const downloadFiles = [
      { fileName: "test.bin", fileContent: "dGVzdCBjb250ZW50", isBinary: true },
    ];

    const fileHelperStub = sinon.stub(FileHelper, "saveBinaryFile").resolves();

    await viewModel.downloadFiles(downloadFiles);

    expect(fileHelperStub.calledOnce).to.be.true;

    expect(
      fileHelperStub.calledWith(
        jsRuntimeStub,
        "test.bin",
        sinon.match.instanceOf(Uint8Array)
      )
    ).to.be.true;
  });

  it("should validate file extensions correctly", () => {
    const validExtensions = [".json", ".xml"];

    validExtensions.forEach((ext) => {
      expect(FileUploadComponentViewModel.isFileExtensionValid(ext)).to.be.true;
    });

    const invalidExtensions = [".txt", ".docx"];

    invalidExtensions.forEach((ext) => {
      expect(FileUploadComponentViewModel.isFileExtensionValid(ext)).to.be
        .false;
    });
  });
});
