import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function useMountAnimation(
  initialState: boolean,
  timeInterval: number
): [
  boolean,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  Dispatch<SetStateAction<boolean>>
] {
  const [trigger, setTrigger] = useState(initialState);
  const [delayedTrigger, setDelayedTrigger] = useState(false);

  //Animating
  //For Opening
  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setDelayedTrigger(true);
      }, 1);
    }
  }, [trigger]);
  //   For Closing
  useEffect(() => {
    if (!delayedTrigger) {
      setTimeout(() => {
        setTrigger(false);
      }, timeInterval);
    }
  }, [delayedTrigger]);

  return [trigger, delayedTrigger,setTrigger, setDelayedTrigger ];
}
