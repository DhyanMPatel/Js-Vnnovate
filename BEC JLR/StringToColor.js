// String will be name of person
function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }


// HSL-based Approach

// Advantages:
    // More control over brightness and saturation
    // All colors are visually distinct and pleasant

function stringToHSLColor(str, saturation = 70, lightness = 50) {
    let hash = 0;
  
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const hue = hash % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  