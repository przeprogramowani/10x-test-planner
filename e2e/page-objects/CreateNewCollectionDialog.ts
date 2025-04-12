// CreateNewCollectionDialog.ts
import { expect, Locator, Page } from "@playwright/test";

export class CreateNewCollectionDialog {
    readonly page: Page;
    readonly collectionNameInput: Locator;
    readonly schemaFieldNameInput: Locator;
    readonly addFieldButton: Locator;
    readonly createCollectionButton: Locator;
    readonly textShortOption: Locator;
    readonly textLongOption: Locator;
    readonly numberOption: Locator;
    readonly dateOption: Locator;
    readonly mediaImageOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.collectionNameInput = page.locator("input[placeholder=\"Collection Name\"]");
        this.schemaFieldNameInput = page.locator("input[placeholder=\"Field Name\"]");
        this.addFieldButton = page.locator("text=Add Field");
        this.createCollectionButton = page.locator("text=Create Collection");
        this.textShortOption = page.locator("text=\"Text (Short)\"");
        this.textLongOption = page.locator("text=\"Text (Long)\"");
        this.numberOption = page.locator("text=\"Number\"");
        this.dateOption = page.locator("text=\"Date\"");
        this.mediaImageOption = page.locator("text=\"Media (Image)\"");
    }

    async fillCollectionName(collectionName: string) {
        await this.collectionNameInput.fill(collectionName);
    }

    async addSchemaField(fieldName: string, fieldType: string) {
        await this.schemaFieldNameInput.fill(fieldName);

        switch (fieldType) {
            case "Text (Short)":
                await this.textShortOption.click();
                break;
            case "Text (Long)":
                await this.textLongOption.click();
                break;
            case "Number":
                await this.numberOption.click();
                break;
            case "Date":
                await this.dateOption.click();
                break;
            case "Media (Image)":
                await this.mediaImageOption.click();
                break;
            default:
                throw new Error(`Invalid field type: ${fieldType}`);
        }

        // await this.addFieldButton.click();
    }

    async createCollection() {
        await this.createCollectionButton.click();
    }
}
