exports.ContactDetailsPage = class ContactDetailsPage {
    constructor(page) {
        this.page = page
        this.email = page.locator('div[data-test-id="rfq-contact__email"]')
        this.proceedButton = page.locator('button[data-test-id="dcp-rfq-contact-button-container__button-next"]')
        this.errorMessage = page.locator("[class='dcp-error-message']")
    }

    async getEmailField() {
        return await this.email.locator('input')
    }

    async getErrorMessage() {
        return await this.errorMessage
    }

    async getProceedButton() {
        return await this.proceedButton
    }

}