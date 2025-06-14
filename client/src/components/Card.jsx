import React from 'react';

function Card({ title, description, buttonText, image }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-bold text-red-600 mb-3">{title}</h2>
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">{description}</p>
      <button className="mt-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition">
        {buttonText}
      </button>
    </div>
  );
}

export default Card;
