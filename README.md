# Front Web QA Challenge

Suíte de automação Front Web desenvolvida com **Playwright** e **TypeScript** para atender aos requisitos do desafio técnico de engenharia de qualidade. O projeto foca em arquitetura modular baseada no padrão direto dentro de `src/`, cobertura de fluxos críticos de usuários, formulários, componentes dinâmicos, responsividade mobile e validações de acessibilidade. Conta com execução multiplataforma, integração contínua via GitHub Actions, relatórios detalhados e captura automática de evidências.

---

## 🚀 Tecnologias Utilizadas

* **Playwright** (Test Runner e Automação Web)
* **TypeScript** (Linguagem de programação)
* **Node.js** (Ambiente de execução)
* **GitHub Actions** (Pipeline de CI/CD)

---

## 📂 Arquitetura do Projeto

A estrutura segue rigorosamente o modelo sugerido no desafio para garantir baixo acoplamento e alta organização:

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
│   ├── pages/
│       └── UsersPage.ts       # Mapeamento e ações de página
│   ├── data/
│   └── utils/
├── tests/
│   ├── users/
│       └── users.spec.ts      # Casos de teste automatizados (CT-01 a CT-08)
│   ├── forms/
│   ├── dynamic/
│   ├── accessibility/
│   └── responsive/
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

A suíte cobre **8 casos de teste** rigorosamente selecionados com base em risco e valor de negócio:

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

---

## ♿ Estratégia, Análise e Limitações de Acessibilidade (A11Y)

Para atender ao requisito de acessibilidade do desafio (**CT-08**), optou-se por implementar uma validação focada em:

* **Navegação por Teclado e Foco:** Garantir que os controles principais e botões de ação recebem foco corretamente e são totalmente interativos sem o uso de mouse.
* **Nomes Acessíveis e Visibilidade:** Validar a presença e a legibilidade visual dos elementos essenciais para usuários de tecnologias assistivas.

## 🧪 Cenário de Demonstração de Falha (Evidências de CI)

O projeto conta com um cenário proposital de demonstração de falha (`CT-09` com a tag `@falha`) criado especificamente para validar o comportamento da suíte e do pipeline de CI em caso de erros:
* **Objetivo:** Forçar uma falha controlada para comprovar que o relatório HTML, as capturas de tela (*screenshots*), os vídeos e os rastreamentos (*traces*) são anexados e salvos corretamente pelo Playwright e pelo GitHub Actions.


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

## ⚙️ Pré-requisitos e Instalação

Certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 18 ou superior recomendada)
* **npm**

### Passo a passo para configurar o projeto:

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/front-web-qa-challenge.git](https://github.com/seu-usuario/front-web-qa-challenge.git)
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

Você pode executar os testes de diferentes formas conforme a sua necessidade:

* **Executar todos os testes em modo headless (padrão):**
  ```bash
  npx playwright test
  ```

* **Executar os testes com interface gráfica (Playwright UI):**
  ```bash
  npx playwright test --ui
  ```

* **Executar em um navegador específico (ex: Firefox):**
  ```bash
  npx playwright test --project=firefox
  ```

* **Executar na resolução Mobile (Pixel 5 / CT-06):**
  ```bash
  npx playwright test --project=mobile-chrome
  ```

* **Executar testes filtrando por tags:**
  ```bash
  npx playwright test --grep "@regressao"
  ```

### Execução com Teste de Demonstração de Falha (Evidências de CI)

O projeto conta com um cenário proposital de demonstração de falha (`CT-09` com a tag `@falha`) criado para validar o comportamento da suíte e do relatório em caso de erros:

* **Executar a suíte padrão (ignorando o teste de falha proposital):**
  Para rodar apenas os testes funcionais normais no dia a dia:
  ```bash
  npx playwright test --grep-invert "@falha"
  ```

* **Executar exclusivamente o teste de demonstração de falha:**
  Para testar a geração de evidências e ver o relatório de falha em ação:
  ```bash
  npx playwright test --grep "@falha"
  ```
---

## 📊 Relatórios e Evidências

O projeto está configurado para gerar relatórios detalhados após cada execução:

* **Relatório HTML:**
Para abrir o relatório interativo gerado automaticamente:
```bash
npx playwright show-report

```


* **Evidências em caso de falha:**
O framework captura automaticamente **Screenshots**, **Traces** e **Vídeos** apenas quando um teste falha (`retain-on-failure`), otimizando o armazenamento e facilitando o diagnóstico na pipeline.

---

## 🤖 Uso de Inteligência Artificial

Este projeto contou com o apoio de Inteligência Artificial como assistente de colaboração técnica para:

* Estruturação inicial da arquitetura modular dentro da pasta `src/`.
* Refinamento dos seletores baseados em `data-testid`.
* Discussão de decisões arquiteturais relativas ao tratamento de componentes dinâmicos e à estratégia de acessibilidade com o Axe-Core.

Todo o código gerado foi rigorosamente revisado, testado, validado e integrado manualmente pelo autor, mantendo total responsabilidade técnica pela solução final entregue.
---