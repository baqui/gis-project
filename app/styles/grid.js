import { css } from 'styled-components'

const breakpoints = {
  df:  '0px',
  xs:  '480px',
  s:   '667px',
  m:   '1024px',
  xm:  '1160px',
  l:   '1280px',
  xl:  '1680px',
}

export const breakpoint = Object.keys(breakpoints).reduce( (acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
      ${ css(...args) }
    }
  `
  return acc;
}, {});

// TODO js functional grid function

const DEFAULT_GRID_GUTTER = '20px',
      DEFAULT_GRID_COLUMNS = 12,
      GRID_BREAKPOINTS = ['df', 'xs', 's', 'm', 'xm', 'l', 'xl'];


export const grid = {

  collapse: ( gutter = DEFAULT_GRID_GUTTER ) => (
    css`
      margin-left: -${gutter};
      margin-right: -${gutter};
      width: calc( 100% + gutter + gutter );
    `
  ),
  container: () => (
    css`
      &::after {
        clear: both;
        content: '';
        display: block;
      }
    `
  ),
  breakpoints: ( grid, columns = DEFAULT_GRID_GUTTER, gutter = DEFAULT_GRID_COLUMNS) => (
    GRID_BREAKPOINTS.map( point => {
      if( grid[point] ){
        let column = grid[point] / columns,
            ratio = 1 + column,
            unit = gutter.replace(/[0-9]/g, ''),
            unitlessGutter = gutter.replace(/[a-z]/g, '');
        return breakpoint[point]`
          width: calc( ${column * 100}% - ${parseFloat(unitlessGutter) * ratio}${unit} );
          float: left;
          margin-left: ${gutter};
        `
      }
    }).filter( styles => styles ).join('').replace(/[,]/g, '')
  )

}
