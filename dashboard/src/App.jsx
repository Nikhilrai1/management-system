import { useLayoutEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { saveAllTheme } from "./app/features/themeSlice";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import axios from 'axios'
import ThemeSettings from "./components/ThemeSettings";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import Students from "./pages/Students";
import TeachersPage from "./pages/TeachersPage";
import ParentsPage from "./pages/ParentsPage";
import ProfilePage from "./pages/ProfilePage";

axios.defaults.baseURL = `http://localhost:3500`
function App() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [isSavedTheme, setIsSavedTheme] = useState(false);
  const dispatch = useDispatch();

  // saveThemeSettings
  const saveThemeSettings = (allThemeSetting) => {
    localStorage.setItem("theme", JSON.stringify(allThemeSetting))
    setIsSavedTheme(true)
    setTimeout(() => {
      setToggleSettings(false)
      setIsSavedTheme(false)
    }, 1000)

  }

  // saveThemeSettings before page load
  useLayoutEffect(() => {
    const savedTheme = JSON.parse(JSON.stringify(localStorage.getItem("theme")));
    if (savedTheme) {
      dispatch(saveAllTheme(JSON.parse(savedTheme)))
    }
  }, [])
  return (
    <>
      <Sidebar />
      <ThemeSettings toggleSettings={toggleSettings} setToggleSettings={setToggleSettings} saveThemeSettings={saveThemeSettings} isSavedTheme={isSavedTheme} />
      <button
        type="button"
        onClick={() => setToggleSettings(true)}
        style={{ background: "blue", borderRadius: '50%' }}
        className={`text-3xl text-white ${toggleSettings && "hidden"} z-50 p-3 hover:drop-shadow-xl hover:bg-light-gray fixed right-10 bottom-5`}
      >
        <FiSettings />
      </button>
      <div className="md:ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;