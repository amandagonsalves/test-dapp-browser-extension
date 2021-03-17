import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.svg";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import store from "../../../store/store";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { selectUser, loginUser, clearState } from "../../../store/auth";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  // const { isFetching, isError, errorMessage, isSuccess } = useSelector(selectUser);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (password) {
  //     console.log('is valid password')
  //     await store.dispatch(loginUser(password));
  //   }

  //   return false;
  // }

  // const handleMessage = (message) => {
  //   toast.error(message, {
  //     position: toast.POSITION.TOP_CENTER
  //   });
  // };

  // const handleBlur = (event) => {
  //   setPassword(event.target.value);
  // };

  // useEffect(() => {
  //   console.log("checking what is happenign")
  //   console.log('is error login', isError)
  //   console.log('is success login', isSuccess)
  //   console.log('is fetching login', isFetching)

  //   if (isError) {
  //     handleMessage(errorMessage);

  //     dispatch(clearState());
  //   } else if (isSuccess) {
  //     store.dispatch(clearState());

  //     history.push("/dashboard");
  //   }

  // }, [
  //   isError,
  //   isSuccess,
  //   isFetching
  // ]);

  return (
    <div>
      <Header />

      <div className="text-center mt-12 p-2 pb-0 flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />
        <h1 className="font-bold text-gray-700 text-4xl mb-8">Welcome back :)</h1>

        <form className="w-full px-4 mx-2" /* onSubmit={handleSubmit} */>
          <fieldset className="flex flex-col justify-center items-center w-full">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full my-4 outline-none focus:border-blue-400"
             /* onBlur={handleBlur} */
            />
          </fieldset>


          <Link to="/import-from-seed-phrase" className="mt-4 text-gray-500 text-xs transition-all duration-300 hover:text-gray-700">
            Forgot password? Restore account from seed phrase.
          </Link>

          <div className="flex justify-center items-center mt-12">
            <button
              type="submit"
              className="flex justify-center items-center mb-2 border-2 border-blue-300 bg-transparent rounded-full p-4 w-2/3 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300"
            >
              {/* {isFetching ? (
                <Loading />
              ) : 'Login'} */}
              login
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;