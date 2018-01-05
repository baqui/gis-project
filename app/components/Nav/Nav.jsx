import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NavListStyled } from './NavList';
import LogoImg from '../../assets/images/logo-placeholder.png';
import { breakpoint } from '../../styles/grid';


export default class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      active: false,
    }

    this.toggleMobileNavigation = this.toggleMobileNavigation.bind(this);
  }

  render(){
    return(
      <Navigation>
        <NavBrandWrapper>
          <NavBrand to='/'>
            <img src={LogoImg} alt="temporary project logo" />
          </NavBrand>
        </NavBrandWrapper>
        <NavListStyled links={this.props.links} active={this.state.active} />
      </Navigation>
    )
  }

  toggleMobileNavigation(){
    this.setState({ active: !this.state.active });
  }
}

const NavBrandWrapper = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  z-index: 20;
  background: linear-gradient(to right,  ${ props => props.theme.colors.menuBase },  ${ props => props.theme.colors.menuSecond });
  ${ breakpoint.m`
    background: none;
  `}
`;

const NavBrand = styled(Link)`
  width: 100%;
  img {
    display: inline-block;
    max-height: 40px;
    padding: 5px 0 5px 20px;
    ${ breakpoint.m`
      max-height: 70px;
      margin-left: 65px;
    `}
  }
`;

const Navigation = styled.nav`
  width: 100%;
  position: relative;
  top: 0;
  z-index: 20;
  ${ breakpoint.m`
    background: linear-gradient(to right,  ${ props => props.theme.colors.menuBase },  ${ props => props.theme.colors.menuSecond });
  `}
`;
