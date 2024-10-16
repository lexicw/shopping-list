"use client";

import React, { useState, useEffect, useRef } from "react";

const isMobile = () => {
  return (
    typeof window !== "undefined" &&
    /Mobi|Android/i.test(window.navigator.userAgent)
  );
};

const Tabs = ({ tabs, addList, updateListName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const tabButtonsRef = useRef(null);

  // Effect to ensure activeTab is within valid bounds
  useEffect(() => {
    if (activeTab >= tabs.length) {
      setActiveTab(tabs.length > 0 ? 0 : null); // Default to the first tab if there are tabs, otherwise null
    }
  }, [tabs, activeTab]);

  const handleDoubleClick = (index, label) => {
    if (index === activeTab) {
      setEditIndex(index);
      setEditValue(label);
    }
  };

  const handleBlur = (index) => {
    updateListName(index, editValue);
    setEditIndex(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      handleBlur(index);
    }
  };

  // Automatically set the active tab to the new list if no other lists exist
  const handleAddList = () => {
    addList();
    setActiveTab(tabs.length); // Set activeTab to the new list's index (which is tabs.length before the addition)

    setTimeout(() => {
      if (tabButtonsRef.current) {
        tabButtonsRef.current.scrollTo({
          left: tabButtonsRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    const ele = tabButtonsRef.current;

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      const pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const mouseMoveHandler = function (e) {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
        ele.style.cursor = "grab";
        ele.style.removeProperty("user-select");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    if (editIndex === null) {
      ele.style.cursor = "grab";
      ele.addEventListener("mousedown", mouseDownHandler);
    } else {
      ele.style.cursor = "default";
      ele.removeEventListener("mousedown", mouseDownHandler);
    }

    return () => {
      ele.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [editIndex]);

  const handleTouchStart = (index, label) => {
    if (editIndex === null && index === activeTab) {
      tabButtonsRef.current.longPressTimeout = setTimeout(() => {
        handleDoubleClick(index, label);
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(tabButtonsRef.current.longPressTimeout);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    const tabButton = document.getElementById(`tab-button-${index}`);
    if (tabButton) {
      tabButton.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div>
      <div
        ref={tabButtonsRef}
        className={`tab-buttons flex items-center overflow-x-scroll ${
          editIndex !== null ? "disable-scroll" : ""
        }`}
      >
        {tabs.map((tab, index) => (
          <div key={index} className="">
            {editIndex === index ? (
              <div className="bg-white">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleBlur(index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  className={`tab-input text-xl font-bold py-3 px-6 w-fit box-border
                    ${
                      activeTab === index
                        ? "border-l-8 border-indigo-500"
                        : "border-l-8 border-gray-300 opacity-40"
                    }`}
                  autoFocus
                />
              </div>
            ) : (
              <button
                id={`tab-button-${index}`}
                className={`tab-button text-xl font-bold w-fit py-3 px-6 whitespace-nowrap
                  ${
                    activeTab === index
                      ? "border-l-8 border-indigo-500"
                      : "border-l-8 border-gray-300 opacity-40"
                  }`}
                style={{ backgroundColor: tab.color }}
                onClick={() => handleTabClick(index)}
                onDoubleClick={() => handleDoubleClick(index, tab.label)}
                onTouchStart={() => handleTouchStart(index, tab.label)}
                onTouchEnd={handleTouchEnd}
              >
                {tab.label}
              </button>
            )}
          </div>
        ))}
        <button className="inline-block px-4 text-4xl" onClick={handleAddList}>
          +
        </button>
      </div>
      {tabs.length > 0 && tabs[activeTab] && tabs[activeTab].content && (
        <div className="tab-content">{tabs[activeTab].content}</div>
      )}
    </div>
  );
};

export default Tabs;
