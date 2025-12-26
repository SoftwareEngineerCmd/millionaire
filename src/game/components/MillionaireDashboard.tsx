import { FC, useEffect, useState } from "react";
import { OptionButton } from "./OptionButton";
import { QuestionBanner } from "./QuestionBanner";
import { OptionEnum } from "../enums/Options.enum";
import styles from "../styles/millionaireDashboard.module.css";
import { OptionState } from "../types/options";

interface MillionaireDashboardProps {
  questionText: string;
  options: Record<OptionEnum, string>;
  correctOption: OptionEnum;
  onOptionSelect: (answer: OptionEnum) => void;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const MillionaireDashboard: FC<MillionaireDashboardProps> = ({
  questionText,
  options,
  correctOption,
  onOptionSelect,
}) => {
  // Track the state of each option
  const [optionStates, setOptionStates] = useState<
    Record<OptionEnum, OptionState>
  >({
    A: "default",
    B: "default",
    C: "default",
    D: "default",
  });

  const [disabled, setDisabled] = useState(false);

  const handleAnswerSelection = async (selectedOption: OptionEnum) => {
    if (disabled) return;

    setDisabled(true);

    // Set selected state
    setOptionStates((prev) => ({ ...prev, [selectedOption]: "selected" }));

    await delay(1000);

    // Set correct or wrong state
    setOptionStates((prev) => ({
      ...prev,
      [selectedOption]: selectedOption === correctOption ? "correct" : "wrong",
      [correctOption]: "correct", // optionally highlight the correct option
    }));

    onOptionSelect(selectedOption);
  };

  useEffect(() => {
    setOptionStates({
      A: "default",
      B: "default",
      C: "default",
      D: "default",
    });
    setDisabled(false);
  }, [questionText, correctOption]);

  // Helper to render all buttons dynamically
  const renderOptionButton = (optionKey: OptionEnum) => (
    <OptionButton
      key={optionKey}
      name={options[optionKey]}
      option={optionKey}
      state={optionStates[optionKey]}
      onSubmit={handleAnswerSelection}
      disabled={disabled}
    />
  );

  return (
    <>
      <QuestionBanner question={questionText} />

      <div className={styles["option-grid"]}>
        <div className={styles["option-row"]}>
          {renderOptionButton(OptionEnum.A)}
          {renderOptionButton(OptionEnum.B)}
        </div>
        <div className={styles["option-row"]}>
          {renderOptionButton(OptionEnum.C)}
          {renderOptionButton(OptionEnum.D)}
        </div>
      </div>
    </>
  );
};
