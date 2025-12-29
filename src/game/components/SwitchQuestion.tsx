import { FC } from "react";
import SwitchQuestionImg from "../assets/images/Switch_DarkRaveStyle.webp";
import styles from "../styles/lifeLinesAction.module.css";

interface SwitchQuestionProps {
  onClick: () => void;
  isUsed: boolean;
}
export const SwitchQuestion: FC<SwitchQuestionProps> = ({
  onClick,
  isUsed,
}) => {
  return (
    <button
      className={`${styles["lifeline-btn"]}
      ${isUsed ? styles["used"] : ""}
            `}
      onClick={onClick}
      disabled={isUsed}
    >
      <img src={SwitchQuestionImg} alt="Switch Question" />
    </button>
  );
};
