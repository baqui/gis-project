import React from 'react';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { selectTheme } from '../utils/theme';
import { muiTheme } from './BasicTheme';
import '../styles/normalize';
import Nav from '../components/Nav/Nav';

export const MainLayout = (props) => (
  <ThemeProvider theme={ selectTheme('default') }>
    <MuiThemeProvider muiTheme={ muiTheme } className="mui-custom">
      <div className="main-page-wrapper">
        <Nav links={[]} />
        { props.children }
      </div>
    </MuiThemeProvider>
  </ThemeProvider>
)
