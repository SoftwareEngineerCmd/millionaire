import { useState } from "react";
import { MillionaireDashboard } from "./components/MillionaireDashboard";
import { questions } from "./data/questions";
import { OptionEnum } from "./enums/Options.enum";

export const Millionaire = () => {
  const [level, setLevel] = useState(13);

  const handleOptionSelect = (selectedOption: OptionEnum) => {
    const currentQuestion = questions[level];
    const isCorrect = selectedOption === currentQuestion.correctOption;

    if (isCorrect) {
      if (level === questions.length - 1) {
        return;
      }

      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1000);
    } else {
      window.alert("❌ You lost!");
      setLevel(0);
    }
  };

  return (
    <MillionaireDashboard
      {...questions[level]}
      onOptionSelect={handleOptionSelect}
    />
  );
};
