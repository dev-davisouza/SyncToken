import { Th } from "@/components/Table/style";

/* theaders: [] */

export default function mapperTheaders(
  theaders,
  isJsx = true,
  one = false,
  extraSpace = false
) {
  if (isJsx) {
    // Retorno em JSX
    return (
      <tr>
        {theaders.map((prop) => {
          if (prop === "created_at") {
            return <Th key={prop}>Data de registro</Th>;
          }
          if (prop === "NdaFicha") {
            return <Th key={prop}>N°</Th>;
          }
          if (prop === "NIS_CPF") {
            return <Th key={prop}>NIS/CPF</Th>;
          }
          if (prop === "last_update") {
            return <Th key={prop}>Última atualização</Th>;
          } else {
            return <Th key={prop}>{prop}</Th>;
          }
        })}
        {extraSpace && <th></th>}
      </tr>
    );
  } else if (one) {
    if (theaders === "DocType") {
      return "Tipo de documento";
    } else if (theaders === "NdaFicha") {
      return "N°";
    } else if (theaders === "NIS_CPF") {
      return "NIS/CPF";
    } else if (theaders === "created_at") {
      return "Data de registro";
    } else {
      return theaders;
    }
  } else {
    // Retorno não-JSX (string) e não único
    let newHeaders = [];
    theaders.map((prop) => {
      if (prop === "DocType") {
        newHeaders.push("Tipo de documento");
      } else if (prop === "NdaFicha") {
        newHeaders.push("N");
      } else if (prop === "NIS_CPF") {
        newHeaders.push("NIS/CPF");
      } else if (prop === "created_at") {
        newHeaders.push("Data de registro");
      } else if (prop === "last_update") {
        newHeaders.push("Última atualização");
      } else {
        newHeaders.push(prop);
      }
    });

    return newHeaders; // Retorno do array de strings
  }
}
