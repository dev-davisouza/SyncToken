import { expectTypeOf } from "vitest";
import { IButtonProps, ButtonTypes } from "@/components/Button/type";

describe("Testes de Tipos do Botão", () => {
  // Verifica se o tipo do botão aceita apenas valores específicos
  test("Propriedade type deve aceitar apenas 'button' ou 'submit'", () => {
    expectTypeOf<IButtonProps>()
      .toHaveProperty("type")
      .toEqualTypeOf<ButtonTypes>();
  });

  test("Propriedade onClick deve aceitar uma função que recebe um evento de clique", () => {
    expectTypeOf<IButtonProps>()
      .toHaveProperty("onClick")
      .toEqualTypeOf<
        ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined
      >();
  });

  test("Propriedade $padding deve ser uma string opcional", () => {
    expectTypeOf<IButtonProps>()
      .toHaveProperty("$padding")
      .toEqualTypeOf<string | undefined>();
  });
});
