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

    let keyInterval: NodeJS.Timeout;

    // Establecer un intervalo para ejecutar handleKeyPress cada 100 milisegundos (ajusta según sea necesario)
    keyInterval = setInterval(handleKeyUp, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(keyInterval);
    };
  }, [keyPressed]);

  return keyPressed;
};