import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { breakpoint } from '../../styles/grid';

const NavLink = ({ url, title, className, name, internal }) => (
  <li className={className}>
    {
      internal ?
        <Link to={url} title={title} className={className}>
          <span>{name}</span>
        </Link>
        :
        <a href={url} title={title} className={className}>
          <span>{name}</span>
        </a>
    }
  </li>
);

export const NavLinkStyled = styled(NavLink)`
  width: 100%;
  display: block;
  text-align: center;
  ${ breakpoint.m`
    display: inline-block;
    width: auto;
    text-align: left;
  `}

   > a {
    display: inline-block;
    width: 100%;
    line-height: ${ (props) => props.theme.fonts.rythm.minorSeventh};
    font-size: 1.2rem;
    padding: .45rem 0;
    background-color: rgba(40,32,54, .75);
    color: #f2f2f2;
    border-bottom: 1px solid rgb(78, 120, 155);

    ${breakpoint.m`
      background-color: transparent;
      border-bottom: none;
      padding: .85rem .75rem;
      font-size: .95rem;
      transition: color .3s;
      span {
        display: inline-block;
        border-bottom: 2px solid transparent;
        padding-bottom: 2px;
      }
    `}

    &:hover{
      color: #B0D0EC;
      span {
        border-bottom: 2px solid #ed7626;
      }
    }
  }

  ${props => props.isActive && `
    > a {
      > span {
        border-bottom: 2px solid #ed7626;
      }
    }
  `}
`;

NavLinkStyled.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string,
  internal: PropTypes.bool
}

NavLinkStyled.defaultProps = {
  title: '',
  internal: true
};
