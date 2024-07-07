import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img`
  width: 50px;
`;

export default function Loading() {
  return (
    <LoaderContainer>
      <Loader src="/loading.svg" alt="Loading" />
    </LoaderContainer>
  );
}
