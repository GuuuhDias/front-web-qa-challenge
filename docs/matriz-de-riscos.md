# Matriz de Riscos e Priorização — Front Web QA Challenge

Este documento apresenta a análise de riscos realizada para a plataforma **PlayLab**, detalhando os riscos funcionais, técnicos, de experiência do utilizador (UX) e de acessibilidade identificados, bem como os critérios de priorização que fundamentaram a escolha dos cenários automatizados.

---

## 1. Categorias de Riscos Analisados

### 1.1 Riscos Funcionais
* **Falha no fluxo de dados de utilizadores:** Erros críticos ao criar, editar, pesquisar ou excluir registos na tabela principal, comprometendo a integridade operacional da aplicação administrativa.
* **Validação incorreta de formulários:** Ausência de bloqueios em campos obrigatórios ou submissão de dados inválidos (como e-mails incorretos ou senhas fora do limite de caracteres).

### 1.2 Riscos Técnicos
* **Instabilidade por sincronização assíncrona (*Flakiness*):** Falhas na automação devido a elementos dinâmicos, componentes com atraso (*Delayed Loading*) ou dependência de esperas fixas (`waitForTimeout`).
* **Acoplamento excessivo de seletores:** Fragilidade dos testes frente a alterações visuais ou de layout na interface (mitigada pelo uso de `data-testid`).

### 1.3 Riscos de Experiência do Utilizador (UX)
* **Quebra de layout em dispositivos móveis:** Elementos sobrepostos, falta de adaptação visual ou scroll horizontal indevido em resoluções de ecossistemas mobile.

### 1.4 Riscos de Acessibilidade (A11Y)
* **Barreiras para tecnologias assistivas:** Incapacidade de navegar pelos controlos principais através do teclado (foco) ou ausência de nomes acessíveis e atributos adequados.

---

## 2. Critérios de Priorização

A priorização dos cenários seguiu uma matriz de impacto e esforço, alinhada aos riscos de negócio:

* **P0 (Crítico):** Blocos funcionais essenciais cuja falha impede o uso básico do sistema (ex: listagem de utilizadores, formulários de criação e persistência de dados).
* **P1 (Alto / Médio):** Validações secundárias, cenários negativos, responsividade e comportamento de elementos dinâmicos.
* **P2 (Baixo / Desejável):** Validações complementares, como acessibilidade básica e navegação por teclado.

---

## 3. Matriz de Riscos e Decisão de Automação

| ID | Jornada | Cenário | Risco protegido | Impacto | Prioridade | Automatizar? | Justificativa |
|---|---|---|---|---|---|---|---|
| **EX-01** | Gestão de Utilizadores | Validar o carregamento da tabela e busca de registos | Falha crítica no carregamento de dados principais | Alto | **P0** | **Sim** | Garante que a jornada principal do sistema está operacional logo no início (*smoke test*). |
| **EX-02** | Formulários | Submeter formulário de novo utilizador com dados válidos | Corrupção ou bloqueio no registo de novos utilizadores | Alto | **P0** | **Sim** | Fluxo crítico de negócio que valida a persistência e regras de preenchimento obrigatório. |
| **EX-03** | Cenários Negativos | Tentar submeter formulário sem campos obrigatórios / senha inválida | Entrada de dados inconsistentes no sistema | Médio | **P1** | **Sim** | Assegura que o sistema valida corretamente as restrições antes de processar as requisições. |
| **EX-04** | Gestão de Utilizadores | Editar registo de um utilizador existente | Inconsistência de dados cadastrais após atualização | Alto | **P0** | **Sim** | Valida a capacidade de alteração e reflexão correta dos dados na tabela principal. |
| **EX-05** | Gestão de Utilizadores | Excluir utilizador da tabela | Falha na remoção de registos obsoletos | Alto | **P0** | **Sim** | Garante a integridade e limpeza do conjunto de dados exibidos. |
| **EX-06** | Responsividade | Executar jornada crítica em resolução mobile (Pixel 5) | Quebra de usabilidade e sobreposição em ecrãs reduzidos | Médio | **P1** | **Sim** | Assegura que utilizadores em dispositivos móveis conseguem aceder às principais ações. |
| **EX-07** | Elementos Dinâmicos | Validar carregamento assíncrono e controlos de visibilidade | Falsos positivos por sincronização incorreta (*flakiness*) | Médio | **P1** | **Sim** | Comprova a resiliência do framework frente a alterações dinâmicas do DOM. |
| **EX-08** | Acessibilidade | Validar navegação por foco via teclado e visibilidade de controlos | Exclusão de utilizadores com necessidades especiais / leitores de tela | Baixo | **P2** | **Sim** | Cumpre o requisito obrigatório de acessibilidade focando em controlos sob nosso controlo. |
| **EX-09** | Upload de Arquivos | Realizar upload de ficheiro com extensão não permitida | Falha de segurança ou processamento de ficheiros inválidos | Baixo | **P2** | **Não** | Menor prioridade frente aos riscos críticos de negócio; o escopo foi focado em 8 testes essenciais. |