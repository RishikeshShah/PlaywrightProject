const {test, expect} = require('@playwright/test');

test('Calendar validations', async ({page}) => {
    const numthNumber = "6";
    const date = "15";
    const year = "2027";
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    // to select the year , month and date three click above is required
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(numthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click(); 
    // to assert the correct date let's use forEach method

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

 
   
});