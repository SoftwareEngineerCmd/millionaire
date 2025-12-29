import { FC } from "react";
import styles from "../styles/lifeLinesAction.module.css";
import AskTheAudienceImg from "../assets/images/ATA_2018.webp";

interface AskTheAudienceProps {
  onClick: () => void;
  isUsed: boolean;
}

export const AskTheAudience: FC<AskTheAudienceProps> = ({
  onClick,
  isUsed,
}) => {
  return (
    <>
      <button
        className={`${styles["lifeline-btn"]}
      ${isUsed ? styles["used"] : ""}
  
      `}
        onClick={onClick}
      >
        <img src={AskTheAudienceImg} alt="Ask the Audience" />
      </button>
    </>
  );
};
