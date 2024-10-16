import { useEffect, useState } from "react";

export const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState<null | string>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    setKeyPressed(event.key);
  };

  const handleKeyUp = () => {
    setKeyPressed(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const keyInterval = setInterval(handleKeyUp, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(keyInterval);
    };
  }, [keyPressed]);

  return keyPressed;
};