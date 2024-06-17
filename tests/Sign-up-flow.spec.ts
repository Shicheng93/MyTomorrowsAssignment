import { test, expect } from '@playwright/test';
import SignUpPage from '../PageObject/SignUpStepOnePage';
import SignUpStepTwoPage from '../PageObject/SignUpStepTwoPage';
import SignUpPageData from '../Test-data/SignUpPageData';

test('Step one UI verification check', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    //Go to QA environment.
    await page.goto('https://platform-qa.mytomorrows.com/');
    //Go to sign up screen.
    await signUpPage.createAccountButton1().click();
    //Check that "I am heath professional" option is selected as default. 
    await expect(signUpPage.healthProfessionalCheckBox()).toBeChecked();
    await signUpPage.createAccountButton2().click();

    //Check all expected elements in sign up screen are present.
    await expect(signUpPage.stepIndicator()).toHaveText(' Step 1 of 3 ');
    await expect(signUpPage.stepTitle()).toHaveText('Enter your details');

    await expect(signUpPage.emailadresInputTitle()).toHaveText(' Email address *');
    await expect(signUpPage.emailadresInputBox()).toBeVisible();
    await expect(signUpPage.confirmEmailInputTitle()).toHaveText(' Confirm email *');
    await expect(signUpPage.confirmEmailInputBox()).toBeVisible();

    await expect(signUpPage.firstNameInputTitle()).toHaveText(' First name *');
    await expect(signUpPage.firstNameInputBox()).toBeVisible();
    await expect(signUpPage.lastNameInputTitle()).toHaveText(' Last name *');
    await expect(signUpPage.lastNameInputBox()).toBeVisible();

    await expect(signUpPage.subscriptionTickBoxDescrpition()).toHaveText('I agree to receiving communications from myTomorrows about new developments or services that may be of interest to me.');
    await expect(signUpPage.subscriptionTickBox()).toBeVisible();
    await expect(signUpPage.termsAndPolicyTickBoxDescription()).toHaveText('By ticking this box, I consent to the processing of my personal data for the purposes of getting in touch with myTomorrows and create a profile on myTomorrows\' platform. I confirm that I have read and agree to myTomorrows\' terms of use and privacy policy. *');
    await expect(signUpPage.termsAndPolicyTickBox()).toBeVisible();
    await expect(signUpPage.termsOfUseLink()).toHaveAttribute('href', 'https://mytomorrows.com/en/terms-and-conditions');
    await expect(signUpPage.privacyPolicyLink()).toHaveAttribute('href', 'https://mytomorrows.com/en/privacy-statement');

    await expect(signUpPage.backButton()).toHaveText('Back');
    await expect(signUpPage.NextButton()).toHaveText(' Next: verification ');
    await expect(signUpPage.NextButton()).toBeDisabled();

    await expect(signUpPage.alreadyHasAccountText()).toHaveText('Already have an account? Log in here');
    await expect(signUpPage.logInHereLink()).toBeVisible();
    await expect(signUpPage.logInHereLink()).toHaveAttribute('href', '/login');

    //visual validation with screenshot
    await expect(page).toHaveScreenshot();
}
);

test('Input fields validation check', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const signUpPageData = new SignUpPageData(page);
    // Go to sign up screen
    await signUpPage.goToSignUpPage();

    //Empty fields validation
    await signUpPage.emailadresInputBox().click();
    await signUpPage.confirmEmailInputBox().click();
    await signUpPage.firstNameInputBox().click();
    await signUpPage.lastNameInputBox().click();
    await signUpPage.emailadresInputBox().click();
    await expect(signUpPage.fieldIsRequiredValidation()).toHaveCount(4);

    //Invalid email address validation
    for (const item of signUpPageData.invalidEmailAdress){
        await signUpPage.emailadresInputBox().click();
        await signUpPage.emailadresInputBox().fill(item);
        await expect(signUpPage.invalidEmailValidation()).toHaveCount(1);
        await signUpPage.emailadresInputBox().clear();
    }

    //confirm email field do not match validation
    await signUpPage.emailadresInputBox().fill('test@gmail.com');
    await signUpPage.confirmEmailInputBox().fill('test1@gmail.com');
    await expect(signUpPage.fieldDoesNotMatchValidation()).toHaveCount(1);

    //First name and last name only letters validation
    for (const firstName in signUpPageData.invalidFirstName){
        await signUpPage.firstNameInputBox().click();
        await signUpPage.firstNameInputBox().fill(firstName);
        await expect(signUpPage.invalidFirstNameValidation()).toHaveCount(1);
        await signUpPage.firstNameInputBox().clear();
    };
    for (const lastName in signUpPageData.invalidLastName){
        await signUpPage.lastNameInputBox().click();
        await signUpPage.lastNameInputBox().fill(lastName);
        await expect(signUpPage.invalidLastNameValidation()).toHaveCount(1);
        await signUpPage.lastNameInputBox().clear();
    };
});

test('Next button enable validation', async ({page}) => {
    const signUpPage = new SignUpPage(page);
    const signUpPageData = new SignUpPageData(page);

    // Go to sign up screen
    await signUpPage.goToSignUpPage();

    //Check the next is disabled, when mandatory fields are not fully filled
    await signUpPage.fillInStepOne('test@test.com', '', 'tester', 'test', true, true)
    await expect(signUpPage.NextButton()).toBeDisabled();
    await signUpPage.clearStepOne();

    await signUpPage.fillInStepOne('test@test.com', 'test@test.com', '', 'test', true, true)
    await expect(signUpPage.NextButton()).toBeDisabled();
    await signUpPage.clearStepOne();

    await signUpPage.fillInStepOne('test@test.com', 'test@test.com', 'tester', 'test', false, true)
    await expect(signUpPage.NextButton()).toBeDisabled();
    await signUpPage.clearStepOne();

    //Check the next button is enabled, when the subsription tick box is unchecked
    await signUpPage.fillInStepOne('test@test.com', 'test@test.com', 'tester', 'test', true, false)
    await expect(signUpPage.NextButton()).toBeEnabled();
    await signUpPage.clearStepOne();
});

test('Reset form after going back', async ({page}) => {
    const signUpPage = new SignUpPage(page);
    const signUpPageData = new SignUpPageData(page);

    // Go to sign up screen and fill the form
    await signUpPage.goToSignUpPage();
    await signUpPage.fillInStepOne('test@test.com', 'test@test.com', 'tester', 'test', true, true)

    //Go back to previous screen and come back again
    await signUpPage.backButton().click();
    await signUpPage.createAccountButton2().click();

    //Check the form is reset
    await expect(signUpPage.emailadresInputBox()).toBeEmpty();
    await expect(signUpPage.confirmEmailInputBox()).toBeEmpty();
    await expect(signUpPage.firstNameInputBox()).toBeEmpty();
    await expect(signUpPage.lastNameInputBox()).toBeEmpty();
    await expect(signUpPage.termsAndPolicyTickBox()).not.toBeChecked();
    await expect(signUpPage.subscriptionTickBox()).not.toBeChecked();
});

test('TODO: Existed email validation', async ({page}) => {
    const signUpPage = new SignUpPage(page);
    const signUpPageData = new SignUpPageData(page);

    // Go to sign up screen and fill the form
    await signUpPage.goToSignUpPage();
    await signUpPage.fillInStepOne('test@test.com', 'test@test.com', 'tester', 'test', true, true);
    await signUpPage.NextButton().click();
    
    //TO DO
});

test('Step two UI verification check', async ({page}) => {
    const signUpPage = new SignUpPage(page);
    const signUpPageData = new SignUpPageData(page);
    const signUpStepTwoPage = new SignUpStepTwoPage(page);

    // Go to sign up screen and fill the form
    await signUpPage.goToSignUpPage();
    await signUpPage.fillInStepOne('ramexe4467@jadsys.com', 'ramexe4467@jadsys.com', 'tester', 'test', true, true)
    await signUpPage.NextButton().click();

    //Check the page navigate to step two and the UI is present
    await expect(signUpStepTwoPage.stepIndicator()).toBeVisible();
    await expect(signUpStepTwoPage.verificationImage()).toBeVisible();
    await expect(signUpStepTwoPage.steptitle()).toBeVisible();
    await expect(signUpStepTwoPage.verificationLinkText()).toBeVisible();
    await expect(signUpStepTwoPage.resendEmailText()).toBeVisible();
    await expect(signUpStepTwoPage.alreadyHasAccountText()).toBeVisible();
    await expect(signUpStepTwoPage.logInHereLink()).toBeVisible();

    await expect(signUpStepTwoPage.logInHereLink()).toHaveAttribute('href', '/login');

    //Visual validation with screenshot
    await expect(page).toHaveScreenshot();
});