import questions from "./../data/questions.json";

export const getRandomQuestionByLevel = (lvl: number) => {
  const levelKey = `level-${lvl}` as keyof typeof questions;
  const count = questions[levelKey].length;
  const getNumber = Math.floor(Math.random() * count);
  return questions[levelKey][getNumber];
};
