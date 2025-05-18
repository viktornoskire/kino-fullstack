"use client";
import { useState } from "react";
import DisableModal from "./DisableModal";
import { HandicapSeatProps } from "./types/Seatings.types";

const HandicapSeatHandler = ({ children }: HandicapSeatProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DisableModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HandicapSeatHandler;
