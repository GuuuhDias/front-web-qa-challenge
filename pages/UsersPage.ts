import { Page, Locator } from '@playwright/test';

export class UsersPage {
    readonly page: Page;
    readonly addUserButton: Locator;
    readonly userTable: Locator;
    readonly searchInput: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly termsCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addUserButton = page.getByTestId('btn-register');
        this.userTable = page.getByTestId('data-table');
        this.searchInput = page.getByTestId('table-search');

        // Seletores dos campos do formulário de registo
        this.nameInput = page.getByTestId('input-fullname');
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.termsCheckbox = page.getByTestId('check-terms');
    }

    async goto() {
        await this.page.goto('/');
        // Tratamento automático do banner de cookies
        const acceptButton = this.page.getByRole('button', { name: 'Accept All' });
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
    }

    async clickAddUser() {
        await this.addUserButton.click();
    }

    async searchUser(name: string) {
        await this.searchInput.fill(name);
    }

    async fillNewUser(name: string, email: string, password: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.termsCheckbox.check();
    }
}