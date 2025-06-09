import React from 'react';

function Card({ title, description, buttonText, image }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
      )}
      <h2 className="text-xl font-semibold mb-2 my-10">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
        {buttonText}
      </button>
    </div>
  );
}

export default Card;
