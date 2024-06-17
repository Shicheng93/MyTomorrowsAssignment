import { Page, expect } from "@playwright/test";
export default class SignUpStepTwoPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    stepIndicator = () => this.page.getByText('Step 2 of 3');
    verificationImage = () => this.page.getByRole('main').getByRole('img');

    steptitle = () => this.page.getByRole('heading', { name: 'Verify your email address' });
    verificationLinkText = () => this.page.getByText('We\'ve sent you an email with a verification link.Please follow the link to continue.');
    resendEmailText = () => this.page.getByText('Didn\'t receive an email? Please check your spam folder, or click here to resend the verification email.');

    alreadyHasAccountText = () => this.page.getByText('Already have an account? Log');
    logInHereLink = () => this.page.getByRole('link', { name: 'Log in here' });
}