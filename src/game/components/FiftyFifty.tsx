import { FC } from "react";
import styles from "../styles/lifeLinesAction.module.css";
import FiftyFiftyImg from "../assets/images/50-50_2018.webp";

interface FiftyFiftyProps {
  onClick: () => void;
  isUsed: boolean;
}

export const FiftyFifty: FC<FiftyFiftyProps> = ({ onClick, isUsed }) => {
  return (
    <button
      className={`${styles["lifeline-btn"]}
 ${isUsed ? styles["used"] : ""}
      `}
      onClick={onClick}
      disabled={isUsed}
    >
      {" "}
      <img src={FiftyFiftyImg} alt="50:50" />
    </button>
  );
};
