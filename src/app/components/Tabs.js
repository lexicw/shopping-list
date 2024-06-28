// src/components/Tabs.js
"use client";

import React, { useState } from 'react';

const Tabs = ({ tabs, addList, updateListName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (index, label) => {
    setEditIndex(index);
    setEditValue(label);
  };

  const handleBlur = (index) => {
    updateListName(index, editValue);
    setEditIndex(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleBlur(index);
    }
  };

  return (
    <div>
      <div className="tab-buttons flex items-center">
        {tabs.map((tab, index) => (
          <div key={index} className="">
            {editIndex === index ? (
                <div className='bg-white'>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleBlur(index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                className={`tab-input text-xl xl:text-2xl font-bold py-3 px-6 w-fit box-border
                  ${activeTab === index ? 'border-l-8 border-indigo-500' : 'border-l-8 border-gray-300 opacity-40'}`}
                autoFocus
              />
              </div>
            ) : (
              <button
                className={`tab-button text-xl xl:text-2xl font-bold bg-white w-fit py-3 px-6 
                  ${activeTab === index ? 'border-l-8 border-indigo-500' : 'border-l-8 border-gray-300 opacity-40'}`}
                onClick={() => setActiveTab(index)}
                onDoubleClick={() => handleDoubleClick(index, tab.label)}
              >
                {tab.label}
              </button>
            )}
          </div>
        ))}
        <button
          className='inline-block px-6 text-4xl'
          onClick={addList}
        >
          +
        </button>
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
