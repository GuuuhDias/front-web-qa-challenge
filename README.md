# Front Web QA Challenge

Suíte de automação Front Web desenvolvida com **Playwright** e **TypeScript** para atender aos requisitos do desafio técnico de engenharia de qualidade. O projeto foca em arquitetura modular avançada utilizando o padrão **Page Object Model (POM)**, **Custom Fixtures** para injeção limpa de dependência, cobertura de fluxos críticos de usuários, formulários, componentes dinâmicos, responsividade mobile e validações de acessibilidade. Conta com execução multiplataforma, integração contínua interativa via GitHub Actions, relatórios detalhados em HTML e **Allure Report**, além de captura automática de evidências.

---

## 🚀 Tecnologias Utilizadas

* **Playwright** (Test Runner, Automação Web e Custom Fixtures)
* **TypeScript** (Linguagem de programação)
* **Node.js** (Ambiente de execução - `>=18.0.0`)
* **Allure Report** (Relatórios gerenciais avançados)
* **GitHub Actions** (Pipeline de CI/CD com disparos parametrizados)

---

## 📂 Arquitetura do Projeto

A estrutura segue rigorosamente o modelo sugerido no desafio, organizando responsabilidades em camadas desacopladas:

```text
front-web-qa-challenge/
├── .github/
│   └── workflows/
│       └── tests.yml
├── docs/
│   ├── estrategia-de-testes.md
│   ├── matriz-de-riscos.md
│   └── matriz-de-cenarios.md
├── src/
│   ├── fixtures/
│       └── baseFixtures.ts    # Configuração de Custom Fixtures do Playwright
│   ├── pages/
│       └── UsersPage.ts       # Mapeamento e ações de página (POM)
│   ├── data/
│       └── usersData.ts       # Massa de dados centralizada e parametrizada
│   └── utils/
├── tests/
│   ├── users/
│       └── users.spec.ts      # Casos de teste automatizados injetados via fixtures
├── test-assets/
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

---

## 📋 Escopo Implementado (Matriz de Testes)

A suíte cobre **9 casos de teste** rigorosamente selecionados com base em risco, valor de negócio e validações de engenharia de qualidade e CI:

| ID | Jornada / Categoria | Descrição | Prioridade | Status |
| --- | --- | --- | --- | --- |
| **CT-01** | Gestão de Usuários | Validar carregamento da tabela e pesquisa com sucesso | **P0** | Implementado |
| **CT-02** | Formulários | Criação de novo usuário com dados válidos e senha obrigatória | **P0** | Implementado |
| **CT-03** | Cenários Negativos | Validação de campos obrigatórios, termos e restrições de tamanho de senha | **P1** | Implementado |
| **CT-04** | Edição de Registros | Edição de usuário existente e reflexão correta na tabela principal | **P0** | Implementado |
| **CT-05** | Exclusão de Registos | Remoção de usuário e validação da ausência do registro na listagem | **P0** | Implementado |
| **CT-06** | Responsividade Mobile | Execução da suíte em resolução emulada (Pixel 5) via projeto Playwright | **P1** | Implementado |
| **CT-07** | Elementos Dinâmicos | Validação de carregamento assíncrono (*Delayed Loading*) e controles de visibilidade | **P1** | Implementado |
| **CT-08** | Acessibilidade (A11Y) | Validação de nomes acessíveis, atributos ARIA e foco por teclado | **P2** | Implementado |
| **CT-09** | Validação de Pipeline | Cenário intencional de falha (`@falha`) para evidências de CI, relatórios e traces | **P2** | Implementado |

---

## ♿ Estratégia, Análise e Limitações de Acessibilidade (A11Y)

Para atender ao requisito de acessibilidade do desafio (**CT-08**), optou-se por implementar uma validação focada em:

* **Navegação por Teclado e Foco:** Garantir que os controles principais e botões de ação recebem foco corretamente e são totalmente interativos sem o uso de mouse.
* **Nomes Acessíveis e Visibilidade:** Validar a presença e a legibilidade visual dos elementos essenciais para usuários de tecnologias assistivas.

### Investigação Técnica e Decisão Arquitetural

Durante a fase de investigações, tentou-se integrar uma auditoria automatizada completa utilizando o `@axe-core/playwright`. No entanto, constatou-se que a aplicação-alvo (`PlayLab`) apresenta múltiplos desvios estruturais em relação às diretrizes WCAG (como problemas de contraste de cores e ausência de atributos ARIA em componentes específicos).

**Decisão Técnica:**
Optou-se por não bloquear a pipeline de integração contínua com falhas originadas por restrições do ambiente de treino. Em alternativa:

1. O **CT-08** foi direcionado para validações funcionais de acessibilidade sob o nosso controle (foco por teclado e visibilidade).
2. As demais conformidades foram tratadas como limitações conhecidas do ecossistema, reforçando que auditorias profundas exigem correção no código-fonte da aplicação e validação assistida.

### Limitações Conhecidas

A validação automatizada cobre uma camada essencial de experiência de navegação, mas **não substitui**:

1. Análises estritas de **contraste de cores** (diretrizes WCAG AA/AAA).
2. Validação avançada de **semântica ARIA** em componentes altamente dinâmicos.
3. Testes exploratórios com **leitores de tela reais** (NVDA, VoiceOver, JAWS).

---

## 🧪 Cenário de Demonstração de Falha (Evidências de CI)

O projeto conta com um cenário proposital de demonstração de falha (`CT-09` com a tag `@falha`) criado especificamente para validar o comportamento da suíte e do pipeline de CI em caso de erros:
* **Objetivo:** Forçar uma falha controlada para comprovar que o relatório HTML, as capturas de tela (*screenshots*), os vídeos e os rastreamentos (*traces*) são anexados e salvos corretamente pelo Playwright e pelo GitHub Actions.

---

## ⚙️ Pré-requisitos e Instalação

Certifique-resulte de ter instalado em sua máquina:

* **Node.js** (versão 18 ou superior recomendada - validada via `"engines"`)
* **npm**

### Passo a passo para configurar o projeto:

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/front-web-qa-challenge.git
cd front-web-qa-challenge
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Instale os binários dos navegadores do Playwright:
```bash
npx playwright install
```

---

## 🚀 Instruções de Execução

Você pode executar os testes de forma rápida e prática utilizando os atalhos configurados no `package.json`:

* **Executar todos os testes funcionais (ignorando o teste de falha proposital):**
  ```bash
  npm run test:functional
  ```

* **Executar os testes em modo visual (headed):**
  ```bash
  npm run test:headed
  ```

* **Executar apenas os testes de regressão:**
  ```bash
  npm run test:regression
  ```

* **Executar apenas os testes Smoke:**
  ```bash
  npm run test:smoke
  ```

* **Executar exclusivamente o teste de demonstração de falha (CT-09):**
  ```bash
  npm run test:failure-demo
  ```

---

## 🌐 Execução na Pipeline (GitHub Actions)

A pipeline automatizada (`.github/workflows/tests.yml`) executa a cada `push` ou `pull_request` utilizando **3 workers em paralelo** para otimizar o tempo de execução. 

Ela também conta com suporte a **Disparo Manual (`workflow_dispatch`)**, permitindo selecionar diretamente pelo painel do GitHub o modo de execução desejado:
* **`normal`**: Executa todos os testes da suíte.
* **`sem-falha`**: Executa a suíte padrão ignorando o teste intencional de falha (`--grep-invert "@falha"`).
* **`apenas-falha`**: Executa exclusivamente o cenário de demonstração de falha (`--grep "@falha"`) para validação rápida de artefatos e relatórios.

---

## 📊 Relatórios e Evidências

O projeto está configurado para gerar relatórios detalhados após cada execução, oferecendo duas opções robustas de visualização:

* **Relatório Padrão HTML do Playwright:**
  Para abrir o relatório interativo nativo:
  ```bash
  npx playwright show-report
  ```

* **Relatório Avançado com Allure Report (Destaque):**
  O projeto conta com integração ao Allure para um painel gerencial rico em gráficos, métricas e histórico de execução. Você pode gerar e abrir com um único comando:
  ```bash
  npm run report:ci
  ```
  *(Ou separadamente via `npm run allure:generate` e `npm run allure:open`).*

* **Evidências em caso de falha:**
  O framework captura automaticamente **Screenshots**, **Traces** e **Vídeos** apenas quando um teste falha (`retain-on-failure`), otimizando o armazenamento e facilitando o diagnóstico local e na pipeline.

---

## 🤖 Uso de Inteligência Artificial

Este projeto contou com o apoio de Inteligência Artificial como assistente de colaboração técnica para:
* Estruturação inicial da arquitetura modular baseada em POM e Custom Fixtures.
* Refinamento dos seletores baseados em `data-testid`.
* Discussão de decisões arquiteturais relativas ao tratamento de componentes dinâmicos e à estratégia de acessibilidade com o Axe-Core.

Todo o código gerado foi rigorosamente revisado, testado, validado e integrado manualmente pelo autor, mantendo total responsabilidade técnica pela solução final entregue.