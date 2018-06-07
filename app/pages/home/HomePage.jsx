import React, { PureComponent } from 'react';

import Controls from '../../containers/Controls/Controls';
import Map from '../../containers/Map/Map';
import Weather from '../../containers/Weather/Weather';
import Wiki from '../../containers/Wiki/Wiki';
import { connect } from 'react-redux';
import { displayWeatherPanel } from './duck/selectors';
import styled from 'styled-components';

const mapStateToProps = state => ({
  displayWeatherPanel: displayWeatherPanel(state)
});

const mapDispatchToProps = dispatch => ({});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        <Map fullWidth={false} />
        {/* <Map fullWidth={ this.props.displayWeatherPanel } /> */}
        {/* <Weather fullWidth={ this.props.displayWeatherPanel } /> */}
        <Controls />
        <Wiki />
      </div>
    );
  }
}
