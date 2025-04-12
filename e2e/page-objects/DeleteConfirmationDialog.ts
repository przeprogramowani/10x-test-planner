// DeleteConfirmationDialog.ts
import { expect, Locator, Page } from "@playwright/test";

export class DeleteConfirmationDialog {
    readonly page: Page;
    readonly cancelButton: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = page.locator("text=Anuluj");
        this.okButton = page.locator("text=OK");
    }

    async confirmDelete() {
        await this.okButton.click();
    }

    async cancelDelete() {
        await this.cancelButton.click();
    }
}
