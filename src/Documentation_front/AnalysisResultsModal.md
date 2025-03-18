# Componente AnalysisResultsModal

## Descrição

O componente `AnalysisResultsModal` exibe os resultados da análise de IA para uma prova selecionada em um modal. Ele inclui o gráfico de progresso do aluno, um resumo do seu desempenho e uma lista de exercícios de recuperação. Ele também fornece uma seção para a colaboração entre professores, onde eles podem compartilhar ideias e recursos.

## Intenção da Tela

O objetivo desta tela é fornecer aos professores uma visão geral abrangente do desempenho de um aluno em uma determinada prova, permitindo que eles:

*   Identifiquem rapidamente as áreas em que o aluno está tendo dificuldades.
*   Acessem exercícios de recuperação personalizados para ajudar o aluno a melhorar.
*   Colaborem com outros professores para compartilhar insights e estratégias para apoiar o aluno.

## Jornada do Usuário

Para acessar esta tela, o usuário (professor) deve seguir os seguintes passos:

1.  **Acessar a página de Dashboard:** O professor deve primeiro acessar a página principal do sistema, que é o painel de controle (Dashboard).
2.  **Carregar uma prova:** No painel de controle, o professor deve localizar a seção "Quick Actions" (Ações Rápidas) e clicar no botão "Upload Exam" (Carregar Prova).
3.  **Preencher as informações da prova:** No modal de upload, o professor deve preencher as informações necessárias, como a turma, o nome do aluno, o nome da prova e selecionar o arquivo da prova.
4.  **Visualizar os resultados da análise:** Após o upload da prova, um card com as informações da prova será exibido no painel de controle. O professor deve clicar no botão "View Analysis Results" (Ver Resultados da Análise) neste card para abrir o modal `AnalysisResultsModal` e visualizar os resultados da análise.

## Componentes

O componente `AnalysisResultsModal` usa os seguintes componentes:

*   `Dialog`: Um componente de UI para exibir modais. Ele cria a estrutura básica do modal.
*   `DialogContent`: Um componente de UI para exibir o conteúdo de um modal. Ele contém todos os outros componentes dentro do modal.
*   `DialogHeader`: Um componente de UI para exibir o cabeçalho de um modal. Ele contém o título e a descrição do modal.
*   `DialogTitle`: Um componente de UI para exibir o título de um modal. Exibe o texto "AI Analysis Results".
*   `DialogDescription`: Um componente de UI para exibir a descrição de um modal. Exibe as informações da prova (turma, nome do aluno, nome da prova).
*   `StudentProgressChart`: Um componente para exibir o gráfico de progresso do aluno. Ele recebe o nome do aluno e o nome da prova como props.
*   `MockAnalysisResults`: Um componente para exibir um resumo simulado dos resultados da análise de IA. Este componente exibe dados de espaço reservado para simular os resultados da análise.
*   `RemedialExercises`: Um componente para exibir uma lista de exercícios de recuperação. Este componente exibe exercícios sugeridos com base nas áreas de fraqueza do aluno e permite que o professor gere uma prova formatada para impressão.
*   `CollaborationMockup`: Um componente para exibir um mockup da interface de colaboração entre professores. Este componente simula uma área onde os professores podem compartilhar notas e recursos.

## Geração da Prova para Impressão

O componente `RemedialExercises` gera uma prova formatada para impressão usando a função `window.print()`. Ao clicar no botão "Print Exam" (Imprimir Prova), o componente cria uma nova janela, escreve o conteúdo da prova formatada nesta janela e, em seguida, chama a função `window.print()` para exibir a caixa de diálogo de impressão. Isso permite que o professor imprima a prova para distribuí-la aos alunos.

## Estilização

O componente `AnalysisResultsModal` usa as seguintes classes CSS:

*   `max-w-[80%]`: Define a largura máxima do modal para 80% da largura da tela. Isso garante que o modal não fique muito largo em telas grandes.
*   `max-h-[80vh]`: Define a altura máxima do modal para 80% da altura da viewport. Isso garante que o modal não fique muito alto e que o conteúdo possa ser rolado se necessário.
*   `overflow-y-auto`: Adiciona rolagem vertical ao conteúdo do modal se ele exceder a altura máxima. Isso permite que os usuários vejam todo o conteúdo, mesmo que ele não caiba na tela.