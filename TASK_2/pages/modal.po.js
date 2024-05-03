exports.ModalPage = class ModalPage {
    constructor(page) {
        this.page = page    
        this.modal = page.locator("[class='wb-modal-edit-content__section']")
        this.stateDropdown = page.getByLabel(" * Your state")
		this.zipCode = page.locator('input[aria-labelledby="postal-code-hint"]')
		this.purposePrivate = page.locator('wb-radio-control label').filter({ hasText: 'Private' })
        this.continueButton = page.getByRole("button", { name: "Continue" })
        this.cookieBanner = page.locator("[class='cmm-cookie-banner__wrapper.visible']")
        this.cookies = page.locator("[class='main-title wb-heading hydrated']")
        this.agreeAllButton = page.getByRole("button", { name: "Agree to all" })
        this.inlineErrorMessage = page.locator('wb-control-error')
    }

    async goto() {
		await this.page.goto("https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo")
	}

    async getContinueButton() {
        return await this.continueButton
	}

    async getErrorMessage() {
        return await this.inlineErrorMessage
    }

    async getModal() {
        return await this.modal
    }

    async getPrivate() {
		return await this.purposePrivate
	}

    async getStateDropdown() {
		return await this.stateDropdown
	}

    async getZipCodeField() {
        return await this.zipCode
    }
    
    async acceptCookiesButton() {
        return await this.agreeAllButton
    }

    async selectTextInStateModal(text) {
        return await this.page.getByLabel(" * Your state").selectOption(text)
    }

    async fillZipCode(number) {
        const zipCodeField = await this.getZipCodeField()
        
        await zipCodeField.click()
        await zipCodeField.fill(number)
    }



}
