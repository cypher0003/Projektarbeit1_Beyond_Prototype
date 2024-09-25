import { ActivationResponseV1 } from "../../Data/TransferObjects/ActivationResponse.mjs";

import { ActivationRequest } from "../../Data/TransferObjects/ActivationRequest.mjs";

import { SignedMessage } from "../../Data/TransferObjects/SignedMessage.mjs";

import { Activation } from "../../Data/Models/Activation.mjs";

import { LegacyReturnRequest } from "../../Data/TransferObjects/LegacyReturnRequest.mjs";

import { LegacyReturnResponse } from "../../Data/TransferObjects/LegacyReturnResponse.mjs";

import { LegacyRepairRequest } from "../../Data/TransferObjects/LegacyRepairRequest.mjs";

import { LegacyRepairResponse } from "../../Data/TransferObjects/LegacyRepairResponse.mjs";

import { GetActivatableItemsResponse } from "../../Data/TransferObjects/V1/GetActivatableItem.mjs";

import { AssociateFingerprintRequestItem } from "../../Data/TransferObjects/AssociateFingerprintRequestItem.mjs";

import { PermissionTicketResponse } from "../../Data/TransferObjects/PermissionTicketResponse.mjs";

import { RevocationProofItem } from "../../Data/TransferObjects/RevocationProofItem.mjs";

import { DeassignFingerprintRequestItem } from "../../Data/TransferObjects/DeassignFingerprintRequestItem.mjs";

export class IActivationClient {
  /** 

     * Activate license 

     * @param {ActivationRequest} activationRequest - Activation request 

     * @returns {Promise<ActivationResponseV1>} - License text 

     */

  async activate(activationRequest) {
    // Implement the method to activate license
  }

  /** 

     * Process signed messages (Activate / Upgrade / UpgradeValidation / OneStepReturn) 

     * @param {SignedMessage} signedMessage - Signed message 

     * @returns {Promise<SignedMessage>} - Signed message 

     */

  async processSigned(signedMessage) {
    // Implement the method to process signed messages
  }

  /** 

     * Get the activation object for an activation id 

     * @param {string} activationId - Activation id 

     * @returns {Promise<Activation>} - Activation object 

     */

  async getActivation(activationId) {
    // Implement the method to get the activation object for an activation id
  }

  /** 

     * Return 

     * @param {LegacyReturnRequest} legacyReturnRequest - Return request 

     * @param {boolean} [overridePolicy=false] - Overwrite policy 

     * @returns {Promise<LegacyReturnResponse>} - Return response 

     */

  async return(legacyReturnRequest, overridePolicy = false) {
    // Implement the method to handle return request
  }

  /** 

     * Repair 

     * @param {LegacyRepairRequest} legacyRepairRequest - Repair request 

     * @returns {Promise<LegacyRepairResponse>} - Repair response 

     */

  async repair(legacyRepairRequest) {
    // Implement the method to handle repair request
  }

  /** 

     * Get activatable items 

     * @param {Array<string>} itemIds - Item ids (Product keys or entitlement ids) 

     * @param {boolean} [includeFnpTrustedStorage=false] - If set to true the response contains trusted storage licenses 

     * @returns {Promise<GetActivatableItemsResponse>} - Activatable items response 

     */

  async getActivatableItems(itemIds, includeFnpTrustedStorage = false) {
    // Implement the method to get activatable items
  }

  /** 

     * Assign license 

     * @param {AssociateFingerprintRequestItem} associateFingerprintRequestItem - Fingerprint 

     * @returns {Promise<Array<string>>} - List of invalid item ids 

     */

  async assign(associateFingerprintRequestItem) {
    // Implement the method to assign license
  }

  /** 

     * Get permission ticket 

     * @param {string} activationId - Activation id 

     * @param {boolean} [overwritePolicy=false] - Flag: overwrite policy 

     * @returns {Promise<string>} - Permission ticket 

     */

  async getPermissionTicket(activationId, overwritePolicy = false) {
    // Implement the method to get permission ticket
  }

  /** 

     * Get permission tickets 

     * @param {string} activationId - Activation id 

     * @param {boolean} [overwritePolicy=false] - Flag: overwrite policy 

     * @returns {Promise<PermissionTicketResponse>} - Permission ticket response 

     */

  async getPermissionTickets(activationId, overwritePolicy = false) {
    // Implement the method to get permission tickets
  }

  /** 

     * Submit a revocation proof 

     * @param {string} activationId - Activation id 

     * @param {RevocationProofItem} revocationProofItem - Revocation proof item 

     * @returns {Promise<string>} - Revocation proof response 

     */

  async submitRevokationProof(activationId, revocationProofItem) {
    // Implement the method to submit a revocation proof
  }

  /** 

     * Submit revocation proofs 

     * @param {string} activationId - Activation id 

     * @param {RevocationProofItem} revocationProofItem - Revocation proof item 

     * @returns {Promise<void>} 

     */

  async submitRevocationProofs(activationId, revocationProofItem) {
    // Implement the method to submit revocation proofs
  }

  /** 

     * Deassign a fingerprint from product keys 

     * @param {DeassignFingerprintRequestItem} deassignFingerprintRequestItem - Request 

     * @returns {Promise<Array<string>>} - Deassign response 

     */

  async deassign(deassignFingerprintRequestItem) {}
}
