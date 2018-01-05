import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavLinkStyled } from './NavLink';
import { breakpoint } from '../../styles/grid';

const NavList = ({className, links, active}) => (
  <div id="main-navigation" className={className} >
    <ul>
      { links.map( (link, index) => ( <NavLinkStyled {...link} key={index} active={active} /> ) ) }
    </ul>
  </div>
)

export const NavListStyled = styled(NavList)`
  display: block;
  max-height: 0;
  overflow: hidden;
  transition: all .3s;
  ${props => props.isActive && `
    max-height: 1000px;
    transition: all .7s;
  `}
  ${ breakpoint.m`
    max-height: none;
    overflow: inherit;
    display: inline-block;
    position: absolute;
    z-index: 21;
    top: 37px;
    right: 65px;
    transform: translateY(-40%);
  `}
`;

NavList.propTypes = {
  active: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
}

NavList.defaultProps = {
  className: ''
}
