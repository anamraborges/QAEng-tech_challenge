const { test, expect } = require("@playwright/test")
const { ModalPage } = require("../../pages/modal.po.js")
const { STATE, ZIP_CODE, INVALID_EMAIL, INVALID_ZIP_CODE } = require("../constants/env.js")
const { ShopPage } = require("../../pages/shop.po.js")
const { ContactDetailsPage } = require("../../pages/contactDetails.po.js")
const { error } = require("console")


test("Validate the negative path of enquiring the highest price at Mercedes-Benz", async({ page })  => {
    const modalPage = new ModalPage(page)
    const shopPage = new ShopPage(page)
    const contactDetailsPage = new ContactDetailsPage(page)
   
    await modalPage.goto()
   
    //Cookies banner is visible
    await test.step("Cookies banner is visible", async() => {
        const cookiesBanner = await page.waitForSelector('.cmm-cookie-banner__overlay')
       
        await cookiesBanner.toBeVisible
    })
 
    //Accept cookies
    await test.step("Accept cookies", async() => {
        const cookies = await modalPage.acceptCookiesButton()
        
        await cookies.click()
    })

    //Cookies banner is not shown anymore and modal is shown
    await test.step("Open the Mercedes-Benz Shop used cars in Australian market", async() => {
        await expect(await modalPage.getModal()).toBeVisible()
    })

    //Fill the modal
    await test.step("Fill the modal with valid data", async() => {
        const dropdown = await modalPage.getStateDropdown()
        
        await dropdown.click()
        await modalPage.selectTextInStateModal(STATE)
        await dropdown.click()
        await modalPage.fillZipCode(INVALID_ZIP_CODE) 
        
        const error = await modalPage.getErrorMessage() //To check the error message when we insert an invalid postal code
        
        await expect(error).toBeVisible()
        await modalPage.fillZipCode(ZIP_CODE)
        
        const privatePurpose = await modalPage.getPrivate()
        
        await privatePurpose.click()
    })

    //Click on 'Continue' button
    await test.step("Click on 'Continue' button", async() => {
        const continueButton = await modalPage.getContinueButton()
        
        await continueButton.click()
    })

     //Click on filter button
    await test.step("Click on filter button", async() => {
        const filterButton = await shopPage.getFilter()
        
        await expect(filterButton).toBeVisible()
    })

    //Select 'Pre-Owned' tab
    await test.step("Select 'Pre-Owned' tab", async() => {
        const preOwned = await shopPage.getPreOwned()
        await expect(preOwned).toBeVisible()
        await preOwned.click()
    })

    //Select colour: BRILLANTBLUE metallic
    await test.step("Select color", async() => {
        const colorFilter = await shopPage.getColorFilter()
        
        await colorFilter.click()

        const selectColor = await shopPage.selectColorDropdown()
        
        await selectColor.click()

        const blueColour = await shopPage.selectBlueColour()

        await blueColour.click()
    })

    //Sort by price (descending)
    await test.step("Sort cars by descending price", async() => {
        const sortingPrice = await shopPage.getSortingDropdown()
        
        await sortingPrice.click()
        await shopPage.selectTextInStateModal('Price (descending)')
    })

    //Select the 1st listed vehicle and click on "Expore" button
    await test.step("Select 1st listed vehicle and click on 'Explore & Buy' button", async() => {
        const cars = await shopPage.getListCars()
        
        await expect(cars).toBeVisible()
        
        const exploreButton = await shopPage.getExploreButton()
        
        await expect(exploreButton).toBeVisible()
        await exploreButton.click()
    })

    //Car details were not saved to a file as requested

    //Click on "EnquireNow" button
    await test.step("Click on 'Enquire' button", async() => {
        const enquireButton = await shopPage.getEnquireNowButton()
        
        await enquireButton.click()
    })

    //Fill the "Contact Details and Account Creation" form with invalid data
    await test.step("Fill the contact details with invalid email", async() => {
        const email = await contactDetailsPage.getEmailField()
        
        await expect(email).toBeVisible()
        await email.click()
        await email.fill(INVALID_EMAIL)
    })

    //Click on "Proceed" button
    await test.step("Click on 'Proceed' button", async() => {
        const proceedButton = await contactDetailsPage.getProceedButton()
        
        await proceedButton.click()
    })

    //Check the error
    await test.step("Check the displayed error", async() => {
        const errorMessage = await contactDetailsPage.getErrorMessage()
        
        await expect(errorMessage).toBeVisible()
    })


}) 