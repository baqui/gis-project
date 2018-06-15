import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Polygon } from 'react-google-maps';
import { getColorFromTemp, toFarenheit } from '../../../utils/consts';

import { getGridTemperatureData } from '../duck/actions';
import {
  getMapViewport,
  getMapZoom,
  getMapGrid,
  getCurrentMode,
  getGridModeSet
} from '../duck/selectors';

import { MAP_MODES } from '../../../utils/consts';
import { GRID_MAP_SHAPE_SETTINGS } from '../duck/consts';

const mapStateToProps = state => ({
  viewport: getMapViewport(state),
  zoom: getMapZoom(state),
  grid: getMapGrid(state),
  mode: getCurrentMode(state),
  gridModeSet: getGridModeSet(state)
});

const mapDispatchToProps = dispatch => ({
  getGridTemperatureData: (zoom, viewport) =>
    dispatch(getGridTemperatureData(zoom, viewport))
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Polygons extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { pristine: true };
  }

  componentWillReceiveProps(nextProps) {
    const viewportChanged = this.props.viewport !== nextProps.viewport;
    const isGridMode = nextProps.gridModeSet;
    const isPristine = this.state.pristine || !this.props.grid.length;

    if ((viewportChanged && isGridMode) || isPristine) {
      const { zoom, viewport } = nextProps;
      this.props.getGridTemperatureData(zoom, viewport);
      isPristine && this.setState({ pristine: false });
    }
  }

  render() {
    const { grid, gridModeSet } = this.props;

    return (
      gridModeSet &&
      grid.map((feature, index) => {
        return (
          feature && (
            <Polygon
              key={index}
              paths={feature.coordinates}
              options={{
                ...GRID_MAP_SHAPE_SETTINGS,
                fillColor: this.polygonFillColor(feature)
              }}
            />
          )
        );
      })
    );
  }

  polygonFillColor = data => {
    let color;
    switch (this.props.mode) {
      case MAP_MODES.temperature:
        color = data.temp
          ? getColorFromTemp(toFarenheit(data.temp), 40, 80)
          : [0, 0, 0];
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
          data.temp ? 0.7 : 0
        })`;
      case MAP_MODES.visibility:
        color = data.visibility
          ? getColorFromTemp(data.visibility, 20, 30)
          : [0, 0, 0];
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
          data.visibility ? 0.7 : 0
        })`;
      case MAP_MODES.pressure:
        color = data.pressure
          ? getColorFromTemp(data.pressure, 32000, 35000)
          : [0, 0, 0];
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
          data.pressure ? 0.7 : 0
        })`;
      case MAP_MODES.wind:
        color = data.wind_speed
          ? getColorFromTemp(data.wind_speed, 0, 40)
          : [0, 0, 0];
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
          data.wind_speed ? 0.7 : 0
        })`;
    }
  };
}
