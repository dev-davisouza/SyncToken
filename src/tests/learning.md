<!-- 17-03-2025 -->

Essa é a primeira vez que trabalho com testes em JS de forma séria.

A primeira vez que vi testes foi com Pytest do Python em um projeto Django.

Aqui, neste projeto, estou utilizando `testing-library` para obter os componentes
que estão sendo manipulados no DOM.

O presente projeto tem como ferramenta de construção o `vite`, e por questões de
compatibilidade estou usando o `vitest` ao invés do `Jest` para executar os testes,
além de que, o fato do `Jest` não ser 100% compatível com ESModule dificulta o seu uso.
O `vitest` parece ser bem mais moderno que o `Jest`, porém não apresenta tantas possibilidades
de testes quanto ele.
