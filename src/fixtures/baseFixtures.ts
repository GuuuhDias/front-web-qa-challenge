import { test as base } from '@playwright/test';
import { UsersPage } from '../pages/UsersPage';

type MyFixtures = {
    usersPage: UsersPage;
};

export const test = base.extend<MyFixtures>({
    usersPage: async ({ page }, use) => {
        const usersPage = new UsersPage(page);
        await usersPage.goto();
        await use(usersPage);
    },
});

export { expect } from '@playwright/test';