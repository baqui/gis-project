import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Polygon } from "react-google-maps";

import {
    getGridTemperatureData
} from '../duck/actions';
import {
    getMapViewport,
    getMapZoom,
    getMapGrid
} from '../duck/selectors';

import { MAP_MODES } from '../../../utils/consts';
import { POLYGON_COLORS } from '../duck/consts';
import { WIZARD_MAP_SHAPE_SETTINGS } from '../duck/consts';

const mapStateToProps = state => ({
    viewport: getMapViewport(state),
    zoom: getMapZoom(state),
    grid: getMapGrid(state)
});

const mapDispatchToProps = dispatch => ({
    getGridTemperatureData: (zoom, viewport) => dispatch(getGridTemperatureData(zoom,viewport))
});

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Polygons extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.viewport !== nextProps.viewport ){
            const { zoom, viewport } = nextProps;
            this.props.getGridTemperatureData(zoom, viewport);
        }
    }

    render() {
        const { grid } = this.props;

        return grid.map((feature, index) => {
            console.log("FEATURE",feature);
            return (
                feature && (
                    <Polygon
                        key={index}
                        paths={feature.coordinates}
                        options={{
                            ...WIZARD_MAP_SHAPE_SETTINGS,
                            fillColor: this.polygonFillColor(feature.cartodb_id)
                        }}
                    />
                )
            );
        });
    }

    mapTemp2Transparency = (mode) => {
        //TODO map polygons tems and transparency
    }

    polygonFillColor = (id) => {
        return "rgba(255, 0, 0, .7)";
    }
}
