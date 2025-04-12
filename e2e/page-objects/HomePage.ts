// HomePage.ts
import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly addCollectionButton: Locator;
    readonly uploadMediaButton: Locator;
    readonly manageWebhooksButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCollectionButton = page.locator("text=Add Collection");
        this.uploadMediaButton = page.locator("text=Upload Media");
        this.manageWebhooksButton = page.locator("text=Manage Webhooks");
        this.logoutButton = page.locator("text=Logout");
    }

    async goto() {
        await this.page.goto("/home");
    }

    async addCollection() {
        await this.addCollectionButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}
