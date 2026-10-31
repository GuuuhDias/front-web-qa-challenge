import { test, expect } from '../../src/fixtures/baseFixtures.js';
import { USERS_DATA } from '../../src/data/usersData.js';

test('CT-01: Deve carregar a tabela de utilizadores e permitir busca com sucesso @smoke @regressao', async ({ usersPage }) => {
    await expect(usersPage.userTable).toBeVisible();
    await usersPage.searchUser('QA Engineer');
});

test('CT-02: Criação de Novo Utilizador com Sucesso @p0 @regressao @critico', async ({ page, usersPage }) => {
    await usersPage.fillNewUser(
        USERS_DATA.validUser.fullName,
        USERS_DATA.validUser.email,
        USERS_DATA.validUser.password
    );
    await usersPage.clickAddUser();

    const successMessage = page.getByTestId('form-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Registration successful! Welcome aboard.');
});

test('CT-03: Validação de Campos Obrigatórios e Termos @negativo @regressao', async ({ page, usersPage }) => {
    await usersPage.clickAddUser();
    await expect(page.getByText('You must accept the terms')).toBeVisible();
});

for (const pass of USERS_DATA.invalidPasswords) {
    test(`CT-03.X: Validar erro de senha (${pass.descricao}) @negativo @regressao`, async ({ page, usersPage }) => {
        await usersPage.nameInput.fill('QA Teste');
        await usersPage.emailInput.fill('teste@qa.com');
        await usersPage.passwordInput.fill(pass.valor);
        await usersPage.termsCheckbox.check();

        await usersPage.clickAddUser();

        const errorPassword = page.getByTestId('error-password');
        await expect(errorPassword).toBeVisible();
        await expect(errorPassword).toHaveText('Password must be at least 8 characters');
    });
}

test('CT-04: Edição de Usuário Existente @p0 @regressao @critico', async ({ page, usersPage }) => {
    await usersPage.clickEditFirstUser();
    await usersPage.fillEditUser(
        USERS_DATA.updatedUser.fullName,
        USERS_DATA.updatedUser.email
    );
    await usersPage.clickConfirmEdit();

    await expect(page.getByText(USERS_DATA.updatedUser.fullName)).toBeVisible();
    await expect(page.getByText(USERS_DATA.updatedUser.email)).toBeVisible();
});

test('CT-05: Exclusão de Usuário @p0 @regressao @critico', async ({ usersPage }) => {
    await usersPage.clickDeleteFirstUser();
    await expect(usersPage.page.getByText(USERS_DATA.updatedUser.fullName)).not.toBeVisible();
});

test('CT-07: Validação de Conteúdo Dinâmico e Estados Assíncronos @regressao @resiliencia', async ({ usersPage }) => {
    await usersPage.loadContentButton.click();
    await expect(usersPage.delayedContentBox).toBeVisible();

    await usersPage.hideElementButton.click();
    await expect(usersPage.visibleElement).not.toBeVisible();
});

test('CT-08: Validação de Acessibilidade e Foco por Teclado @acessibilidade @regressao', async ({ usersPage }) => {
    await expect(usersPage.addUserButton).toBeVisible();
    await usersPage.addUserButton.focus();
    await expect(usersPage.addUserButton).toBeFocused();

    await expect(usersPage.nameInput).toBeVisible();
    await expect(usersPage.emailInput).toBeVisible();
});

test('CT-09: [DEMO] Validação intencional de falha para evidências de CI @falha', async ({ page }) => {
    await page.goto('/');
    const elementoInexistente = page.locator('[data-testid="usuario-fantasma-inexistente"]');
    await expect(elementoInexistente).toBeVisible({ timeout: 3 });
});