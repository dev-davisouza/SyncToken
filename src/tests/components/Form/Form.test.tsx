// src/tests/components/Form/Form.test.tsx

import { render, screen } from "@testing-library/react";
import Form from "@/components/Form";
import userEvent from "@testing-library/user-event";
import { FormProvider } from "@/context/FormContext";

/**
 * Teste básico para o componente Form, cobrindo:
 * renderização,
 * entrada de dados e
 * submissão do formulário.
 */
describe("Componente de Form", () => {
  const handleSubmit = vi.fn(
    (e: React.FormEvent<HTMLFormElement>) => e.preventDefault() // mock de submit
  );
  const handleValue = vi.fn((_name: string, value: string) => value); // Mock para manipulação de valores

  const textFields = ["name", "email"];
  const selectFields = { country: ["Brasil", "Argentina", "EUA"] };

  const renderWithFormProvider = (ui: React.ReactElement) => {
    return render(<FormProvider>{ui}</FormProvider>); // Envolvendo com FormProvider
  };

  test("Renderiza corretamente com legend e botão de submit", () => {
    renderWithFormProvider(
      <Form
        legend="Dados pessoais"
        handleSubmit={handleSubmit}
        textSubmit="Enviar"
        textFields={textFields}
        selectFields={selectFields}
      />
    );

    expect(screen.getByText("Dados pessoais")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("country")).toBeInTheDocument();
  });
  test("Permite digitar nos campos de texto", async () => {
    renderWithFormProvider(
      <Form
        legend="Dados Pessoais"
        handleSubmit={handleSubmit}
        textSubmit="Enviar"
        textFields={textFields}
        selectFields={selectFields}
        handleValue={handleValue}
      />
    );

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    await userEvent.type(nameInput, "Davi");

    expect(nameInput.value).toBe("Davi");
    expect(handleValue).toHaveBeenCalledWith("name", "Davi");
  });
  test("Seleciona um valor em um campo select", async () => {
    renderWithFormProvider(
      <Form
        legend="Dados Pessoais"
        handleSubmit={handleSubmit}
        textSubmit="Enviar"
        textFields={textFields}
        selectFields={selectFields}
      />
    );

    const selectCountry = screen.getByLabelText("country") as HTMLSelectElement;
    await userEvent.selectOptions(selectCountry, "Brasil");

    expect(selectCountry.value).toBe("Brasil");
  });
  test("Submete o formulário corretamente quando required == true", async () => {
    renderWithFormProvider(
      <Form
        legend="Dados Pessoais"
        handleSubmit={handleSubmit}
        textSubmit="Enviar"
        selectFields={selectFields}
      />
    );

    const selectCountry = screen.getByLabelText("country") as HTMLSelectElement;
    await userEvent.selectOptions(selectCountry, "Brasil");

    const button = screen.getByRole("button") as HTMLButtonElement;
    await userEvent.click(button);

    /* SÓ SUBMete o FORM se os campos estiverem preenchidos*/
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
