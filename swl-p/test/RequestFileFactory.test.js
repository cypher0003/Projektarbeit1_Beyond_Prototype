// import { expect } from "chai";
// import { RequestFileFactory } from "../WebServiceClient/Models/RequestFileFactory.mjs";
// import { RequestFileType } from "../WebServiceClient/Enums/RequestFileType.mjs";

// import { ActivationClient } from "../WebServiceClient/Clients/ActivationClient.mjs";

// import { LocationPrefixValidator } from "../WebServiceClient/Clients/LocationPrefixValidator.mjs";

// /*eslint-env mocha*/

// describe("RequestFileFactory", () => {
//   let activationClient;

//   let locationPrefixValidator;

//   let factory;

//   beforeEach(() => {
//     activationClient = new ActivationClient(null, null);

//     locationPrefixValidator = new LocationPrefixValidator({
//       getValue: () => "",
//     });

//     factory = new RequestFileFactory(activationClient, locationPrefixValidator);
//   });

//   describe("createUploadFile", () => {
//     it("should create an ActivationRequestFile for activation file content", () => {
//       const fileContent = '{ "ItemIdsWithQuantity": ["123"] }';

//       const result = factory.createUploadFile(fileContent);

//       expect(result.constructor.name).to.equal("ActivationRequestFile");
//     });

//     it("should create a TrustedStorageActivationRequestFile for trusted storage activation file content", () => {
//       const fileContent = "<RequestActivate></RequestActivate>";

//       const result = factory.createUploadFile(fileContent);

//       expect(result.constructor.name).to.equal(
//         "TrustedStorageActivationRequestFile"
//       );
//     });

//     it("should create a CertificateActivationRequestFile for certificate activation file content", () => {
//       const fileContent =
//         "<offline_dongle_activation></offline_dongle_activation>";

//       const result = factory.createUploadFile(fileContent);

//       expect(result.constructor.name).to.equal(
//         "CertificateActivationRequestFile"
//       );
//     });

//     it("should throw an error for invalid file content", () => {
//       const fileContent = "Invalid Content";

//       expect(() => factory.createUploadFile(fileContent)).to.throw(
//         "File content is invalid."
//       );
//     });
//   });

//   describe("getUploadFileType", () => {
//     it("should return Unknown for empty file content", () => {
//       const result = factory.getUploadFileType("");

//       expect(result).to.equal(RequestFileType.Unknown);
//     });

//     it("should return Activation for valid activation JSON content", () => {
//       const fileContent = '{ "ItemIdsWithQuantity": ["123"] }';

//       const result = factory.getUploadFileType(fileContent);

//       expect(result).to.equal(RequestFileType.Activation);
//     });

//     it("should return TrustedStorageActivation for valid trusted storage activation XML content", () => {
//       const fileContent = "<RequestActivate></RequestActivate>";

//       const result = factory.getUploadFileType(fileContent);

//       expect(result).to.equal(RequestFileType.TrustedStorageActivation);
//     });

//     it("should return CertificateActivation for valid certificate XML content", () => {
//       const fileContent =
//         "<offline_dongle_activation></offline_dongle_activation>";

//       const result = factory.getUploadFileType(fileContent);

//       expect(result).to.equal(RequestFileType.CertificateActivation);
//     });

//     it("should return Unknown for invalid content", () => {
//       const fileContent = "Invalid Content";

//       const result = factory.getUploadFileType(fileContent);

//       expect(result).to.equal(RequestFileType.Unknown);
//     });
//   });

//   describe("isXmlFileContent", () => {
//     it("should return true for valid XML content", () => {
//       const fileContent = "<root></root>";

//       const result = factory.isXmlFileContent(fileContent);

//       expect(result).to.be.true;
//     });

//     it("should return false for invalid XML content", () => {
//       const fileContent = "<root>";

//       const result = factory.isXmlFileContent(fileContent);

//       expect(result).to.be.false;
//     });
//   });

//   describe("isRevocationProofJsonFileContent", () => {
//     it("should return true for valid RevocationProof JSON content", () => {
//       const fileContent = '{ "Revocation": true }';

//       const result = factory.isRevocationProofJsonFileContent(fileContent);

//       expect(result).to.be.true;
//     });

//     it("should return false for invalid RevocationProof JSON content", () => {
//       const fileContent = '{ "Invalid": true }';

//       const result = factory.isRevocationProofJsonFileContent(fileContent);

//       expect(result).to.be.false;
//     });
//   });
// });
