import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getWikiForChosenVoivodeship } from './duck/selectors';

const mapStateToProps = (state) => ({
  wiki: getWikiForChosenVoivodeship(state)
});
const mapDispatchToProps = (dispatch) => ({});

@connect(mapStateToProps, mapDispatchToProps)
class Wiki extends PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    const wiki = this.props.wiki;
    return(
      <div className={ this.props.className }>
        { wiki && <WikiWrapper>
          <Header>{ wiki.name }</Header>
          <Row><span>Stolica:</span> { wiki.capital }</Row>
          <Row><span>Wojewoda:</span>{ wiki.voivode }</Row>
          <Row><span>Marszałek:</span>{ wiki.marshal }</Row>
          <Row><span>Powierzchnia:</span>{ wiki.area }</Row>
          <Row><span>Populacja:</span>{ wiki.population }</Row>
          <Row><span>Gęstość zaludnienia:</span>{ wiki.density }</Row>
          <Row><span>Urbanizacja:</span>{ wiki.urbanization }</Row>
          <Row><span>Tablice rejestracyjne:</span>{ wiki.registration_plate }</Row>
          <Description dangerouslySetInnerHTML={{ __html: wiki.short_description }} />
        </WikiWrapper> }
      </div>
    )
  }
}

export default styled( Wiki )`

`

const WikiWrapper = styled.div`
  height: 250px;
  width: 300px;
  position: absolute;
  top: 100px;
  left: 10px;
  background: white;
  z-index: 20;
  border: 2px solid rgba(70, 12, 146, 1);
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Header = styled.h2`
  font-size: 1rem;
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 9px 0;
  background-color: rgba(96, 33, 180, .5);
  color: white;
`

const Description = styled.p`
  font-size: 17px;
  box-sizing: border-box;
  padding: 2px 10px;
`

const Row = styled.div`
  font-size: 17px;
  display: inline-block;
  width: 100%;
  position: relative;
  padding: 2px 10px;
  box-sizing: border-box;
  span {
    font-weight: 600;
    margin-right: 8px;
    display: inline-block;
  }
  &:after {
    content: '';
    width: 100%;
    display: block;
    height: 1px;
    background-color: rgba(70, 12, 146, .2);
    bottom: -1px;
    left: 0;
    box-sizing: border-box;
  }
`
