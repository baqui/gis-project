import React from 'react';
import styled from 'styled-components';

import { getColorFromTemp, toFarenheit } from '../../utils/consts';

function* range(start, end, step) {
  while (start < end) {
    yield start;
    start += step;
  }
}

const TempRange = ({ className }) => (
  <div className={className}>
    {Array.from(range(12, 25, 0.1)).map((temp, i) => {
      const farenheitTemp = toFarenheit(temp);
      const color = getColorFromTemp(farenheitTemp, 40, 80);
      return (
        <span
          key={i}
          style={{
            backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`
          }}
        />
      );
    })}
  </div>
);

export default styled(TempRange)`
  width: 30px;
  background: white;
  position: absolute;
  left: 10px;
  bottom: 30px;
  span {
    display: block;
    height: 1px;
    width: 100%;
  }
`;
