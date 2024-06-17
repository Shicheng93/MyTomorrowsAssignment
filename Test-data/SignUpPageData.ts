import { Page } from "@playwright/test";

export default class SignUpPageData {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    invalidEmailAdress = ['test.com','test()@gmail.com','test@te$t.com', 'te st@test.com'];
    invalidFirstName = ['Neo1', 'Ne^o', 'Ne.o', 'Ne o'];
    invalidLastName = ['Sm4t', '$mit', 'Smi%' , 'Smi-t'];
}