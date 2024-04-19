export interface IThemes {
  id: string;
  label: string;
  colors: {
    primary: string;
    text: string;
    bg: string;
  }
}

/* Cambia i colori da qui */
const colors = {
  white: "#ffffff",
  black: "#000000",
  red: "#ff2b00",
  yellow: "#ffec19",
  gray: "#cccccc",
  lila: "#ffe6ff",
  green: "#00ba1f",
  blue: "#0557fa"
}

export const themes: IThemes[] = [
{
  id: "light",
  label: "Light Theme",
  colors: {
    primary: colors.red,
    text: colors.black,
    bg: colors.white
  }
},
{
  id: "dark",
  label: "Dark Theme",
  colors: {
    primary: colors.yellow,
    text: colors.white,
    bg: colors.black
  }
},
{
  id: "gray",
  label: "Gray Theme",
  colors: {
    primary: colors.white,
    text: colors.black,
    bg: colors.gray
  }
},
{
  id: "lila",
  label: "Lilla Theme",
  colors: {
    primary: colors.red,
    text: colors.black,
    bg: colors.lila
  }
},
{
  id: "random",
  label: "Random Theme",
  colors: {
    primary: colors.green,
    text: colors.blue,
    bg: colors.white
  }
}
// Aggiungi tutti i theme di colori che vuoi
];

export const handleThemeChange = (selectedTheme: IThemes) => {
  const root = document.documentElement;
  root.style.setProperty('--primary', selectedTheme.colors.primary);
  root.style.setProperty('--text', selectedTheme.colors.text);
  root.style.setProperty('--bg', selectedTheme.colors.bg);
};