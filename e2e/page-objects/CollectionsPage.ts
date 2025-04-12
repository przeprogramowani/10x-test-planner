// CollectionsPage.ts
import { expect, Locator, Page } from "@playwright/test";

export class CollectionsPage {
    readonly page: Page;
    readonly createNewCollectionButton: Locator;
    readonly collectionNameInput: Locator;
    readonly addFieldButton: Locator;
    readonly createCollectionButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createNewCollectionButton = page.locator("text=Create New Collection");
        this.collectionNameInput = page.locator("input[placeholder=\"Collection Name\"]");
        this.addFieldButton = page.locator("text=Add Field");
        this.createCollectionButton = page.locator("text=Create Collection");
    }

    async goto() {
        await this.page.goto("/collections");
    }

    async createCollection(collectionName: string) {
        await this.createNewCollectionButton.click();
        await this.collectionNameInput.fill(collectionName);
        await this.createCollectionButton.click();
    }
}
