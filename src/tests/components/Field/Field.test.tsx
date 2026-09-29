import Field from "@/components/Field";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
Objetivos dos testes:
Renderização básica: O componente deve renderizar corretamente.
Renderização condicional: Deve exibir input ou select dependendo do type.
Label: O rótulo (label) deve estar presente e associado corretamente.
Placeholder: Deve exibir o placeholder quando o type for "text".
Select com opções: Quando type: "select", deve renderizar opções corretamente.
Propriedade autoFocus: Deve garantir que o campo recebe foco quando autoFocus for true.
*/

describe("Componente Field", () => {
  const handleChange = vi.fn();

  test("Renderiza corretamente um campo tipo 'input'", () => {
    const NIS_CPF = "NIS_CPF";
    render(<Field label="NIS/CPF" name={NIS_CPF} type="text" />);

    const input = screen.getByRole("textbox", { name: "NIS/CPF" });
    expect(input).toBeInTheDocument();
  });

  test("Renderiza corretamente as opções de um tipo 'select'", () => {
    render(
      <Field
        name="country"
        type="select"
        label="País"
        options={["Brasil", "Argentina"]}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3); // Inclui o primeiro "Selecione uma opção de País"
    expect(options[1]).toHaveTextContent("Brasil");
    expect(options[2]).toHaveTextContent("Argentina");
  });

  /*  test("Foca automaticamente no campo quando autoFocus for verdadeiro", async () => {
    render(<Field name="email" type="text" label="E-mail" autoFocus />);

    const input = screen.getByRole("textbox");
    expect(document.activeElement).toBe(input);
  }); */

  test("Dispara evento onChange ao digitar no campo de texto", async () => {
    render(
      <Field
        name="username"
        label="Usuário"
        type="text"
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Digitando...");

    expect(handleChange).toHaveBeenCalled();
  });

  test("Dispara evento onChange ao selecionar uma opção", async () => {
    render(
      <Field
        name="color"
        type="select"
        label="Cor"
        options={["Aoi", "Akai"]}
        onChange={handleChange}
      />
    );

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "Akai");

    expect(handleChange).toHaveBeenCalled();
  });

  test("Note é renderizado corretamente", () => {
    const note = "Somente pesquisas por nome serão aceitas";
    render(<Field label="Pesquisa" name="search" type="text" note={note} />);

    const input = screen.getByText(note);
    expect(input).toBeInTheDocument();
  });
});
