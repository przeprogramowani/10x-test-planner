// LoginPage.ts
import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("input[placeholder=\"Username to 10xCMS\"]");
        this.passwordInput = page.locator("input[placeholder=\"Password to 10xCMS\"]");
        this.loginButton = page.locator("text=Login");
    }

    async goto() {
        await this.page.goto("/login");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
