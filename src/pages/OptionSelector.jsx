import React from "react";

const OptionSelector = () => {
  return (
    <div className="items-center justify-center">
      {/* Container for the buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* Camera Button */}
        <button className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center text-blue-700 text-xl">
          Camera
        </button>

        {/* Heart Button */}
        <button className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center text-pink-700 text-xl">
          Heart
        </button>

        {/* Smily Face Button */}
        <button className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center text-yellow-500 text-xl">
          Smily
        </button>

        {/* Health Button */}
        <button className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center text-green-700 text-xl">
          Health
        </button>
      </div>
    </div>
  );
};

export default OptionSelector;
