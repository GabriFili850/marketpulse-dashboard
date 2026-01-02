import React from "react";
import useGasPrice from "./useGasPrice";
import GasPriceView from "./GasPriceView";

const GasPriceContainer = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const { gasPrice, countdown, error, status } = useGasPrice(apiKey);

  return (
    <GasPriceView
      gasPrice={gasPrice}
      countdown={countdown}
      error={error}
      status={status}
    />
  );
};

export default GasPriceContainer;
