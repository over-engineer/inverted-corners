/**
 * Inverted Corners (https://inverted-corners.netlify.app/)
 * @author over-engineer <dev@over-engineer.com>
 * @copyright 2021 over-engineer
 * @license MIT
 */
class InvertedCornersPainter {
  static get inputProperties() {
    return [
      '--corner-radius',
      '--background',
      'list-style-image',
    ];
  }

  /**
   * Return an array containing the radii of all four corners
   *
   * Take into account the shorthand syntax where the top-left
   * corner has the same radius as the bottom-right corner,
   * and the top-right corner has the same radius as the
   * bottom-left. All radii default to `0`
   *
   * @param {number[]} radii
   * @return {number[]}
   */
  _getRadii(radii) {
    const [a = 0, b = 0, c = 0, d = 0] = radii;

    if (radii.length === 2) {
      return [a, b, a, b];
    }

    return [a, b, c, d];
  }

  /**
   * Check whether the given corner is inverted or not
   *
   * A corner is inverted when its radius is a negative value
   *
   * @param {number} radius
   * @return {boolean}
   */
  _isInverted(radius) {
    return radius < 0;
  }

  paint(ctx, geom, properties) {
    // Read and clean up input properties
    const radii = properties
      .get('--corner-radius')
      .toString()
      .trim()
      .split(' ')
      .map((radius) => parseInt(radius));
    
    const gradProps = properties
      .get('--background')
      .toString()
      .split(',')
      .map((prop) => prop.trim());

    gradProps[0] = gradProps[0].replace('deg', '');

    /* Using `list-style-image` to workaround an issue where images
    * wouldn't load with custom image properties on Chrome/Opera/Edge */
    const image = properties.get('list-style-image');

    // Set default values for the gradient background
    let angle = 0;
    let colors = gradProps;

    // Check whether an angle was specified
    if (!isNaN(+gradProps[0])) {
      [angle, ...colors] = gradProps;
      angle = +angle;
    }

    // Set default radii and handle the `--corner-radius` shorthand syntax
    const [
      topLeft,
      topRight,
      bottomRight,
      bottomLeft,
    ] = this._getRadii(radii);

    // Calculate the maximum radius
    const maxInvRadius = Math.abs(Math.min(...radii, 0));

    // Set default color
    ctx.fillStyle = '#000';

    // Check if we a gradient background was specified
    if (colors.length >= 1) {
      // Convert degrees to radians
      angle = angle * Math.PI / 180;

      // Calculate the gradient length to fit diagonal
      const gradLength = Math.sqrt(geom.width ** 2 + geom.height ** 2) / 2;

      const x1 = geom.width / 2 - Math.cos(angle) * gradLength;
      const y1 = geom.height / 2 - Math.sin(angle) * gradLength;
      const x2 = geom.width / 2 + Math.cos(angle) * gradLength;
      const y2 = geom.height / 2 + Math.sin(angle) * gradLength;

      // Calculate the color stops step
      const step = 1 / (colors.length - 1);

      // Create the linear gradient
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);

      for (let i = 0; i < colors.length; i += 1) {
        // Input properties are given in `<color> <colorStop>` format
        const [color, colorStop] = colors[i].split(' ');

        // Default offset to equally distributed color stops
        let offset = i === colors.length - 1 ? 1 : i * step;

        if (colorStop) {
          // Override with custom color stop, if specified
          offset = colorStop;
        }

        grad.addColorStop(offset, color);
      }

      ctx.fillStyle = grad;
    }
    
    ctx.beginPath();

    // Draw the background
    if (this._isInverted(topLeft)) {
      ctx.moveTo(maxInvRadius - Math.abs(topLeft), 0);
    } else {
      ctx.moveTo(maxInvRadius + Math.abs(topLeft), 0);
    }

    ctx.quadraticCurveTo(maxInvRadius, 0, maxInvRadius, Math.abs(topLeft));

    ctx.lineTo(maxInvRadius, geom.height - Math.abs(bottomLeft));
    
    if (this._isInverted(bottomLeft)) {
      ctx.quadraticCurveTo(maxInvRadius, geom.height, maxInvRadius - Math.abs(bottomLeft), geom.height);
    } else {
      ctx.quadraticCurveTo(maxInvRadius, geom.height, maxInvRadius + Math.abs(bottomLeft), geom.height);
    }

    if (this._isInverted(bottomRight)) {
      ctx.lineTo(geom.width - maxInvRadius + Math.abs(bottomRight), geom.height);
    } else {
      ctx.lineTo(geom.width - maxInvRadius - Math.abs(bottomRight), geom.height);
    }

    ctx.quadraticCurveTo(geom.width - maxInvRadius, geom.height, geom.width - maxInvRadius, geom.height - Math.abs(bottomRight));

    ctx.lineTo(geom.width - maxInvRadius, Math.abs(topRight));

    if (this._isInverted(topRight)) {
      ctx.quadraticCurveTo(geom.width - maxInvRadius, 0, geom.width - maxInvRadius + Math.abs(topRight), 0);
    } else {
      ctx.quadraticCurveTo(geom.width - maxInvRadius, 0, geom.width - maxInvRadius - Math.abs(topRight), 0);
    }
    
    ctx.closePath();
    ctx.fill();

    // Draw the image, if one was specified
    if (image instanceof CSSImageValue) {
      ctx.clip();
      ctx.drawImage(image, 0, 0, geom.width, geom.height);
    }
  }
}

registerPaint('inverted-corners', InvertedCornersPainter);
