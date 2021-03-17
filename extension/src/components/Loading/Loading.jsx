import React from "react";
import loading from "../../assets/icon/refresh-button.svg";

const Loading = () => {
  return (
    <img
      src={loading}
      alt="loading"
      className="animate-spin w-5 h-5"
    />
  );
}

export default Loading;