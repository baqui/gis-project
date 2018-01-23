import React from 'react';
import styled from 'styled-components';

const Temps = ({ className, weather }) => (
  <div className={ className } >
    { weather.map( (day_weather, id) => {
      const day = day_weather.date.split(' ').slice(0, 2).join(' ');
      const medium = mediumTemperature( day_weather.high, day_weather.low );
      const temp = farenheitToCelcius( medium );
      return (
        <DayWrapper key={id} >
          <Temp>{ temp }°C</Temp>
          <DayData>{ day }</DayData>
        </DayWrapper>
      )
    })}
  </div>
);

export default styled( Temps )`
  height: 100%;
  border-left: 2px solid rgba(70, 12, 146, 1);
  background-color: white;
`

const DayWrapper = styled.div`
  height: 10%;
  box-sizing: border-box;
  border: 1px solid rgba(70, 12, 146, .5);
  position: relative;
  background-color: white;
  transition: background-color .3s;
  cursor: pointer;
  &:hover {
    background-color: rgba(70, 12, 146, .1);
  }
`

const Temp = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: 600;
`

const DayData = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: inline-block;
  text-align: center;
`

const mediumTemperature = ( min, max ) => ( min + max ) / 2;

const farenheitToCelcius = (temp) => (( temp - 32 ) * ( 5 / 9)).toFixed(1);
