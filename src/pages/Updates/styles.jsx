import styled from "styled-components";

export const UpdateContainer = styled.section`
  margin-top: 4rem;
  padding: 1rem 1rem 1rem 4rem;
  width: 60%;
  box-sizing: content-box;
`;

export const MainTitle = styled.h1`
  font-size: 55px;
  margin-left: 1rem;
  margin-bottom: 3rem;
`;

export const Subtitle = styled.p`
  margin-left: 1rem;
  font-size: 20px;
  font-weight: 300;
  color: #6b6b6b;
  line-height: 1.75;
`;

export const UpdateLink = styled.a`
  color: #1a1a1a;
  font-weight: 600;
  background-color: rgba(187, 239, 253, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Note = styled.blockquote`
  background-color: rgba(255, 229, 100, 0.3);
  border-left-color: #ffe564;
  border-left-width: 9px;
  border-left-style: solid;
  padding: 20px 45px 20px 26px;
  margin-bottom: 30px;
  margin: 40px 0 0 -20px;
`;

export const NoteHeader = styled.p`
  margin-top: 0;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const NoteBody = styled.p`
  margin-top: 0;
`;

export const VersionsContainer = styled.div`
  all: unset;
  display: block;
  h3 {
    font-size: 25px;
  }
`;
