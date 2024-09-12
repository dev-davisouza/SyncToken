# SyncToken: Registre, atualize, edite e faça o CheckIn - CheckOut de pessoas reais!

**Ferramenta para lidar com o fluxo de pessoas em ambiente de atendimento** &mdash; Puro React e CSS-In-JS.

- Código aberto
- CRUD consistente (não permite duplicação de PK)
- Arquitetura simplificada
- <i>Message system</i> nativo
- styled-components (CSS-In-JS)
- Pronto para uso!

## Sumário

- [Motivação](#motivação)
- [Guia de uso](#guia-de-uso)
- [Versões](#versões)

## Motivação

Antes de mais nada, quem sou eu? Eu sou Davi Souza de Oliveira, nascido em 2006. Estudo programação desde 2022, e de lá pra cá venho evoluindo. Todavia, em virtude do curso técnico (finalizado em 2023), só pude começar a me dedicar a esta paixão verdadeiramente neste ano de 2024. Ainda este ano, comecei a trabalhar em um órgão público, o SMAS (secretaria municipal de asssistência social) da minha cidade, onde até então estou (2024-09-09).

Trabalhando lá, comecei a reparar em algumas falhas desde a recepção até o atendimento, feito na sala de atendimento do CadÚnico. Esta falha consistia em: O atendente registra a pessoa manualmente no livro, todavia, na sala de atendimento, nós não tínhamos controle da fila de atendimento, oque fazia com que alguns espertinhos furassem a fila de espera. Muitas vezes isto causou conflitos entre eles, e até mesmo eles contra nós do atendimento. De alguma forma, isso era fonte de constragimento, e colocava em risco a segurança no local de trabalho. Em virtude disto, no mês de Junho de 2024, eu comecei a escrever o código desta aplicação, e no dia 10 de Julho, foi inaugurada esta ideia no SMAS local!

A implantação foi um sucesso, e agora me dedico a tornar esta ideia ainda mais profissional, trazendo atualizações, para que esta iniciativa possa ser usada por outras pessoas.

Sou muitíssimo grato a ti que me destes atenção ao ler este textinho!

## Guia de uso

A aplicação como um todo está dividida em 5 grandes rotas:

- **[Fila](#a-fila)**
- **[Livro de atendimento](#o-formulário)**
- **[Relatórios](#relatórios)**
- **[Pessoas registradas](#pessoas-registradas)**
- **Atualizações (v1.1)**

Cada rota tem uma função totalmente úncia, no entanto, a maioria delas depende de alguns grandes componentes em comum, que são a `Table` e o `Form`. Além de que todo componente <i>Stateful</i> está ligado aos contextos, assim como mostra o esquema de árvore no arquivo [main.jsx](/src/main.jsx) (a partir da versão 1.1).

### A fila:

Deixando a parte técnica de lado, vamos focar somente na parte prática. O componente correspondente ao <i>index</i> da aplicação é o componente [`Queue`](/src/pages/Queue/index.jsx), e como já é esperado, ele é o responsável por renderizar a fila de atendimento:

![Queue](/screenshots/fila-1.1.png)

Na tabela são escolhidas as informações necessárias para apresentar ao cliente (relação cliente-servidor), todavia, repare no canto de direito de cada registro: lá estão os ícones de edição e exclusão de registro, e também a bolinha colorida, ao clicar nela, o <i>Status</i> de atendimento é atualizado.

Ao clicar no ícone de edição, você é redirecionado para uma outra rota - o formulário (neste contexto chamado de Livro de Atendimento).

### O formulário:

O livro de atendimento, ou formulário, no ponto de vista programático, é simplesmente a área da aplicação que controla os registros que serão inseridos ou editados na base de dados do sistema. A rota do formulário, pode ou não receber parâmetros, neste caso, o `id`, ou <i>pk (primary key)</i>. Ao receber parâmentros na rota ele tenta identificar um registro através do sistema interno de <i>data fetches</i> da aplicação. Caso o <i>fetch</i> tenha ocorrido com êxito, ele irá trazer os dados obtidos, e tentará inserir nos campos do formulário através do contexto:

![GIF do formulário](/screenshots/form.gif)

### Relatórios:

A [fila de atendimento](#a-fila) reúne todos os registros feitos na data atual. Os relatórios, portanto, são o conjunto das filas de cada dia reunidos em uma só tabela!

Ao clicar no botão "Visualizar Livro" você será direcionado para a página que mostra os registros específicos do relatório daquele dia.

![GIF de relatórios](/screenshots/relatorios.gif)

### Pessoas registradas:

Esta seção reúne todas os registros de pessoas que já foram criadas na base de dados atual da aplicação:

![Pessoas registradas](/screenshots/pessoas-registradas.png)

## Versões:

### 1.0 (lançamento):

- Cadastro de pessoas via formulário;
- Exibição da fila de atendimento;
- Sistema de edição e exclusão de registros;
- Implementação da lista de relatórios diários;

  ### 1.1 (atualização):

  - Suavização nas animações para uma experiência mais fluida;
  - Implementação de paginação para melhor navegação, performance e gerenciamento de dados;
  - Reescrita do código fonte para melhorar a escalabilidade;
  - Melhorias na performance em geral;
  - Melhoria no esquema de mensagens para uma comunicação mais eficiente;
  - Criação de uma página dedicada exclusivamente às atualizações do sistema;
