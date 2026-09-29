import Container from "@/components/Container";
import { render, screen } from "@testing-library/react";

describe("Componente default de Container", () => {
  const textMock = "Renderizei";
  const renderContainer = () => {
    render(<Container>{textMock} </Container>);
  };

  // Verificação de existência
  test("renderiza o Container", () => {
    renderContainer();

    const buttonElement = screen.getByText(textMock);
    expect(buttonElement).toBeTruthy(); // Verifica se existe
  });
});
