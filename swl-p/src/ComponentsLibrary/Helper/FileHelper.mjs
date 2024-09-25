import pkg from "file-saver";
const { saveAs } = pkg;

class FileHelper {
  /** 

     * Save file 

     * @param {string} fileName - Filename 

     * @param {string} content - Content 

     */

  static async saveFile(fileName, content) {
    const blob = new Blob([content], { type: "application/json" });

    saveAs(blob, fileName);
  }

  /** 

     * Save binary file 

     * @param {string} fileName - Filename 

     * @param {Uint8Array} data - Data 

     */

  static async saveBinaryFile(fileName, data) {
    const blob = new Blob([data], { type: "application/octet-stream" });

    saveAs(blob, fileName);
  }
}

export { FileHelper };
