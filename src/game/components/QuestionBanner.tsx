import { FC } from "react";
import styles from "../styles/questionBanner.module.css";

interface QuestionBannerProps {
  question: string;
}

export const QuestionBanner: FC<QuestionBannerProps> = ({ question }) => {
  return (
    <div className={styles["question-banner-wrapper"]}>
      <div className={styles["question-banner"]}>{question}</div>
    </div>
  );
};
