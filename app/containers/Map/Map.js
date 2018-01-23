import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MapWrapper from './components/MapWrapper';
import { grid } from '../../styles/grid';

const Container = <div style={{height: '100%', width: '100%'}} />;

class Map extends PureComponent {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className={ this.props.className } >
        <MapWrapper
          loadingElement={ Container }
          containerElement={ Container }
          mapElement={ Container }
        />
      </div>
    )
  }
}
export default styled( Map )`
  box-sizing: border-box;
  height: calc(100vh - 90px);
  ${ props => console.log(props)}
  ${ grid.breakpoints({ df: 11}, 12, '0px') };
  ${ props => props.fullWidth ? grid.breakpoints({ df: 11}, 12, '0px') : grid.breakpoints({ df: 12}, 12, '0px')  };

`
