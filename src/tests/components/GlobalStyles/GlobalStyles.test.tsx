import { render } from "@testing-library/react";
import GlobalStyles from "@/components/GlobalStyles";

describe("GlobalStyles", () => {
  test("Renderiza sem erros", () => {
    expect(() => render(<GlobalStyles />)).not.toThrow();
  });
});
