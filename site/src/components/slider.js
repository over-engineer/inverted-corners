import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles({

});

const Slider = (props) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const {
    min = 0,
    max = 100,
    step = 1,
    initialValue = 0,
    onChange = () => {},
  } = props;

  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
      }}
    />
  );
};

export default Slider;
