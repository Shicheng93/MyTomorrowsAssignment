import { Page, expect } from "@playwright/test";
export default class SignUpStepOnePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    createAccountButton1 = () => this.page.getByText('Create account');
    createAccountButton2 = () => this.page.getByRole('button', { name: 'Create account' });
    healthProfessionalCheckBox = () => this.page.getByLabel('local_hospitalI am a')

    stepIndicator = () => this.page.getByText('Step 1 of');
    stepTitle = () => this.page.getByText('Enter your details');

    emailadresInputTitle = () => this.page.getByText('Email address *');
    confirmEmailInputTitle = () => this.page.getByText('Confirm email *');
    firstNameInputTitle = () => this.page.getByText('First name *');
    lastNameInputTitle = () => this.page.getByText('Last name *');

    emailadresInputBox = () => this.page.getByPlaceholder('yourname@hospital.com').nth(0);
    confirmEmailInputBox = () => this.page.getByPlaceholder('yourname@hospital.com').nth(1);
    firstNameInputBox = () => this.page.getByPlaceholder('First name');
    lastNameInputBox = () => this.page.getByPlaceholder('Last name');

    termsAndPolicyTickBox = () => this.page.getByLabel('By ticking this box, I');
    subscriptionTickBox = () => this.page.getByLabel('I agree to receiving');

    termsAndPolicyTickBoxDescription = () => this.page.getByText('By ticking this box, I');
    subscriptionTickBoxDescrpition = () => this.page.getByText('I agree to receiving');
    termsOfUseLink = () => this.page.getByRole('link', { name: 'terms of use' });
    privacyPolicyLink = () => this.page.getByRole('link', { name: 'privacy policy', exact: true });

    backButton = () => this.page.getByRole('button', { name: 'Back' });
    NextButton = () => this.page.locator('button').filter({ hasText: 'Next: verification' });

    alreadyHasAccountText = () => this.page.getByText('Already have an account? Log');
    logInHereLink = () => this.page.getByRole('link', { name: 'Log in here' });

    fieldIsRequiredValidation = () => this.page.getByText('Field is required');
    invalidEmailValidation = () => this.page.getByText('Email is in an invalid format');
    fieldDoesNotMatchValidation = () => this.page.getByText('Fields do not match');
    invalidFirstNameValidation = () => this.page.getByText('Please enter your first name with letters');
    invalidLastNameValidation = () => this.page.getByText('Please enter your Last name with letters');

    nonexistentEmailNotification = () => this.page.getByText('Something went wrong. Please');
    
    async goToSignUpPage() {
        await this.page.goto('https://platform-qa.mytomorrows.com/');

        await this.page.getByText('Create account').click();
        await this.page.getByRole('button', { name: 'Create account' }).click();
    }

    async fillInStepOne( email:string, confirmEmail:string, firtName:string, lastName:string, termsAndPolicyCheck = false, subscriptionCheck = false) {
        if (email != ''){
            await this.emailadresInputBox().fill(email);
        }
        if (confirmEmail != ''){
            await this.confirmEmailInputBox().fill(confirmEmail);
        }
        if (firtName != ''){
            await this.firstNameInputBox().fill(firtName);
        }
        if (lastName != ''){
            await this.lastNameInputBox().fill(lastName);
        }
        if (termsAndPolicyCheck != false){
            await this.termsAndPolicyTickBox().check();
        }
        if (subscriptionCheck != false){
            await this.subscriptionTickBox().check();
        }
    }

    async clearStepOne(){
        await this.emailadresInputBox().clear();
        await this.confirmEmailInputBox().clear();
        await this.firstNameInputBox().clear();
        await this.lastNameInputBox().clear();
        if (await this.termsAndPolicyTickBox().isChecked() == true){
            await this.termsAndPolicyTickBox().uncheck();
        }
        if (await this.subscriptionTickBox().isChecked() == true){
            await this.subscriptionTickBox().uncheck();
        }
    }
}