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
    readonly editFirstUserButton: Locator;
    readonly editNameInput: Locator;
    readonly editEmailInput: Locator;
    readonly confirmEditButton: Locator;
    readonly deleteFirstUserButton: Locator;
    readonly loadContentButton: Locator;
    readonly delayedContentBox: Locator;
    readonly hideElementButton: Locator;
    readonly visibleElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addUserButton = page.getByTestId('btn-register');
        this.userTable = page.getByTestId('data-table');
        this.searchInput = page.getByTestId('table-search');

        // Seletores dos campos do formulário de registo[cite: 6]
        this.nameInput = page.getByTestId('input-fullname');
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.termsCheckbox = page.getByTestId('check-terms');

        // Mapeamento dos elementos do modal de edição[cite: 6]
        this.editFirstUserButton = page.getByTestId('edit-1');
        this.editNameInput = page.getByTestId('edit-name-input');
        this.editEmailInput = page.getByTestId('edit-email-input');
        this.confirmEditButton = page.getByTestId('modal-confirm');
        this.deleteFirstUserButton = page.getByTestId('delete-1');

        // Mapeamento dos elementos dinamicos[cite: 6]
        this.loadContentButton = page.getByTestId('load-delayed-btn');
        this.delayedContentBox = page.getByTestId('loaded-data');
        this.hideElementButton = page.getByTestId('hide-btn');
        this.visibleElement = page.getByText('I\'m visible!');
    }

    async goto() {
        await this.page.goto('/');
        // Tratamento automático do banner de cookies[cite: 6]
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

    async clickEditFirstUser() {
        await this.editFirstUserButton.click();
    }

    async fillEditUser(name: string, email: string) {
        await this.editNameInput.click();
        await this.editNameInput.clear();
        await this.editNameInput.fill(name);

        await this.editEmailInput.click();
        await this.editEmailInput.clear();
        await this.editEmailInput.fill(email);
    }

    async clickConfirmEdit() {
        await this.confirmEditButton.click();
    }

    async clickDeleteFirstUser() {
        await this.deleteFirstUserButton.click();
    }
}