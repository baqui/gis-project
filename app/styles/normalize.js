import { injectGlobal } from 'styled-components';
import { breakpoint } from './grid';
import { fontsDefinition } from './fonts';

injectGlobal`

  ${fontsDefinition}

  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    position: relative;
  }

  body {
    margin: 0;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  [hidden],
  template {
    display: none;
  }

  a {
    background-color: transparent;
    text-decoration: none;
    color: black;

    &:hover {
      color: black;
    }
  }

  a, input, button, textarea {
    &:active, &:hover, &:focus {
      outline: none;
    }
  }

  input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  ul {
    list-style-type: none;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    list-style-type: disc;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
  }

  p, h1, h2, h3, h4, h5, h6 {
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    margin-top: 0;
    margin-bottom: 0;
  }

  abbr[title] {
    border-bottom: 1px dotted;
  }

  b,
  strong {
    font-weight: bold;
  }

  dfn {
    font-style: italic;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  mark {
    background: #ff0;
    color: #000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  img {
    border: 0;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    height: 0;
  }

  pre {
    overflow: auto;
  }


  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit;
    font: inherit;
    margin: 0;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  input {
    line-height: normal;
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    box-sizing: content-box;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  legend {
    border: 0;
    padding: 0;
  }

  textarea {
    overflow: auto;
  }

  optgroup {
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  html{
    font-size: 16px;
    font-family: 'Titillium', sans-serif;
    ${breakpoint.s`
      font-size: 20px;
    `}
  }
`;
