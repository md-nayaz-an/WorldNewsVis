function getGradientColor(value) {
  // Ensure value is within the range of -1 to 1
  value = Math.min(1, Math.max(-1, value));

  let red, green;

  if (value <= -0.2) {
    red = 255;
    green = 0;
  } else if (value >= 0.2) {
    red = 0;
    green = 255;
  } else {
    // Calculate the green and red components within the -0.2 to 0.2 range
    const adjustedValue = (value + 0.2) / 0.4;
    green = Math.floor(255 * adjustedValue);
    red = Math.floor(255 * (1 - adjustedValue));
  }

  // Convert to hexadecimal format
  green = green.toString(16).padStart(2, '0');
  red = red.toString(16).padStart(2, '0');

  // Create the RGB color string
  const color = `#${red}${green}00`;

  return color;
}

export default getGradientColor;
