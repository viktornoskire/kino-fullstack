"use client";

import { FC } from "react";
import { buttonType } from "@/types/Buttontypes";

const Button: FC<buttonType> = ({ children, type, style, onClick }) => {
  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      className="bg-kino-red rounded-4xl text-xl font-bold pt-2 pb-2 pl-12 pr-12"
    >
      {children}
    </button>
  );
};

export default Button;
