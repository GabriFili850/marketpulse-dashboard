import React from "react";
import { GasPriceContainer, GasPriceText, CountdownText } from "./styles";
import useGasPrice from "./useGasPrice";

const GasPrice = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const { gasPrice, countdown, error } = useGasPrice(apiKey);

  return (
    <GasPriceContainer>
      {error ? (
        <p>{error}</p>
      ) : gasPrice ? (
        <>
          <GasPriceText>Current Gas Price: {gasPrice} Gwei</GasPriceText>
          <CountdownText>Refreshing in {countdown} seconds...</CountdownText>
        </>
      ) : (
        <p>Loading gas price...</p>
      )}
    </GasPriceContainer>
  );
};

export default GasPrice;
