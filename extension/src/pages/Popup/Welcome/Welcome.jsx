import React from "react";
import logo from "../../../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Welcome = () => {
  // const console = chrome.extension.getBackgroundPage().console;
  // console.log('hello background from welcome', store.getState())

  return (
    <div>
      <div className="text-center mt-24 mb-8 p-2 flex flex-col justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />
        <h1 className="font-bold text-gray-700 text-4xl mt-8">Welcome :)</h1>
        <p className="mt-2 font-light text-gray-400 text-sm">The decentralized web awaits</p>
      </div>

      <div className="flex flex-col justify-center items-center px-8 py-4 gap-4 mb-8">
        <Link
          to="/create-account"
          className="border-2 border-blue-300 bg-transparent rounded-full p-4 w-full font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
          Create wallet
        </Link>

        <Link
          to="/import-from-seed-phrase"
          className="border-2 border-blue-300 bg-transparent rounded-full p-4 w-full font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
          Import with seed phrase
        </Link>
      </div>

      <p className="font-bold text-gray-400 text-xs text-center mt-8">— SysWallet —</p>
    </div>
  );
};

export default Welcome;
