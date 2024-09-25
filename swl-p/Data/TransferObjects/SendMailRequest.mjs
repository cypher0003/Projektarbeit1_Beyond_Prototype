export class SendMailRequest {
  constructor() {
    /** 

         * The mail subject 

         * @type {string} 

         */

    this.subject = "";

    /** 

         * The email body (HTML) 

         * @type {string} 

         */

    this.body = "";

    /** 

         * List of email addresses for recipients 

         * @type {string[]} 

         */

    this.recipients = [];

    /** 

         * List of email addresses for cc recipients 

         * @type {string[]} 

         */

    this.recipientsCc = [];

    /** 

         * From email address 

         * @type {string} 

         */

    this.from = "";

    /** 

         * Sender 

         * @type {string} 

         */

    this.sender = "";

    /** 

         * Reply to email address 

         * @type {string} 

         */

    this.replyTo = "";

    /** 

         * List of attachments (Base-64 encoded) 

         * @type {string[]} 

         */

    this.attachments = [];
  }
}
