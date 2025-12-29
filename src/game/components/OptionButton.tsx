import { FC } from "react";
import styles from "../styles/buttons.module.css";
import { OptionState } from "../types/optionState";
import { Option } from "../types/option";

interface OptionButtonProps {
  name: string;
  option: Option;
  onSubmit: (o: Option) => void;
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
      {state !== "delete" && (
        <>
          <span className={styles.optionKey}>{option + ":"}</span>
          <span>{name}</span>
        </>
      )}
    </button>
  );
};
