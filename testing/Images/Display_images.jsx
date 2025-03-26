import React from "react";

const ImageGrid = () => {
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-4 p-5 bg-white shadow-md rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-32 h-32 overflow-hidden rounded-lg shadow"
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => window.open(src, "_blank")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
