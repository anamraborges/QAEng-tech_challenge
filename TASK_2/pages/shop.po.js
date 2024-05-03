exports.ShopPage = class ShopPage {
    constructor(page) {
        this.page = page
        this.filter = page.locator("[class='filter-toggle']")
        this.sidePanel = page.locator("[class='dcp-cars-srp__filters dcp-cars-srp-filters']") 
        this.preOwned = page.getByRole("button", { name: "Pre-Owned" })
        this.listCars = page.locator("[class='dcp-shop__container']")
        this.enquireNowButton = page.locator('button[data-test-id="dcp-buy-box__contact-seller"]')
        this.exploreButton = page.locator('div[data-test-id="image-slider__touch"]').first()
        this.sortingDropdown = page.getByLabel("Sorting")
        this.colorFilter = page.locator('p.category-filter-row-headline__text:has-text("Colour")')
        this.colorSelect = page.locator('.dcp-multi-select-dropdown-frame__label:has-text("Colour")')
        this.blueColour = page.locator('.dcp-multi-select-dropdown-card__pill-wrapper:has-text("BRILLANTBLUE metallic")')
    }

    async getColorFilter() {
        return await this.colorFilter
    }

    async getEnquireNowButton() {
        return await this.enquireNowButton
    }

    async getExploreButton() {
        return await this.exploreButton
    }

    async getFilter() {
		return await this.filter
	}

    async getListCars() {
        return await this.listCars
    }

    async getPreOwned() {
		return await this.preOwned
	}

    async getSidePanel() {
		return await this.sidePanel
	}

    async getSortingDropdown() {
		return await this.sortingDropdown
	}

    async selectTextInStateModal(text) {
        return await this.page.getByLabel("Sorting").selectOption(text)
    }

    async selectColorDropdown() {
        return await this.colorSelect
    }

    async selectBlueColour() {
        return await this.blueColour
    }

}