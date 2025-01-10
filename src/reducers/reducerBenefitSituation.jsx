import { MdCancel, MdBlock } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { FaCheckCircle, FaSadCry, FaQuestion } from "react-icons/fa";

export default function reducerBenefitSituation(situation) {
  if (situation == "Bloqueado") {
    return (
      <>
        <MdBlock color="#FFBF00" />

        <span style={{ fontWeight: 550, color: "#FFBF00" }}>{situation}</span>
      </>
    );
  }
  if (situation == "Cancelado") {
    return (
      <>
        <MdCancel color="red" />

        <span style={{ fontWeight: 550, color: "red" }}>{situation}</span>
      </>
    );
  }
  if (situation == "Suspenso") {
    return (
      <>
        <RiTimerLine color="gray" />

        <span style={{ fontWeight: 550, color: "gray" }}>{situation}</span>
      </>
    );
  }
  if (situation == "Liberado") {
    return (
      <>
        <FaCheckCircle color="green" />

        <span style={{ fontWeight: 550, color: "green" }}>{situation}</span>
      </>
    );
  }
  if (situation == "Não contemplado") {
    return (
      <>
        <FaSadCry />

        <span>{situation}</span>
      </>
    );
  } else {
    return <FaQuestion />;
  }
}
