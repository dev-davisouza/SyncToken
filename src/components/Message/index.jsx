import { useState, useEffect } from "react";
import styled from "styled-components";

const MessageContent = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #000;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 5px;

  ${(props) =>
    props.$type === "success"
      ? `color: #155724;
    background-color: #D4EDDA;
    border-color: #c3e6cb;`
      : `color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;`}
`;

export default function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && (
        <MessageContent $type={type}>
          <p>{msg}</p>
        </MessageContent>
      )}
    </>
  );
}
