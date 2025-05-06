import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, useEffect, useState } from "react";
import { create } from "react-test-renderer";

const ThemeContext = createContext();
export const ThemeProvider = ({ Children }) => {
  const [isDark, setIsDark] = useState(false);
  cosnt[(loading, setLoading)] = useState(true);
  // const toggleTheme = () => setDark(!isDark);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("APP_THEME");
        if (savedTheme !== null) {
          setDark(savedTheme === "dark");
        }
      } catch (error) {
        console.log("Failed to load theme", error);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem("APP_THEME", newTheme ? "dark" : "light");
    } catch (error) {
      console.log("failed to save theme", error);
    }
  };
  const theme = isDark
    ? {
        mode: "dark",
        background: "#121212",
        text: "#ffffff",
        border: "#333",
        placeholder: "#888",
        card: "#1e1e1e",
      }
    : {
        mode: "light",
        background: "#ffffff",
        text: "#000000",
        border: "#ccc",
        placeholder: "#999",
        card: "#f2f2f2",
      };
  if (loading) return null;
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {Children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
