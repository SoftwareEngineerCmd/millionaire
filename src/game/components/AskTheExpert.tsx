import { FC } from "react";
import styles from "../styles/lifeLinesAction.module.css";
import AskTheExpertImg from "../assets/images/Ask_The_Host.webp";

interface AskTheExpertProps {
  onClick: () => void;
  isUsed: boolean;
}

export const AskTheExpert: FC<AskTheExpertProps> = ({ onClick, isUsed }) => {
  return (
    <button
      className={`${styles["lifeline-btn"]} ${isUsed ? styles["used"] : ""}`}
      onClick={onClick}
      disabled={isUsed}
    >
      <img src={AskTheExpertImg} alt="Ask the Expert" />
    </button>
  );
};
