import { ValidationStatus } from "../Enums/ValidationStatus.mjs";

export class ValidatorEventArgs {
  constructor() {
    this.status = ValidationStatus.None;
  }
}
