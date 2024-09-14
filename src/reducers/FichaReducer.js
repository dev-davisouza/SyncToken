export const SET_FICHAS = "SET_FICHAS"; // Definir o array inteiro
export const ADD_FICHA = "ADD_FICHA"; // Adicionar uma ficha para o array
export const DELETE_FICHA = "DELETE_FICHA";
export const EDIT_FICHA = "EDIT_FICHA";

export default function FichaReducer(state, action) {
  switch (action.type) {
    case SET_FICHAS:
      return action.payload;

    case ADD_FICHA:
      //state.map((ficha) => )
      return;

    case DELETE_FICHA:
      return;

    case EDIT_FICHA:
      // Como o reducer deve ser síncrono, não podemos fazer o fetch aqui
      return state.map((ficha) =>
        ficha.NIS_CPF === action.payload.NIS_CPF
          ? { ...ficha, ...action.payload }
          : ficha
      );
    default:
      return state;
  }
}
