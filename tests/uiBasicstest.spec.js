const {test, expect} = require('@playwright/test');

test.only('Browser Context playwright test', async ({browser}) => {
    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    console.log(await page.title());

        // declearing variable
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator('.card-body a');

    // invalid login
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();
    // assertion for invalid user or password
    console.log(await page.locator("[style*='block']").textContent());

    // valid login
    await userName.fill(""); // clearing the box
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learnings");
    await signIn.click();

    // after login lets get the first item
    //console.log(await cardTitle.textContent()); // getting  multiple item with same locater
    console.log(await cardTitle.first().textContent()); // getting  first element
    console.log(await cardTitle.nth(1).textContent()); // getting second element

    // getting all the elements and saving in array variable
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test('UI Controls radio btn and dropdown', async ({browser}) => {

    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    console.log(await page.title());
    const userName = page.locator('#username');
    const password = page.locator('#password');
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    // dropdown with tag select 
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    // selecting radio button
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    // assertion for radio button checked 
    console.log(await page.locator(".radiotextsty").last().isChecked()); // print true
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator('#terms').uncheck();
    // assertion for uncheck is not available so we can check indirectly
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // should return false
    // assertion for blinking text
    const blink = page.locator("[href*='documents-request']");
    await expect(blink).toHaveAttribute('class', 'blinkingText');
    await page.pause(); 
});

test('Child window handl', async ({browser}) => {
    
    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise'); 
    const blink = page.locator("[href*='documents-request']");
    const userName = page.locator('#userEmail');
    
    // we get new page where we can perform operation  
    try {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
            blink.click().catch(error => {
                throw new Error(`Clicking failed: ${error}`);
            }),
        ]);
        const displayText = await newPage.locator(".red").textContent();
        console.log(displayText);
        // DisplayText: Please email us at mentor@rahulshettyacademy.com with below template to receive response 
        // aim is to print, rahulshettyacademy.com
        // approach: splitting text using delimeter; @ and space
        const arrayText = displayText.split('@'); // left side of @ at index 0 and rightside index 1
        const domain = arrayText[1].split(" ")[0]; // at 0 index before space is the text, we want
        console.log(domain);
        // enter this domain user name field of Parent Window
        await page.locator("#username").fill(domain);
   

    } catch (error) {
        console.error(error);
    }
    
});
test('record and playback', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
    const page1 = await page1Promise;
    await page1.getByText('Please email us at mentor@').click();
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('rahulshettyacademy');
    await page.getByLabel('Username:').press('Tab');
    await page.getByLabel('Password:').fill('learning');
    await page.getByLabel('Password:').press('Tab');
    await page.getByLabel('Admin').press('Tab');
    await page.getByRole('combobox').press('Tab');
    await page.getByLabel('I Agree to the terms and').press('Tab');
    await page.getByRole('link', { name: 'terms and conditions' }).press('Tab');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });


//alternative to browser context pw test
test('First playwright test', async ({page}) => {
        await page.goto('https://google.com');
        // get title and assert
        await console.log(page.title());
        await expect(page).toHaveTitle('Google');
       
    });