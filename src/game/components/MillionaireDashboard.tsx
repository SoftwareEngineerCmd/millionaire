import { FC, useEffect, useState } from "react";
import { OptionButton } from "./OptionButton";
import styles from "../styles/millionaireDashboard.module.css";
import { OptionState } from "../types/optionState";
import { Option } from "../types/option";
import { FiftyFifty } from "./FiftyFifty";
import { eliminateTwoWrongOptions } from "../utils/eliminateTwoWrongOptions";
import { askTheAudience } from "../utils/GetTheAudienceAnswer";
import { AskTheAudience } from "./AskTheAudience";
import { AudienceBars } from "./AudienceBars";
import { getRandomQuestionByLevel } from "../core/getRandomQuestionByLevel";
import { SwitchQuestion } from "./SwitchQuestion";
import { switchQuestion } from "../utils/switchQuestion";
import { getPhoneAFriendAnswer } from "../utils/getPhoneAFriendAnswer";
import { PhoneAFriend } from "../components/PhoneAFriend";
import { AskTheExpert } from "./AskTheExpert";
import { getTheExpertAnswer } from "../utils/getTheExpertAnswer";
import { Lifeline } from "../types/lifeLines";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const MillionaireDashboard: FC = () => {
  const [used, setUsed] = useState<Record<Lifeline, boolean>>({
    askTheAudience: false,
    askTheExpert: false,
    fiftyFifty: false,
    phoneAFriend: false,
    switchQuestion: false,
  });
  const [level, setLevel] = useState<number>(1);
  const [question, setQuestion] = useState(() => getRandomQuestionByLevel(1));
  const [optionStates, setOptionStates] = useState<Record<Option, OptionState>>(
    {
      A: "default",
      B: "default",
      C: "default",
      D: "default",
    }
  );
  const [disabled, setDisabled] = useState(false);

  const [audienceVotes, setAudienceVotes] = useState<Record<
    Option,
    number
  > | null>(null);

  const resetGame = () => {
    setLevel(1);
    setQuestion(getRandomQuestionByLevel(1));
    setUsed({
      askTheAudience: false,
      askTheExpert: false,
      fiftyFifty: false,
      phoneAFriend: false,
      switchQuestion: false,
    });
  };

  const handleNextLevel = (selectedOption: Option) => {
    if (!question) return;
    const isCorrect = selectedOption === question.correctOption;

    if (isCorrect) {
      if (level === 15) {
        // player won — reset game
        alert("🎉 You won the Millionaire game!");
        resetGame();
        return;
      }

      // go to next level after short delay; compute nextLevel explicitly
      const nextLevel = level + 1;
      setTimeout(() => {
        setLevel(nextLevel);
        setQuestion(getRandomQuestionByLevel(nextLevel));
      }, 1000);
    } else {
      // player lost — reset game and show message
      window.alert("❌ You lost!");
      resetGame();
    }
  };

  const handleAnswerSelection = async (selectedOption: Option) => {
    setDisabled(true);
    setOptionStates((prev) => ({ ...prev, [selectedOption]: "selected" }));
    await delay(1000);

    if (!question) return;

    setOptionStates((prev) => ({
      ...prev,
      [selectedOption]:
        selectedOption === question.correctOption ? "correct" : "wrong",
      [question.correctOption]: "correct",
    }));

    handleNextLevel(selectedOption);
  };

  const renderOptionButton = (optionKey: Option) => (
    <OptionButton
      key={optionKey}
      name={question.options[optionKey]}
      option={optionKey}
      state={optionStates[optionKey]}
      onSubmit={handleAnswerSelection}
      disabled={optionStates[optionKey] === "delete" || disabled}
    />
  );

  const handleFiftyFifty = () => {
    if (!question) return;
    const state = eliminateTwoWrongOptions(
      question.correctOption,
      optionStates
    );
    setUsed((prev) => ({ ...prev, fiftyFifty: true }));
    setOptionStates(state);
  };

  const handleAskTheAudience = () => {
    const audience = askTheAudience(
      optionStates,
      level,
      question.correctOption
    );
    setAudienceVotes(audience);
    setUsed((prev) => ({ ...prev, askTheAudience: true }));
  };

  const handleSwitchQuestion = () => {
    // try to get a switched question (whatever your util does), fall back to random if not
    const newQuestion = switchQuestion(question.questionText, level);
    setUsed((prev) => ({ ...prev, switchQuestion: true }));
    setQuestion(newQuestion);
  };

  const handlePhoneAFriend = () => {
    const option = getPhoneAFriendAnswer(optionStates, question.correctOption);
    setUsed((prev) => ({ ...prev, phoneAFriend: true }));
    window.alert(option);
  };
  const handleAskTheExpert = () => {
    const option = getTheExpertAnswer(optionStates, question.correctOption);
    setUsed((prev) => ({ ...prev, askTheExpert: true }));
    window.alert(option);
  };

  useEffect(() => {
    setOptionStates({
      A: "default",
      B: "default",
      C: "default",
      D: "default",
    });
    setDisabled(false);
  }, [question]);

  useEffect(() => {
    setTimeout(() => {
      setAudienceVotes(null);
    }, 4000);
  }, [audienceVotes]);

  return (
    <>
      <div className={styles["lifelines"]}>
        <FiftyFifty isUsed={used.fiftyFifty} onClick={handleFiftyFifty} />
        <AskTheAudience
          isUsed={used.askTheAudience}
          onClick={handleAskTheAudience}
        />
        {
          <PhoneAFriend
            isUsed={used.phoneAFriend}
            onClick={handlePhoneAFriend}
          />
        }
        {
          <AskTheExpert
            isUsed={used.askTheExpert}
            onClick={handleAskTheExpert}
          />
        }
        {audienceVotes && <AudienceBars votes={audienceVotes} />}
        {level > 5 && (
          <SwitchQuestion
            isUsed={used.switchQuestion}
            onClick={handleSwitchQuestion}
          />
        )}
      </div>
      {level}
      <div className={styles["option-grid"]}>
        <div className={styles["question-banner"]}>{question.questionText}</div>
        {renderOptionButton("A")}
        {renderOptionButton("B")}
        {renderOptionButton("C")}
        {renderOptionButton("D")}
      </div>
    </>
  );
};
