# Matriz de Cenários de Teste - Desafio Front Web QA

Este documento apresenta a matriz de cenários mapeados para a automação, estruturados por prioridade de risco, garantindo a cobertura dos fluxos críticos e de usabilidade da aplicação.

---

## Tabela de Cenários Mapeados

| ID | Cenário | Descrição Resumida | Prioridade | Tipo de Teste |
|:---|:---|:---|:---|:---|
| **CT-01** | Listagem e Paginação de Usuários | Validar se a tabela carrega os registros corretamente, permitindo navegação fluida entre as páginas e exibição correta dos dados. | **P0** | Funcional / UI |
| **CT-02** | Criação de Novo Usuário (Sucesso) | Preencher o formulário de cadastro com dados válidos e confirmar a persistência e exibição do novo registro na listagem. | **P0** | Funcional / Fluxo Crítico |
| **CT-03** | Validação de Campos Obrigatórios | Tentar submeter o formulário de cadastro em branco ou com campos incompletos e validar as mensagens de erro/feedback. | **P0** | Negativo / Validação |
| **CT-04** | Edição de Usuário Existente | Selecionar um usuário na tabela, alterar dados cadastrais e verificar se as atualizações refletem corretamente. | **P0** | Funcional |
| **CT-05** | Exclusão de Usuário | Realizar a remoção de um registro da tabela e confirmar que o mesmo deixa de ser exibido na listagem principal. | **P0** | Funcional |
| **CT-06** | Responsividade Mobile (Pixel 5) | Executar os fluxos principais de navegação e formulários em resolução emulada de smartphone, validando adaptação de layout e toque. | **P1** | Responsividade / UI |
| **CT-07** | Tratamento de Elementos Dinâmicos | Validar a resiliência da suíte frente a carregamentos assíncronos, estados de *loading* e elementos que aparecem de forma dinâmica na tela. | **P1** | Assíncrono / Resiliência |

---

## Critérios de Aceite da Suíte
* **Estabilidade:** Nenhum teste deve depender de pausas fixas (`waitForTimeout`), priorizando sempre as esperas inteligentes nativas do Playwright (`waitForSelector`, `toBeVisible`, etc.).
* **Confiabilidade de Execução:** Todos os cenários críticos (P0 e P1) devem rodar com sucesso tanto no Google Chrome quanto no Mozilla Firefox.
* **Geração de Evidências:** Em caso de falha em qualquer cenário na pipeline do GitHub Actions, o sistema deve anexar automaticamente o *trace* de execução, captura de tela e vídeo para auditoria rápida.