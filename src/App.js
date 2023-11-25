import "./App.css";
import AppSpinner from "./components/Spinner";
import { useAppContext } from "./contexts/AppContext";
import MainPage from "./components/MainPage";
import MainPageAfter from "./components/MainPageAfter";
import { useAuthContext } from "./contexts/AuthContext";
function App() {
  const { showSpinner, setShowSpinner } = useAppContext();
  const { currentUser } = useAuthContext();
  return (
    <>
      <AppSpinner
        show={showSpinner}
        hideSpinner={() => setShowSpinner(false)}
      />
      {currentUser ? <MainPageAfter /> : <MainPage />}
    </>
  );
}

export default App;
