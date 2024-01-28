import { useEffect, useState } from "react";
import { MainScreen } from "./Screens/MainScreen/MainScreen";
import { LoadingScreen } from "./Screens/LoadingScreen/LoadingScreen";
import { GreetingsScreen } from "./Screens/GreetingsScreen/GreetingsScreen";
function App() {
  const [starting, setStarting] = useState(true);
  const [main, setMain] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStarting(false);
    }, 1000);
  }, []);

  const correctPage = !starting ? (
    <GreetingsScreen setMain={setMain}></GreetingsScreen>
  ) : (
    <LoadingScreen></LoadingScreen>
  );

  return main ? <MainScreen /> : correctPage;
}

export default App;
