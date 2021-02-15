import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Emoji from '../emoji';

const useStyles = createUseStyles({
  docs: {
    marginTop: '40px',
  },
  warning: {
    margin: '20px 0',
    padding: '16px',
    borderLeft: ({ theme }) => `4px solid ${theme.brightTertiary}`,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    margin: 0,
  },
  code: {

  },
  link: {
    color: ({ theme }) => theme.brightPrimary,
    textDecoration: 'none',
    '&:hover': {
      color: ({ theme }) => theme.brightTertiary,
    },
  },
});

const Docs = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.docs}>
      <h2>Getting started</h2>
      <div className={classes.warning}>
        <p className={classes.text}>
          <Emoji symbol="🧪" label="test tube" />
          &nbsp;
          Please remember this is experimental and may not work in all browsers.
        </p>
      </div>

      <p>
        Add the following to your HTML to include <strong>Inverted Corners</strong> using <a href="https://unpkg.com/" className={classes.link} rel="noreferrer" target="_blank">unpkg</a>.
      </p>
      <p>
        <SyntaxHighlighter language="html" style={dracula}>
          {`<script src="https://unpkg.com/inverted-corners/inverted-corners.min.js"></script>`}
        </SyntaxHighlighter>
      </p>
      
      <p>That’s it!</p>
      <p>
        For more advanced setups (including the worklet yourself, adding the paint module in a React app etc), read the <a href="https://github.com/over-engineer/inverted-corners" className={classes.link} rel="noreferrer" target="_blank">README</a>.
      </p>
      
      <h3>Check support</h3>
      <p>To check if a browser supports the Paint API via JavaScript:</p>
      <p>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {`if ('paintWorklet' in CSS) {
    // Browser supports paint worklets, add the module
    CSS.paintWorklet.addModule('https://unpkg.com/inverted-corners/inverted-corners-worklet.min.js');
} else {
    console.warn('Paint Worklet is not supported on your browser.');
}`}
        </SyntaxHighlighter>
      </p>
      <p>To check if a browser supports the Paint API via CSS:</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`@supports (background: paint(something)) {
    /* Browser supports paint worklets, do something here */
}`}
        </SyntaxHighlighter>
      </p>

      <h2>Usage</h2>
      <p>You can access the paint worklet with either <code>background: paint(inverted-corners);</code> or <code>-webkit-mask-image: paint(inverted-corners);</code></p>

      <h3>Corners</h3>
      <p>You can set the radius of each corner using the <code>--corner-radius</code> property.</p>
      <p>It uses a shorthand syntaxt similar to the native <code>border-radius</code> property.</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--corner-radius: <top-left> <top-right> <bottom-right> <bottom-left>;`}
        </SyntaxHighlighter>
      </p>
      <p>For example,</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--corner-radius: 20 20 -20 -20;`}
        </SyntaxHighlighter>
      </p>
      <p>Positive values produce normal corners (similar to the <code>border-radius</code> property), while <strong>negative values produce inverted corners</strong>.</p>

      <h3>Backgrounds</h3>

      You can set the background using the <code>--background</code> property.

      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--background: #fff;`}
        </SyntaxHighlighter>
      </p>

      <p>To add a shadow, use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow()" className={classes.link} rel="noreferrer" target="_blank"><code>filter: drop-shadow()</code></a> instead of <code>box-shadow</code>.</p>

      <p>You can also use gradients! Just set multiple colors separated with a comma.</p>

      <h4>Basic gradient</h4>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--background: cyan, purple;`}
        </SyntaxHighlighter>
      </p>

      <h4>Tri-color gradient</h4>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--background: #879af2, #d3206b, #fda000;`}
        </SyntaxHighlighter>
      </p>

      <h4>Color stops</h4>
      <p>To set a custom color stop, use the following format:</p>
      <p>
        <SyntaxHighlighter style={dracula}>
          {`<color> <color-stop>`}
        </SyntaxHighlighter>
      </p>
      <p>where <code>{`<color-stop>`}</code> is a number between <code>0.0</code> and <code>1.0</code>.</p>
      <p>For example,</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--background: #879af2, #d3206b 0.2, #fda000;`}
        </SyntaxHighlighter>
      </p>

      <h4>Angles</h4>
      <p>To set a custom angle, add the rotation (in degrees) as the first parameter:</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`--background: 90deg, cyan, purple;`}
        </SyntaxHighlighter>
      </p>

      <h3>Masks</h3>
      <p>You can also use the <code>mask-image</code> (and the prefixed <code>-webkit-mask-image</code>) property to apply a mask and <em>reshape</em> an element.</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`-webkit-mask-image: paint(inverted-corners);
mask-image: paint(inverted-corners);`}
        </SyntaxHighlighter>
      </p>
      <p>When using masks, you can apply a background with the regular <code>background</code>, <code>background-color</code>, and <code>background-image</code> CSS properties.</p>
      <p>Keep in mind, that while this method is really useful in some cases, you'll lose the ability to add shadows to the element.</p>

      <h3>Images</h3>
      <p>To set an image as the background of the element, you can use the <code>list-image-type</code> property. This is necessary to workaround an issue where images wouldn't load with custom image properties on Chrome/Opera/Edge.</p>
      <p>
        <SyntaxHighlighter language="css" style={dracula}>
          {`list-style-image: url(YOUR_IMAGE);`}
        </SyntaxHighlighter>
      </p>

      <h2>Examples</h2>
      <p>Coming soon.</p>

      {/* codepen embedded example #1 */}
      {/* codepen embedded example #2 */}
      {/* codepen embedded example #3 */}

      <h2>Bugs & Features</h2>
      <p>If you have spotted any bugs, or would like to request additional features from the library, please <a href="https://github.com/over-engineer/inverted-corners/issues" className={classes.link} rel="noreferrer" target="_blank">file an issue</a>.</p>

      <h2>License</h2>
      <p>
        The MIT License, check the
        {` `}
        <a href="https://github.com/over-engineer/inverted-corners/blob/master/LICENSE" className={classes.link} rel="noreferrer" target="_blank">LICENSE</a>
        {` `}
        file.
      </p>
    </div>
  );
};

export default Docs;
