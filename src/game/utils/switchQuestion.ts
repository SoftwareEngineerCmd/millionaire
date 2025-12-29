import { getRandomQuestionByLevel } from "../core/getRandomQuestionByLevel";

export const switchQuestion = (oldQuestion: string, level: number) => {
  let newQuestion = getRandomQuestionByLevel(level);
  let attempts = 0;
  const MAX_ATTEMPTS = 10;

  while (oldQuestion === newQuestion.questionText && attempts < MAX_ATTEMPTS) {
    newQuestion = getRandomQuestionByLevel(level);
    attempts++;
  }

  // If we exhausted attempts, return the current question anyway
  // (caller should handle the case where the question might be the same)
  return newQuestion;
};
