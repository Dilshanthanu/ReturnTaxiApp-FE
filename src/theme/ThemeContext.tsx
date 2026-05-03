import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance, Dimensions } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

const { width } = Dimensions.get("window");

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeObject = {
    ...(theme === "light" ? eva.light : eva.dark),
    ...(theme === "light" ? lightTheme : darkTheme),
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={themeObject}>
          {children}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
