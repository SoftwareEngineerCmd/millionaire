import { FC } from "react";
import PhoneAFriendImg from "../assets/images/PAF_2018.webp";
import styles from "../styles/lifeLinesAction.module.css";

interface PhoneAFriendProps {
  onClick: () => void;
  isUsed: boolean;
}

export const PhoneAFriend: FC<PhoneAFriendProps> = ({ onClick, isUsed }) => {
  return (
    <button
      className={`${styles["lifeline-btn"]} ${isUsed ? styles["used"] : ""}`}
      onClick={onClick}
      disabled={isUsed}
    >
      <img src={PhoneAFriendImg} alt="Phone a Friend" />
    </button>
  );
};
