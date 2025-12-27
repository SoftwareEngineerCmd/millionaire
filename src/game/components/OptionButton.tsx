import { FC } from "react";
import styles from "../styles/buttons.module.css";
import { OptionEnum } from "../enums/Options.enum";
import { OptionState } from "../types/options";

interface OptionButtonProps {
  name: string;
  option: OptionEnum;
  onSubmit: (o: OptionEnum) => void;
  state?: OptionState;
  disabled?: boolean;
}

export const OptionButton: FC<OptionButtonProps> = ({
  name,
  option,
  onSubmit,
  state = "default",
  disabled,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSubmit(option)}
      className={[
        styles["option-button"],
        state !== "default" ? styles[state] : "",
      ].join(" ")}
    >
      <span className={styles.optionKey}>{option + ":"}</span>
      <span>{name}</span>
    </button>
  );
};
