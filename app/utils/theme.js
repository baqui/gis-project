import { DefaultTheme } from '../styles/DefaultTheme';

const themes = {
  default: DefaultTheme
};

export const selectTheme = theme => themes[theme];
