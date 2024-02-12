import React from 'react';
import { useNavigate } from 'react-router-dom';
import GreyMetricsLogo from './styles/main-logo.png';
import appleLogo from './styles/apple-logo.png';
import googleLogo from './styles/google-logo.png';

const SignIn = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/overview');
    }

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center overflow-hidden">
    <div className="relative bg-indigo-500 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen overflow-hidden transform rotate-12 transform scale-150 ml-[-40%]">
    <div className="flex flex-col items-end justify-center h-screen transform -rotate-12 mr-32 mt-20">
    <img
      src={GreyMetricsLogo}
      alt="BASE logo"
      className="w-12 h-12 rounded-full absolute top-20 right-52"
    />
      <h1 className="font-bold text-white text-5xl mr-6 mb-24">BudgetO</h1>
    </div>
  </div>

  <div className="bg-white md:max-w-32 lg:max-w-full ml-auto mr-28 rounded-lg shadow-lg py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl text-gray-900 text-left">Sign In</h1>
          <p className="mt-2 text-sm text-gray-600 text-left font-semibold">
            Sign in to your account
          </p>
    <div className="flex flex-row">
    <button className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700 font-medium mt-4 text-nowrap">
      <img
        src={googleLogo}
        alt="Google Logo"
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </button>

    <button className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700 font-medium mt-4 ml-2 text-nowrap">
      <img
        src={appleLogo}
        alt="Apple Logo"
        className="w-5 h-5 mr-2"
      />
      Sign in with Apple
    </button>
    </div>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 tracking-wide"
            >
              Email address
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 w-full text-gray-600"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 tracking-wide"
            >
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 w-full text-gray-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-left">
            <a
              href="#"
              className="text-sm font-semibold text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Forgot password?
            </a>
          </div>
          <button className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white font-medium" onClick={handleClick}>
            Sign In
          </button>
          <div className="text-center mt-5">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 cursor-pointer"
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;