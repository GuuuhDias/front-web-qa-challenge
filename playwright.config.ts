import { defineConfig, devices } from '@playwright/test';

/**
 * Leia mais sobre a configuração do Playwright em: https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Diretório onde estão os nossos testes
  testDir: './tests',

  // Tempo máximo que cada teste pode durar (30 segundos)
  timeout: 30 * 1000,

  // Tempo limite para cada asserção (expect)
  expect: {
    timeout: 5000
  },

  // Executa os testes em paralelo para maior velocidade
  fullyParallel: true,

  // Evita que testes falhados passem (1 retry local)
  retries: 1,

  // Número de workers paralelos na máquina local
  workers: undefined,

  // Configuração dos relatórios de execução (HTML e JSON para evidências)
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  // Configurações globais para todos os projetos/navegadores
  use: {
    // URL base da aplicação fornecida no desafio
    baseURL: 'https://playwrightlab.github.io/',

    // Coleta trace sempre que um teste falha (fundamental para diagnóstico)
    trace: 'retain-on-failure',

    // Captura screenshot automaticamente em caso de falha
    screenshot: 'only-on-failure',

    // Grava vídeo apenas se o teste falhar
    video: 'retain-on-failure',
  },

  // Definição dos navegadores e emuladores (Multi-browser + Mobile exigidos no desafio)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Projeto dedicado para a resolução Mobile (Atende ao requisito RSP-02)
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});