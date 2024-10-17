// src/components/ShoppingList.js
"use client";

import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import ShoppingItem from "./ShoppingItem";
import Tabs from "./Tabs";

const ShoppingList = () => {
  const [lists, setLists] = useState([
    { name: "Shopping List", items: [], color: "#FFFFFF" },
  ]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("lists")) || [
      { name: "Shopping List", items: [], color: "#FFFFFF" },
    ];
    setLists(storedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addItem = (listIndex, item) => {
    const newLists = [...lists];
    newLists[listIndex].items.push({ name: item, bought: false });
    setLists(newLists);
  };

  const toggleItemBought = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items[itemIndex].bought =
      !newLists[listIndex].items[itemIndex].bought;
    setLists(newLists);
  };

  const deleteItem = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items = newLists[listIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setLists(newLists);
  };

  const deleteList = (listIndex) => {
    if (confirm("Are you sure you want to delete this list?")) {
      const updatedLists = lists.filter((_, index) => index !== listIndex);
      setLists(updatedLists);
    } else {
      return;
    }
  };

  const changeListColor = (listIndex, newColor) => {
    const updatedLists = lists.map((list, index) =>
      index === listIndex ? { ...list, color: newColor } : list
    );

    setLists(updatedLists);
  };

  const addList = () => {
    const newLists = [
      ...lists,
      {
        name: `Shopping List ${lists.length + 1}`,
        items: [],
        color: "#FFFFFF",
      },
    ];
    setLists(newLists);
  };

  const updateListName = (listIndex, newName) => {
    const newLists = [...lists];
    newLists[listIndex].name = newName;
    setLists(newLists);
  };

  const tabs = lists.map((list, listIndex) => ({
    label: list.name,
    color: list.color,
    content: (
      <div>
        <div
          className="border-b-2 border-gray-300 pt-6 px-6 pb-6"
          style={{ backgroundColor: list.color }}
        >
          <button
            type="submit"
            className="bg-red-300 w-10 px-2 py-1 mb-3 text-2xl hover:bg-red-400 text-white rounded-md float-end"
            onClick={() => deleteList(listIndex)}
          >
            ×
          </button>
          <div className="float-end flex items-center mx-3">
            <label for="listColor" className="align-middle">
              List Color:
            </label>
            &nbsp;
            <input
              type="color"
              value={list.color}
              id="listColor"
              className="p-1 h-10 w-10 bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
              onChange={(e) => changeListColor(listIndex, e.target.value)}
            ></input>
          </div>
          <AddItemForm addItem={(item) => addItem(listIndex, item)} />
          <ul className="w-full">
            {list.items.map((item, itemIndex) => (
              <ShoppingItem
                key={itemIndex}
                item={item}
                toggleItemBought={() => toggleItemBought(listIndex, itemIndex)}
                deleteItem={() => deleteItem(listIndex, itemIndex)}
              />
            ))}
          </ul>
        </div>
      </div>
    ),
  }));

  return (
    <div className="container w-full lg:w-1/2 mx-auto lg:mt-4">
      <Tabs tabs={tabs} addList={addList} updateListName={updateListName} />
    </div>
  );
};

export default ShoppingList;
