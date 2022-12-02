import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from "react-colorful";
import { changeTheme, changeThemeColor, changeThemeHoverColor, getTheme } from '../app/features/themeSlice';
import Ripples from "react-ripples"

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

const Theme = ({ name, currTheme, value }) => {
  const dispatch = useDispatch()
  return (
    <div className="mt-4">
      <input
        type="radio"
        id={name}
        name="theme"
        value={value}
        className="cursor-pointer"
        onChange={() => dispatch(changeTheme(value))}
        checked={currTheme === value}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="light" className="ml-2 text-md cursor-pointer">
        {name}
      </label>
    </div>
  )
}



const ThemeSettings = ({ toggleSettings, setToggleSettings, saveThemeSettings, isSavedTheme }) => {
  const { theme, themeColor, themeHoverColor } = useSelector(getTheme);
  const dispatch = useDispatch();

  const changeColor = (e) => {
    dispatch(changeTheme(e))
  }

  return (
    <div style={{ overflowY: "auto" }} className={`bg-half-transparent w-screen fixed z-50  nav-item top-0 ${!toggleSettings && "-right-96 hidden"}`}>
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400 shadow-xl">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setToggleSettings(!toggleSettings)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>

        </div>
        <hr />
        <div className="flex-col border-t-1 p-4 ml-4 flex justify-center">
          <p className="font-semibold text-xl my-3">Theme Color Option</p>

          {/* theme options */}
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <div
                className="relative cursor-pointer flex gap-5 items-center"
                key={item.name}
              >
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => dispatch(changeThemeColor(item.color))}
                >
                  <BsCheck className={`ml-2 text-2xl text-white ${themeColor === item.color ? "block" : "hidden"}`} />
                </button>
              </div>
            ))}
          </div>

          {/* customize theme */}
          <div>
            <p className="font-semibold text-xl my-5">Customize Theme</p>
            <HexColorPicker className='mx-auto' color={theme} onChange={changeColor} />
          </div>

        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl mb-5">Theme Hover Color</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <div
                className="relative cursor-pointer flex gap-5 items-center"
                key={item.name}
              >
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => dispatch(changeThemeHoverColor(item.color))}
                >
                  <BsCheck className={`ml-2 text-2xl text-white ${themeHoverColor === item.color ? "block" : "hidden"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Ripples className="w-full px-10">
            <button onClick={() => saveThemeSettings({theme, themeColor, themeHoverColor})} className="w-full bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white flex items-center justify-center gap-4 py-3">
              {isSavedTheme ? "Saved" : "Save Setting"}
            </button>
        </Ripples>
      </div>
    </div>
  );
};

export default ThemeSettings;
