import { ReactNode } from "react";

export type buttonType = {
  children: ReactNode;
  type: "button" | "reset" | "submit" | undefined;
  style?: React.CSSProperties;
  onClick: () => void;
};
