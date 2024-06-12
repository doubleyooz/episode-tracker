import { useEffect, useState } from "react";
import Label from "./Label";

export interface TimerProps {
  seconds: number;
  timerRunning: boolean;
  text: string;
  handleTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = (props) => {
  const { seconds, text, timerRunning, handleTimeUp } = props;
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  const resetTimer = () => {
    setTimeRemaining(seconds);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      resetTimer();
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining, handleTimeUp]);
  return (
    <Label
      fontSize={16}
      variant="primary"
      text={`${text} ${timeRemaining} ${
        timeRemaining !== 1 ? "seconds" : "second"
      }`}
    />
  );
};

export default Timer;
