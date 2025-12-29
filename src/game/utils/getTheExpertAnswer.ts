import { Option } from "../types/option";
import { OptionState } from "../types/optionState";

export const getTheExpertAnswer = (
  options: Record<Option, OptionState>,
  correctAnswer: Option
): Option => {
  const wrongOptions: Option[] = [];

  (Object.keys(options) as Option[]).forEach((key) => {
    if (options[key] !== "delete" && key !== correctAnswer) {
      wrongOptions.push(key);
    }
  });

  const randomNumber = Math.random();

  if (randomNumber < 0.9) {
    return correctAnswer;
  }

  return wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
};
