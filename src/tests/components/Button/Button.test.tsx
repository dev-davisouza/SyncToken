// src/test/components/Button/Button.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import Button from "@/components/Button";
import { vi } from "vitest";

describe("Componente de botão", () => {
  const textBtn = "Clique aqui";
  /** Adiciona o componente de botão ao DOM */
  const renderButton = (onClick = () => {}) => {
    render(
      <Button type="button" onClick={onClick}>
        {textBtn}
      </Button>
    );
  };

  // Verificação de existência
  test("renderiza o botão com o texto fornecido", () => {
    renderButton();

    const buttonElement = screen.getByText(textBtn);
    expect(buttonElement).toBeInTheDocument(); // Verifica se existe
  });

  // Verificação de existência (by ROle)
  test("renderiza o botão com o tipo 'button' ", () => {
    renderButton();

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument(); // Verifica se existe
  });

  // Verificação de funcionalidade (onClick)
  test("chama a função de clique ao ser pressionado", () => {
    const handleClick = vi.fn();
    renderButton(handleClick);

    fireEvent.click(screen.getByText(textBtn));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
