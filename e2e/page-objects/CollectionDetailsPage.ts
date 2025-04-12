// CollectionDetailsPage.ts
import { expect, Locator, Page } from "@playwright/test";

export class CollectionDetailsPage {
    readonly page: Page;
    readonly addnewItemButton: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly dateInput: Locator;
    readonly saveItemButton: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly okButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addnewItemButton = page.locator("text=Add New Item");
        this.titleInput = page.locator("input[placeholder=\"Title\"]");
        this.descriptionInput = page.locator("input[placeholder=\"Description\"]");
        this.dateInput = page.locator("input[placeholder=\"dd.mm.rrrr\"]");
        this.saveItemButton = page.locator("text=Save Item");
        this.editButton = page.locator("text=Edit");
        this.deleteButton = page.locator("text=Delete");
        this.okButton = page.locator("text=OK");
        this.closeButton = page.locator('[aria-label="Close"]');
    }

    async goto() {
        await this.page.goto("/collectionDetails");
    }

    async addItem(title: string, description: string, date: string) {
        await this.addnewItemButton.click();
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.dateInput.fill(date);
        await this.saveItemButton.click();
    }

    async editItem() {
        await this.editButton.click();
    }

    async deleteItem() {
        await this.deleteButton.click();
        await this.okButton.click();
    }

    async closeBanner() {
        await this.closeButton.click();
    }
}
