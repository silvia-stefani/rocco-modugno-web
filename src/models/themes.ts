export interface IThemes {
  id: string;
  label: string;
  colors: {
    primary: string;
    text: string;
    bg: string;
  }
}

const colors = {
  white: "#ffffff",
  black: "#373737",
  red: "#cc3232",
  yellow: "#FFDE2F",
  violet: "#c296e4"
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
  id: "red",
  label: "Red Theme",
  colors: {
    primary: colors.violet,
    text: colors.white,
    bg: colors.red
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
  id: "violet",
  label: "Violet Theme",
  colors: {
    primary: colors.black,
    text: colors.red,
    bg: colors.violet
  }
},
// Aggiungi tuttu i theme di colori che vuoi
];

export const handleThemeChange = (selectedTheme: IThemes) => {
  const root = document.documentElement;
  root.style.setProperty('--primary', selectedTheme.colors.primary);
  root.style.setProperty('--text', selectedTheme.colors.text);
  root.style.setProperty('--bg', selectedTheme.colors.bg);
};