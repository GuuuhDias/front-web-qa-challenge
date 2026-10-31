import { test, expect } from '@playwright/test';
import { UsersPage } from '../../src/pages/UsersPage.js';

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
    const successMessage = page.getByTestId('form-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Registration successful! Welcome aboard.');
});

test('CT-03: Validação de Campos Obrigatórios e Termos @negativo @regressao', async ({ page }) => {
    // Tenta submeter o formulário sem preencher os dados ou aceitar os termos
    await usersPage.clickAddUser();

    // Valida que a mensagem de erro obrigatória dos termos aparece corretamente
    await expect(page.getByText('You must accept the terms')).toBeVisible();
});

// Cenários parametrizados para validação de senhas inválidas
const invalidPasswords = [
    { descricao: 'senha com 3 dígitos', valor: '123' },
    { descricao: 'senha com 6 dígitos', valor: '123456' },
    { descricao: 'senha com 7 dígitos', valor: '1234567' }
];

for (const pass of invalidPasswords) {
    test(`CT-03.X: Validar erro de senha (${pass.descricao}) @negativo @regressao`, async ({ page }) => {
        // Preenche dados incluindo a senha usando os locators do Page Object
        await usersPage.nameInput.fill('QA Teste');
        await usersPage.emailInput.fill('teste@qa.com');
        await usersPage.passwordInput.fill(pass.valor);
        await usersPage.termsCheckbox.check();

        await usersPage.clickAddUser();

        // Valida a exibição do erro de senha de forma robusta
        const errorPassword = page.getByTestId('error-password');
        await expect(errorPassword).toBeVisible();
        await expect(errorPassword).toHaveText('Password must be at least 8 characters');
    });
}

test('CT-04: Edição de Usuário Existente @p0 @regressao @critico', async ({ page }) => {
    // Clica no botão de edição do primeiro usuário da tabela
    await usersPage.clickEditFirstUser();

    // Altera os dados cadastrais no modal de edição
    await usersPage.fillEditUser('Alice Johnson Atualizada', 'alice.atualizada@example.com');
    await usersPage.clickConfirmEdit();

    // Valida se os dados atualizados refletem corretamente na tabela principal
    await expect(page.getByText('Alice Johnson Atualizada')).toBeVisible();
    await expect(page.getByText('alice.atualizada@example.com')).toBeVisible();
});

test('CT-05: Exclusão de Usuário @p0 @regressao @critico', async ({ page }) => {
    // Realiza a exclusão do primeiro registro da tabela
    await usersPage.clickDeleteFirstUser();

    // Valida que o registro excluído deixa de ser exibido na listagem principal
    await expect(page.getByText('Alice Johnson Atualizada')).not.toBeVisible();
});

test('CT-07: Validação de Conteúdo Dinâmico e Estados Assíncronos @regressao @resiliencia', async ({ page }) => {
    // 1. Testa o carregamento com atraso (Delayed Loading)
    await usersPage.loadContentButton.click();
    await expect(usersPage.delayedContentBox).toBeVisible();

    // 2. Testa o controlo de ocultação utilizando o elemento do Page Object
    await usersPage.hideElementButton.click();
    await expect(usersPage.visibleElement).not.toBeVisible();
});

test('CT-08: Validação de Acessibilidade e Foco por Teclado @acessibilidade @regressao', async ({ page }) => {
    // 1. Valida que o botão principal de registo está visível e acessível
    await expect(usersPage.addUserButton).toBeVisible();

    // 2. Valida a navegação por teclado (foco) no botão principal
    await usersPage.addUserButton.focus();
    await expect(usersPage.addUserButton).toBeFocused();

    // 3. Valida que os campos de formulário essenciais estão presentes para leitores de tela
    await expect(usersPage.nameInput).toBeVisible();
    await expect(usersPage.emailInput).toBeVisible();
});

test('CT-09: [DEMO] Validação intencional de falha para evidências de CI @falha', async ({ page }) => {
    await page.goto('/');

    // Tentativa proposital de encontrar um elemento inexistente para forçar a falha
    const elementoInexistente = page.locator('[data-testid="usuario-fantasma-inexistente"]');

    await expect(elementoInexistente).toBeVisible({ timeout: 3 });
});