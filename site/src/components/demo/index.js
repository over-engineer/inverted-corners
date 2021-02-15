import React, { useState, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import Slider from '../slider';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    borderRadius: '24px',
    backgroundColor: ({ theme }) => theme.darkSecondary,
    border: ({ theme }) => `14px solid ${theme.darkTertiary}`,
    position: 'relative',
    marginTop: '80px',
  },
  leftColumn: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    width: '38.2%',
    borderLeft: ({ theme }) => `2px dashed ${theme.darkTertiary}`,
    padding: '20px',
  },
  preview: {
    width: '300px',
    height: '300px',
    backgroundColor: ({ theme }) => theme.darkTertiary,
  },
  object: {
    width: '300px',
    height: '300px',
    backgroundImage: 'paint(inverted-corners)',
    '--background': ({ theme }) => `90deg, ${theme.brightPrimary}, ${theme.brightTertiary}`,
  },
  controls: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  blob: {
    position: 'absolute',
    top: '-64px',
    left: '50%',
    width: '120px',
    height: '50px',
    marginLeft: '-60px',
    backgroundColor: ({ theme }) => theme.darkTertiary,
    '--corner-radius': '30 30 -30 -30',
    '-webkit-mask-image': 'paint(inverted-corners)',
  },
});

const Demo = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [topLeft, setTopLeft] = useState(-60);
  const [topRight, setTopRight] = useState(40);
  const [bottomRight, setBottomRight] = useState(-60);
  const [bottomLeft, setBottomLeft] = useState(40);

  useEffect(() => {
    // Initialize the Houdini Paint worklet
    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('https://unpkg.com/inverted-corners/lib/inverted-corners-worklet.min.js');
    } else {
      console.warn('Houdini\'s Paint Worklet is not supported on your browser.');
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.leftColumn}>
        <div className={classes.preview}>
          <div className={classes.object} style={{
            '--corner-radius': `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`,
          }}></div>
        </div>
      </div>
      <div className={classes.rightColumn}>
        <div className={classes.controls}>
          <Slider min={-80} max={80} initialValue={topLeft} onChange={setTopLeft} />
          <Slider min={-80} max={80} initialValue={topRight} onChange={setTopRight} />
          <Slider min={-80} max={80} initialValue={bottomRight} onChange={setBottomRight} />
          <Slider min={-80} max={80} initialValue={bottomLeft} onChange={setBottomLeft} />
        </div>
      </div>
      <div className={classes.blob}></div>
    </div>
  );
};

export default Demo;
