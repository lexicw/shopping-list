"use client";

import React, { useState } from 'react';

const AddItemForm = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex items-center my-6 w-full">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new item"
        className="px-4 py-3 w-full text-md rounded-md focus:ring focus:ring-sky-200 me-1 outline outline-1 outline-gray-400 focus:outline focus:outline-sky-500 focus:transition-all"
      />
      <button type="submit" className="bg-sky-300 px-4 py-2 text-3xl hover:bg-sky-400 w-24 text-white rounded-md">+</button>
      </div>
    </form>
  );
};

export default AddItemForm;