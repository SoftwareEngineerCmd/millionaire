import { Option } from "../types/option";
import { OptionState } from "../types/optionState";

/**
 * Simulates audience votes for a question.
 * @param options - current states of options (deleted/available)
 * @param lvl - current question level (affects number of votes)
 * @param correctOption - the correct option key (A/B/C/D)
 * @returns record of votes for each option as percentages
 */
export const askTheAudience = (
  options: Record<Option, OptionState>,
  lvl: number,
  correctOption: Option
): Record<Option, number> => {
  const correctAnswerWeight = 0.75; // 75% chance to vote correct
  const votingResult = {} as Record<Option, number>;
  const votingCount = lvl * 100; // more votes for higher levels

  const availableOptions: Option[] = (Object.keys(options) as Option[]).filter(
    (key) => options[key] !== "delete"
  );

  const votes: Record<Option, number> = {} as Record<Option, number>;
  availableOptions.forEach((key) => (votes[key] = 0));

  for (let i = 0; i < votingCount; i++) {
    let chosenOption: Option;

    if (
      Math.random() < correctAnswerWeight &&
      availableOptions.includes(correctOption)
    ) {
      chosenOption = correctOption; // audience tends to pick correct
    } else {
      // pick a random wrong option
      const wrongOptions = availableOptions.filter(
        (opt) => opt !== correctOption
      );
      chosenOption =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    }

    votes[chosenOption]++;
  }

  // convert counts to percentages
  availableOptions.forEach((key) => {
    votingResult[key] = Number(((votes[key] / votingCount) * 100).toFixed(2));
  });

  return votingResult;
};
