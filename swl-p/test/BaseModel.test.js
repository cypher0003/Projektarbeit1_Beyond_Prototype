import { expect } from "chai";
import { BaseModel } from "../Data/Models/BaseModel.mjs";

/*eslint-env mocha*/
describe("Clone BaseModel", () => {
  it("Should create a clone instance of baseModel", () => {
    const parentBaseModel = new BaseModel();
    parentBaseModel.id = "testId";
    const childBaseModel = parentBaseModel.clone();
    expect(childBaseModel.id).to.equal("testId");
  });
});
