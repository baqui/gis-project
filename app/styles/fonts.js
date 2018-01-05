import titiliumLight_woff2 from '../assets/fonts/TitilliumWeb-Light.woff2';
import titiliumLight_woff from '../assets/fonts/TitilliumWeb-Light.woff';
import titiliumLight_ttf from '../assets/fonts/TitilliumWeb-Light.ttf';

import titiliumBold_woff2 from '../assets/fonts/TitilliumWeb-Bold.woff2';
import titiliumBold_woff from '../assets/fonts/TitilliumWeb-Bold.woff';
import titiliumBold_ttf from '../assets/fonts/TitilliumWeb-Bold.ttf';


export const fontsDefinition = `
  @font-face { //Titillium-Light
    font-family: 'Titillium';
    font-style: normal;
    font-weight: 300;
    src: url('${titiliumLight_woff2}') format('woff2'),
         url('${titiliumLight_woff}') format('woff'),
         url('${titiliumLight_ttf}') format('truetype');
  }

  @font-face { //Titillium-Bold
    font-family: 'Titillium';
    font-style: normal;
    font-weight: 600;
    src: url('${titiliumBold_woff2}') format('woff2'),
         url('${titiliumBold_woff}') format('woff'),
         url('${titiliumBold_ttf}') format('truetype');
  }
`;
