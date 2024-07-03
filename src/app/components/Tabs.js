// src/components/Tabs.js
"use client";

import React, { useState, useEffect, useRef } from 'react';

const Tabs = ({ tabs, addList, updateListName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const tabButtonsRef = useRef(null);

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

  const handleAddList = () => {
    addList();
    // Scroll to the end after a new list is added
    setTimeout(() => {
      if (tabButtonsRef.current) {
        tabButtonsRef.current.scrollTo({
          left: tabButtonsRef.current.scrollWidth,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  useEffect(() => {
    const ele = tabButtonsRef.current;
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    ele.addEventListener('mousedown', mouseDownHandler);

    return () => {
      ele.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);

  return (
    <div>
      <div ref={tabButtonsRef} className="tab-buttons flex items-center overflow-x-scroll">
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
                  className={`tab-input text-xl font-bold py-3 px-6 w-fit box-border
                    ${activeTab === index ? 'border-l-8 border-indigo-500' : 'border-l-8 border-gray-300 opacity-40'}`}
                  autoFocus
                />
              </div>
            ) : (
              <button
                className={`tab-button text-xl font-bold bg-white w-fit py-3 px-6 whitespace-nowrap
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
          className='inline-block px-4 text-4xl'
          onClick={handleAddList}
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