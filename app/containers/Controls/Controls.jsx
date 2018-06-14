import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { mapModeSet } from './duck/actions';
import { getCurrentMode } from './duck/selectors';
import { MAP_MODES } from '../../utils/consts'

const mapStateToProps = (state) => ({
  mode: getCurrentMode(state)
});
const mapDispatchToProps = (dispatch) => ({
  setMapMode: (mode) => dispatch( mapModeSet(mode) )
});

@connect(mapStateToProps, mapDispatchToProps)
class Controls extends PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={ this.props.className }>
        <StyledIcon 
          name='grid_on'
          title='siatka temperatur'
          onClick={this.handleClick.bind(this, MAP_MODES.temperatureGrid)}
          active={this.isActive(MAP_MODES.temperatureGrid)}
        />
        <StyledIcon
          name='ac_unit'
          title='temperatura'
          onClick={ this.handleClick.bind(this, MAP_MODES.temperature) }
          active={ this.isActive( MAP_MODES.temperature ) } />
        <StyledIcon
          name='visibility'
          title='widoczność'
          onClick={ this.handleClick.bind(this, MAP_MODES.visibility) }
          active={ this.isActive( MAP_MODES.visibility ) } />
        <StyledIcon
          name='get_app'
          title='ciśnienie'
          onClick={ this.handleClick.bind(this, MAP_MODES.pressure) }
          active={ this.isActive( MAP_MODES.pressure ) } />
        <StyledIcon
          name='beach_access'
          title='prędkość wiatru'
          onClick={ this.handleClick.bind(this, MAP_MODES.wind) }
          active={ this.isActive( MAP_MODES.wind ) } />
      </div>
    )
  }

  isActive( mode ){
    return this.props.mode === mode;
  }

  handleClick(mode){
    this.props.setMapMode(mode);
  }
}

export default styled( Controls )`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 20;
`

const Icon = ({ className, name, title, onClick }) => (
  <span className={ className } title={ title } onClick={ onClick } >
    <i className="material-icons">{ name }</i>
  </span>
)

const StyledIcon = styled(Icon)`
  cursor: pointer;
  color: ${ props => props.active ? 'white' : 'rgba(204,204,204,.8)' };
  padding: 0 .5rem;
  position: relative;
  transition: all .3s;
  border-bottom: 2px solid ${ props => props.active ? 'rgb(128, 42, 240)' : 'transparent' };
  box-shadow: 0 9px 8px -6px ${ props => props.active ? 'rgba(128, 42, 240, .5)' : 'transparent' };
  i {
    font-size: 45px;
  }
  &:hover{
    color: white;
  }
`
