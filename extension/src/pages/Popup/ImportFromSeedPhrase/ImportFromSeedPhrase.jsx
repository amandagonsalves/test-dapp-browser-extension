import React, { useState, useEffect } from 'react';
import Header from "../../../components/Header/Header";
import phrase from "../../../data/phrase";
import Loading from "../../../components/Loading/Loading";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { selectUser, importFromSeed, loginUser, loginWithSeedPhrase } from "../../../store/auth";
import { ToastContainer, toast } from 'react-toastify';

const seedWords = [...Array(phrase.length)].fill('');

const ImportFromSeedPhrase = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [seedPhrase, setSeedPhrase] = useState(() => [...seedWords]);
  const [isValid, setIsValid] = useState(false);
  const { isFetching, isError, isSuccess, errorMessage } = useSelector(selectUser);

  const handleMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const handleChange = (event, index) => {
    const word = event.target.value;

    setSeedPhrase([
      ...seedPhrase.slice(0, index),
      word,
      ...seedPhrase.slice(index + 1)
    ]);
  }

  // useEffect(() => {
  //   setIsValid(seedPhrase.every((word) => word.length > 0));
  // }, seedPhrase);

  // const checkSeedPhrase = async () => {
  //   if (isValid && seedPhrase.every((word, index) => word == phrase[index])) {
  //     await dispatch(importFromSeed({
  //       seedPhrase
  //     }));

  //     await dispatch(loginWithSeedPhrase({
  //       seedPhrase
  //     }));
  //   } else {
  //     handleMessage('Incorrect seed. Try again.');
  //   }


  // }

  // useEffect(() => {
  //   if (isError) {
  //     handleMessage(errorMessage);
  //   }

  //   if (isSuccess) {
  //     history.push("/dashboard");
  //   }

  //   console.log('issuccess', isSuccess, 'iserror', isError)
  //   console.log('isfeching', isFetching)
  // }, [
  //   isSuccess,
  //   isError,
  // ]);

  const RenderPhraseInput = () => {
    return phrase.map((word, index) => {
      return (
        <div
          className="p-2 rounded w-1/4"
          key={index}
        >
          <p className="text-gray-600">{index}</p>
          <input
            id={index}
            type="text"
            name="word"
            defaultValue={seedPhrase[index]}
            className="w-full border-b-2 border-gray-300 hover:border-blue-300 focus:border-blue-300 outline-none"
            onBlur={(event) => handleChange(event, index)}
          />
        </div>
      );
    });
  }

  return (
    <div>
      <Header authPage />

      <h1 className="text-2xl text-center mt-12 font-bold text-gray-700">Import wallet</h1>
      <p className="text-center mt-2 text-gray-500 px-8">Enter the seed phrase, in the same order saved when creating your wallet.</p>

      <div className="flex flex-wrap gap-4 justify-center items-center p-4 mt-2">
        <RenderPhraseInput />

        <button
          onClick={checkSeedPhrase}
          className="flex items-center justify-center w-full p-4 mt-4 mx-8 rounded-full text-center border-2 border-blue-300 cursor-pointer transition-all duration-300 hover:bg-blue-400 text-gray-800 font-bold"
        >
          {/* {isFetching ? (
            <Loading />
          ) : 'Import wallet'} */}
          import wallet
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImportFromSeedPhrase;