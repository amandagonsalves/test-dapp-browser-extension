import React from "react";
import icons from "../../../data/icons";
import Header from "../../../components/Header/Header";
import ethereum from "../../../assets/icon/ethereum.svg";
import dots from "../../../assets/icon/dots.svg";
import circle from "../../../assets/icon/oval.png";

const Dashboard = () => {
  const RenderIcon = () => {
    return icons.map(({ icon, path }) => {
      return (
        <div key={icon}>
          <img
            src={path} 
            alt={icon}
            className="transition-all duration-300 hover:bg-blue-100 w-10 h-10 p-2 mx-2 rounded-full border border-gray-400 cursor-pointer"
          />
          <p className="text-blue-400 font-bold text-xs text-center mt-2">{icon}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <Header dashboardPage />
      <div className="grid grid-cols-30/100 w-full h-16 items-center px-2 border-b-2 border-gray-200">
        <div className="flex items-center w-full">
          <img 
            src={circle} 
            alt="status"
            className="w-2 h-2"
          />
          <p className="text-gray-300 text-xxs ml-2">Not connected</p>
        </div>

        <div 
          className="rounded-full flex flex-col justify-center items-center transition-all duration-300 text-xs text-gray-500 hover:bg-gray-200 p-2 cursor-pointer"
        >
          <h2>Account 1</h2>
          <p>0x00...0000</p>
        </div>

        <img
          src={dots} 
          alt="menu"
          className="w-full h-4 ml-8 cursor-pointer"
        />
      </div>

      <div className="flex flex-col justify-center items-center mt-12">
        <img 
          src={ethereum} 
          alt="logo ethereum"
          className="h-12 w-12 p-2 rounded-full border border-gray-300 mb-2"
        />
        
        <h3 className="text-gray-600 text-base font-bold">0 ETH</h3>
        <small className="text-gray-400 text-base font-bold">$0.00 USD</small>
      </div>

      <div className="flex items-center justify-center mt-4">
        <RenderIcon />
      </div>

      <div className="mt-8">
        <p className="transition-all duration-300 w-full text-blue-400 text-base font-bold border-b-2 border-blue-400 p-2 cursor-pointer text-center hover:bg-blue-100">Assets</p>
      </div>

      <div className="flex items-center p-2 border-b-2 border-gray-200">
        <img 
          src={ethereum} 
          alt="logo ethereum"
          className="h-12 w-12 p-2 rounded-full border border-gray-300"
        />

        <div className="flex flex-col ml-2 p-2">
          <h3 className="text-gray-600 text-base font-bold">0 ETH</h3>
          <small className="text-gray-400 text-base font-bold">$0.00 USD</small>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <button
          className="my-4 w-1/2 border-2 border-blue-400 rounded-full h-10 text-center text-blue-400 font-bold hover:bg-blue-400 hover:text-white transition-all duration-300"
        >Add token</button>
      </div>
    </div>
  );
}

export default Dashboard;