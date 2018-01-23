import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { grid } from '../../styles/grid';

import { getWeatherForChosenVoivodeship } from './duck/selectors';

import Temps from './components/Temps';

const mapStateToProps = (state) => ({
  weather: getWeatherForChosenVoivodeship(state)
});
const mapDispatchToProps = (dispatch) => ({});

@connect(mapStateToProps, mapDispatchToProps)
class Weather extends PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className={ this.props.className }>
        { this.props.weather && <Temps weather={ this.props.weather } /> }
      </div>
    )
  }
}

export default styled( Weather )`
  height: calc(100vh - 90px);
  ${ props => props.fullWidth ? grid.breakpoints({ df: 1}, 12, '0px') : 'display: none' };
`
