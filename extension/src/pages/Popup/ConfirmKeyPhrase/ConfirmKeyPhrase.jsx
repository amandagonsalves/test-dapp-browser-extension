import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { useSelector } from 'react-redux';
import { selectUser } from "../../../store/auth";

const ConfirmKeyPhrase = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const seed = user.decryptedwallet[0].mnemonic.split(' ');
  
  const RenderPhrase = () => {
    return seed.map((word, index) => {
      return (
        <div
          className="p-2 rounded bg-gray-100 border border-gray-200 w-1/4"
          key={index}
        >
          <p className="text-gray-500 font-bold">{index}</p>
          <p className="text-gray-600">{word}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <Header />

      <h1 className="text-2xl text-center mt-4 font-bold text-gray-700">Backup your wallet</h1>
      <p className="text-center mt-2 text-gray-500 font-light px-8">The seed phrase is the only way to restore your wallet. Write it down, verify it and then store it securely.</p>

      <div className="flex flex-wrap gap-4 justify-center items-center p-4 mt-2">
        <RenderPhrase />

        <button
          onClick={() => history.push("/dashboard")}
          className="w-full p-2 mt-4 mx-8 rounded-full text-center border border-blue-400 cursor-pointer transition-all duration-300 hover:bg-blue-400 text-gray-800 font-bold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmKeyPhrase;