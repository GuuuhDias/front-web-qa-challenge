import { test, expect } from '@playwright/test';
import { UsersPage } from '../../pages/UsersPage.js';

let usersPage: UsersPage;

test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
    await usersPage.goto();
});

test('CT-01: Deve carregar a tabela de utilizadores e permitir busca com sucesso @smoke @regressao', async ({ page }) => {
    await expect(usersPage.userTable).toBeVisible();
    await usersPage.searchUser('QA Engineer');
});

test('CT-02: Criação de Novo Utilizador com Sucesso @p0 @regressao @critico', async ({ page }) => {
    // Preenche dados válidos incluindo a senha obrigatória
    await usersPage.fillNewUser('QA Professional', 'qa.pro@test.com', 'SenhaForte123');
    await usersPage.clickAddUser();

    // Valida a mensagem de sucesso com o data-testid dedicado
    await expect(page.getByTestId('form-success')).toBeVisible();
    await expect(page.getByTestId('form-success')).toHaveText('Registration successful! Welcome aboard.');
});

test('CT-03: Validação de Campos Obrigatórios e Termos @negativo @regressao', async ({ page }) => {
    // Tenta submeter o formulário sem preencher os dados ou aceitar os termos
    await usersPage.clickAddUser();

    // Valida que a mensagem de erro obrigatória dos termos aparece corretamente
    await expect(page.getByText('You must accept the terms')).toBeVisible();
});

test('CT-03.1: Validar erro de senha com menos de 8 caracteres @negativo @regressao', async ({ page }) => {
    // Preenche os dados com uma senha inválida (menos de 8 caracteres)
    await usersPage.nameInput.fill('QA Teste');
    await usersPage.emailInput.fill('teste@qa.com');
    await usersPage.passwordInput.fill('123'); // senha curta
    await usersPage.termsCheckbox.check();

    // Tenta submeter o formulário
    await usersPage.clickAddUser();

    // Valida a exibição do elemento de erro da senha de forma robusta
    await expect(page.getByTestId('error-password')).toBeVisible();
    await expect(page.getByTestId('error-password')).toHaveText('Password must be at least 8 characters');
});