# Estratégia de Testes - Desafio Front Web QA

Este documento detalha a estratégia, o escopo, a priorização de riscos e a arquitetura técnica adotada para a suíte de testes automatizados do desafio de Front Web Quality Engineering.

---

## 1. Abordagem e Priorização (Baseada em Riscos)
A suíte foi planejada priorizando os fluxos de maior impacto para o usuário final e para o negócio:
* **P0 (Crítico):** Gerenciamento de usuários (tabelas, listagens e paginação) e preenchimento de formulários complexos. Falhas nestes pontos quebram as operações centrais do sistema.
* **P1 (Alto):** Responsividade mobile e componentes dinâmicos/assíncronos (validação de estados de carregamento e concorrência de elementos).
* **P2 (Médio):** Cenários negativos de validação de campos e verificações básicas de acessibilidade.

---

## 2. Pilha Tecnológica (Tech Stack)
* **Linguagem:** TypeScript (garantindo tipagem estática, robustez e manutenibilidade do código).
* **Framework de Testes:** Playwright (escolhido pela alta performance, espera automática inteligente por elementos e excelente suporte nativo a múltiplos contextos e dispositivos).
* **Arquitetura de Testes:** Page Object Model (POM) modernizado com encapsulamento orientado a componentes.
* **Relatórios e Evidências:** HTML Reports nativos do Playwright e captura automática de rastreios (*traces*), vídeos e capturas de tela em caso de falha.
* **CI/CD:** GitHub Actions para execução automatizada a cada envio de código (*push*).

---

## 3. Justificativa da Matriz de Execução (Navegadores e Dispositivos)
A suíte está configurada para rodar em múltiplos ambientes para garantir máxima cobertura de compatibilidade:
* **Google Chrome (Chromium):** Utilizado como navegador principal para validação de fluxos e alta velocidade de execução, cobrindo a maior fatia de mercado atual.
* **Mozilla Firefox (Gecko):** Adicionado estrategicamente à matriz de testes para **diversidade de motor de renderização**. Como a maioria dos navegadores roda em Chromium, testar no Firefox assegura que a aplicação não possui dependências exclusivas de um único motor e valida a integridade do DOM e execução de scripts em um ecossistema diferente.
* **Google Pixel 5 (Emulação Mobile):** Utilizado como dispositivo de referência (*reference device*) padrão para validar a **responsividade em telas menores (P1)**. Garante que elementos de toque, tabelas e formulários se adaptem corretamente em formatos portáteis sem perda de usabilidade ou quebra de layout.