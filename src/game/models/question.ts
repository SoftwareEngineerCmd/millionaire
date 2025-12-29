import { Option } from "../types/option";

export interface Question {
  questionText: string;
  options: Record<Option, string>;
  correctOption: Option; // restrict to valid option keys
  topic: string;
}
