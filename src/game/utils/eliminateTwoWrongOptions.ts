import { Option } from "../types/option";
import { OptionState } from "../types/optionState";

export const eliminateTwoWrongOptions = (
  correctOption: Option,
  options: Record<Option, OptionState>
): Record<Option, OptionState> => {
  const newOptions: Record<Option, OptionState> = {} as Record<
    Option,
    OptionState
  >;
  let wrongAnswersCount = 0;
  (Object.keys(options) as Option[]).forEach((key) => {
    if (wrongAnswersCount < 2 && key !== correctOption) {
      newOptions[key] = "delete";
      wrongAnswersCount++;
    } else {
      newOptions[key] = "default";
    }
  });

  return newOptions;
};
