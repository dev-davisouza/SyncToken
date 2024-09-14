## Essa refatoração tem como objetivo oferecer:

- ### Arquitetura limpa e escalável:
  - Cada componente, uma função;
  - Nunca repetir código;
  - Lógica simples, intuitiva e direta;
  - Possível quebra de componentes grandes em outros menores;
  - Evitar ao máximo criar componentes não reutilizáveis;
  - Criar componentes o mais generalistas possíveis.
  - Prop-drilling simples, mas evitar sempre que possível;
  - Depender mais dos contextos e hooks personalizados ao invés de criar lógicas internas;
  - Componentes <i>Stateful</i> devem sempre estar subordinados ao contexto para evitar problemas;
