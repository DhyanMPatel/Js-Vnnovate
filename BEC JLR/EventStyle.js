const eventStyle = (event, start, end, isSelected) => {
    const getRandomColor = () => {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
      return color;
    };
    const shadeColor = (color, percent) => {
      const f = parseInt(color.slice(1), 16);
      const t = percent < 0 ? 0 : 255;
      const p = percent < 0 ? percent * -1 : percent;
      const R = f >> 16;
      const G = (f >> 8) & 0x00ff;
      const B = f & 0x0000ff;
      return (
        "#" +
        (
          0x1000000 +
          (Math.round((t - R) * p) + R) * 0x10000 +
          (Math.round((t - G) * p) + G) * 0x100 +
          (Math.round((t - B) * p) + B)
        )
          .toString(16)
          .slice(1)
      );
    };
    const color = getRandomColor();
    const lighterShade = shadeColor(color, 30);
    const darkerShade = shadeColor(color, -30);
    const gradient = `linear-gradient(to right, ${lighterShade},  ${darkerShade})`;

    var style = {
      // backgroundColor: darkerShade,
      backgroundImage: gradient,
      borderRadius: "5px",
      opacity: 0.9,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };