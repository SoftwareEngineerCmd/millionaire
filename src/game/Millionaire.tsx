import { useState } from "react";
import { MillionaireDashboard } from "./components/MillionaireDashboard";
import { OptionEnum } from "./enums/Options.enum";
import { getRandomQuestionByLevel } from "./core/getRandomQuestionByLevel";
import Logo from "./assets/images/logo.webp";

export const Millionaire = () => {
  const [level, setLevel] = useState(1);

  const question = getRandomQuestionByLevel(level);

  const handleOptionSelect = (selectedOption: OptionEnum) => {
    const isCorrect = selectedOption === question?.correctOption;

    if (!question) return;

    if (isCorrect) {
      if (level === 15) {
        alert("🎉 You won the Millionaire game!");
        setLevel(1);
        return;
      }
      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1000);
    } else {
      window.alert("❌ You lost!");
      setLevel(1);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </div>

        {/* Level Indicator */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#FFD700",
          }}
        >
          Level {level}
        </div>

        {/* Millionaire Dashboard */}
        <MillionaireDashboard
          correctOption={question.correctOption as OptionEnum}
          options={question.options}
          questionText={question.questionText}
          onOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
};
