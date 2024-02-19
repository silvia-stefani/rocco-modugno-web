import { useEffect, useState } from 'react';
import Splash from './pages/Splash';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { splashTime } from './models/splashTime';

const App = () => {
    // Initialize from localStorage
  const [showSplashscreen, setShowSplashscreen] = useState<boolean>(
    () => !JSON.parse(localStorage.getItem("showedSplashscreen") as string)
  );

  useEffect(() => {
    setTimeout(() => {
      // Update local state to trigger component rerender
      setShowSplashscreen(false);
      // Update localStorage for next time app is mounted
      localStorage.setItem("showedSplashscreen", JSON.stringify(true));
    }, splashTime);
  }, []);

  // Conditionally render splash screen or app router
  return showSplashscreen ? (
    <Splash />
  ) : (
    <RouterProvider router={router} />
  );
  
  return ;
};

export default App;
