import React, { useState, useEffect } from 'react';
import logo from '../../../assets/img/logo.svg';
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import store from "../../../store/store";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectUser } from "../../../store/auth";

const CreateAccount = () => {
  const checkbox = document.querySelector("#agree");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  // TODO: add messages on UseSelect cases if error , if is success ( dispatch clearState , dispatch useLogin) --> if UserLogin success go to keyphrase
  const { isFetching, isError, errorMessage, isSuccess } = useSelector(selectUser);


  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // console.log('iserror', isError)
    console.log('isfetching use effec', isFetching)
    // console.log('issuccess', isSuccess)

    setIsValid(password == confirmPassword);
    
    if (isSuccess) {
      history.push("/confirm-keyphrase");
    }

    if (isError) {
      // handleMessage(errorMessage);
      alert('erro ao criar a conta')
    }
  }, [
    password,
    confirmPassword,
    isSuccess,
    // isError,
    isFetching
  ]);

  const passwordIsGreaterThan8 = password.length >= 8 && confirmPassword.length >= 8;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid && checkbox.checked) {
      console.log('iserror', isError)
      console.log('isfetching', isFetching)
      console.log('issuccess', isSuccess)
      await store.dispatch(signupUser(password));
      chrome.runtime.sendMessage(store.getState())
      console.log('iserror dps', isError)
      console.log('isfetching  dps', isFetching)
      console.log('issuccess dps', isSuccess)
    }
  }

  return (
    <div>
      <Header authPage />

      <div className="text-center mt-16 mb-4 p-2 pb-0 flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />

        <form className="w-full p-4 pt-0 ml-2 mr-2" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col justify-center items-center w-full">
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength="8"
              maxLength="16"
              title="Your password must be between 8 and 16 characters"
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full mt-2 outline-none focus:border-blue-300"
              onBlur={(event) => setPassword(event.target.value)}
            />

            <input
              name="passwordConfirmed"
              type="password"
              placeholder="Enter password again"
              minLength="8"
              maxLength="16"
              title="Your password must be between 8 and 16 characters"
              className="border border-gray-300 p-4 rounded-full w-full mt-2 outline-none focus:border-blue-300"
              required
              onBlur={(event) => setConfirmPassword(event.target.value)}
            />

            {isValid ? (
              <small
                className={passwordIsGreaterThan8 ? "text-green-500 text-xs font-bold my-2" : "text-gray-500 text-xs font-bold my-2"}
              >
                {passwordIsGreaterThan8 ? "Valid password" : "Your password must be between 8 and 16 characters"}
              </small>
            ) : (
              <small
                className="text-red-500 text-xs font-bold my-2"
              >
                Passwords do not match, please retype
              </small>
            )
            }
          </fieldset>

          <div className="mt-4 mr-32">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              required
            />

            <label
              htmlFor="agree"
              className="mb-4 font-bold text-gray-800 text-xs ml-2 cursor-pointer">
              I agree with the terms.
              </label>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              disabled={!isValid}
              type="submit"
              className="disabled:opacity-20 flex justify-center items-center mb-4 border-2 border-blue-300 bg-transparent rounded-full p-4 w-2/3 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300"
            >
              {isFetching ? (
                <Loading />
              ) : 'Create wallet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;