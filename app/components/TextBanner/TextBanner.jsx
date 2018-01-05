import React from 'react';
import styled from 'styled-components';

const Banner = styled.section`
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;
  background-color: ${props => props.theme.colors.backgroundTable};
`;

const Header = styled.h1`
  text-align: center;
  width: 100%;
  display: inline-block;
  font-size: 2.8rem;
  position: absolute;
  color: ${props => props.theme.colors.label};
  text-transform: uppercase;
  top: 40%;
  left: 0;
  transform: translateY(-50%);
`;

export const TextBanner = ({ title }) => (
  <Banner>
    <Header>{title}</Header>
  </Banner>
);
