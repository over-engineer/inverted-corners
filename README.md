<p align="center">
    <img width="128" height="128" src="https://raw.githubusercontent.com/over-engineer/inverted-corners/master/site/src/images/logo.svg" />
</p>

# Inverted Corners
[![npm](https://img.shields.io/npm/v/inverted-corners.svg)](https://www.npmjs.com/package/inverted-corners)
[![NPM](https://img.shields.io/npm/l/inverted-corners.svg)](https://github.com/over-engineer/inverted-corners/blob/master/LICENSE)

🎨 A Houdini Paint worklet for inverted corners.

## Table of Contents

* [Setup](#-setup)
    * [Standalone](#standalone)
    * [Worklet](#worklet)
    * [Check support](#check-support)
* [Usage](#-usage)
    * [Properties](#properties)
    * [Corners](#corners)
    * [Backgrounds](#backgrounds)
        * [Basic gradient](#basic-gradient)
        * [Tri-color gradient](#tri-color-gradient)
        * [Color stops](#color-stops)
        * [Angles](#angles)
    * [Masks](#masks)
    * [Images](#images)
* [Examples](#-examples)
* [Bugs & Features](#-bugs-features)
* [License](#-license)

## 📦 Setup

🧪 Please remember this is **experimental** and may not work in all browsers. [Is Houdini ready yet?](https://ishoudinireadyyet.com/)

### Standalone

Add the following to your HTML to include **Inverted Corners** using [unpkg](https://unpkg.com/).

```html
<script src="https://unpkg.com/inverted-corners/lib/inverted-corners.min.js"></script>
```

Omit the version number to use the latest version, or use a specific one:

```html
<script src="https://unpkg.com/inverted-corners@1.1.0/lib/inverted-corners.min.js"></script>
```

That's it! Read the [Usage](#-usage) section to learn how to access the paint worklet.

### Worklet

If you want to include the worklet yourself, you can add the paint module like this:

```javascript
CSS.paintWorklet.addModule('https://unpkg.com/inverted-corners/lib/inverted-corners-worklet.min.js');
```

For example, in a React app you could execute this on the component mount:

```jsx
import React, { useEffect } from 'react';

const MyComponent = () => {
    useEffect(() => {
        if ('paintWorklet' in CSS) {
            CSS.paintWorklet.addModule('https://unpkg.com/inverted-corners/lib/inverted-corners-worklet.min.js');
        }
    }, []);

    return (
        {/* some content here */}
    );
};

export default MyComponent;
```

### Check support

To check if a browser supports the Paint API via JavaScript:

```javascript
if ('paintWorklet' in CSS) {
    // Browser supports paint worklets, add the module here
} else {
    console.warn('Houdini\'s Paint Worklet is not supported on your browser.');
}
```

To check if a browser supports the Paint API via CSS:

```css
@supports (background: paint(something)) {
    /* Browser supports paint worklets, do something here */
}
```

## ⌨️ Usage

Once you're done with the [Setup](#-setup), you can immediately access the paint worklet with either `background: paint(inverted-corners);` or `-webkit-mask-image: paint(inverted-corners);`

### Properties

There are three input properties for the paint worklet:

| Property              | Description                                       |
| --------------------- | ------------------------------------------------- |
| `--corner-radius`     | The radii of the four corners                     |
| `--background`        | A color or a gradient to use as the background    |
| `list-style-image`    | An image to use as the background                 |

### Corners

You can set the radius of each corner using the `--corner-radius` property.

It uses a shorthand syntaxt similar to the native `border-radius` property.

```css
--corner-radius: <top-left> <top-right> <bottom-right> <bottom-left>;
```

For example,

```css
--corner-radius: 20 20 -20 -20;
```

Positive values produce normal corners (similar to the `border-radius` property), while **negative values produce inverted corners**.

### Backgrounds

You can set the background using the `--background` property.

For example,

```css
--background: #fff;
```

To add a shadow, use [`filter: drop-shadow()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow()) instead of `box-shadow`.

You can also use gradients! Just set multiple colors separated with a comma.

#### Basic gradient

```
--background: cyan, purple;
```

#### Tri-color gradient

```
--background: #879af2, #d3206b, #fda000;
```

#### Color stops

To set a custom color stop, use the following format:

```
<color> <color-stop>
```

where `<color-stop>` is a number between `0.0` and `1.0`.

For example,

```
--background: #879af2, #d3206b 0.2, #fda000;
```

#### Angles

To set a custom angle, add the rotation (in degrees) as the first parameter:

```
--background: 90deg, cyan, purple;
```

### Masks

You can also use the `mask-image` (and the prefixed `-webkit-mask-image`) property to apply a mask and _reshape_ an element.

```css
-webkit-mask-image: paint(inverted-corners);
mask-image: paint(inverted-corners);
```

When using masks, you can apply a background with the regular `background`, `background-color`, and `background-image` CSS properties.

Keep in mind, that while this method is really useful in some cases, you'll lose the ability to add shadows to the element.

### Images

To set an image as the background of the element, you can use the `list-image-type` property. This is necessary to workaround an issue where images wouldn't load with custom image properties on Chrome/Opera/Edge.

```css
list-style-image: url(YOUR_IMAGE);
```

## 📙 Examples

Take a look at the following examples:

* [Browser tab](https://codepen.io/)
* [Navbar menu](https://codepen.io/)
* [Instant messaging](https://codepen.io/)

## 🐞 Bugs & Features

If you have spotted any bugs, or would like to request additional features from the library, please [file an issue](https://github.com/over-engineer/inverted-corners/issues).

## 📖 License

The MIT License, check the `LICENSE` file.
