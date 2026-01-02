import React from "react";
import { GasPriceContainer, GasPriceText, CountdownText } from "./styles";

const GasPriceView = ({ gasPrice, countdown, error, status = "loading" }) => {
  return (
    <GasPriceContainer>
      {status === "error" ? (
        <p>{error}</p>
      ) : status === "ready" ? (
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

export default GasPriceView;
