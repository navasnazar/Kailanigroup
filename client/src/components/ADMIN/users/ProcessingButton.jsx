import { useState } from "react";

import "./processingButton.css";

export const ProcessingButton = () => {
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleClick = () => {
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      setTimeout(() => {
        setIsPaid(false);
      }, 2000);
    }, 2000);
  };

  return (
    <button className="processing_Button" disabled={isPaying || isPaid} onClick={handleClick}>
      <span className="rail"></span>
      <span className="icon"></span>
      <span className="text">
        {isPaying ? "Processing" : isPaid ? "Complete" : "Blocking Status Change"}
      </span>
    </button>
  );
};