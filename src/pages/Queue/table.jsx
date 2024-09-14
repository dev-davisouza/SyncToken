/* 
        {fichas.map((ficha) => (
          <Card key={ficha.NIS_CPF}>
            <CardNumber>N°{ficha.NdaFicha}</CardNumber>
            <CardItem>
              <div>NIS/CPF:</div>
              <CardValue>{ficha.NIS_CPF}</CardValue>
            </CardItem>
            <CardItem>
              <div>Nome:</div>
              <CardValue>{ficha.Nome}</CardValue>
            </CardItem>
            <CardItem>
              <div>Endereço:</div>
              <CardValue>{ficha.Endereço}</CardValue>
            </CardItem>
            <CardItem>
              <div>Ação:</div>
              <CardValue>{ficha.Ação}</CardValue>
            </CardItem>
            <CardItem>
              <div>Data de registro:</div>
              <CardValue>{ficha.created_at}</CardValue>
            </CardItem>
            <CardItem>
              <div>Prioridade:</div>
              <CardValue>{ficha.Prioridade}</CardValue>
            </CardItem>
            <CardItem>
              <div>Status:</div>
              <CardValue>
                {
                  <MiniBallButton
                    title={ficha.Status[0]}
                    color={ficha.Status[1]}
                  />
                }
              </CardValue>
            </CardItem>
            <ActionContainer>
              <ActionButton title="Excluir um registro é permanente!">
                <FaRegTrashCan />
              </ActionButton>
              <ActionButton>
                <FaPenToSquare />
              </ActionButton>
            </ActionContainer>
          </Card>
        ))}
      </StyledFlexContainer>
    </>
  );
}
 */
