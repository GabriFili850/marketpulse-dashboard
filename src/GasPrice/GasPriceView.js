import React from "react";
import { GasPriceContainer, GasPriceText, CountdownText } from "./styles";

const GasPriceView = ({ gasPrices, countdown, error, status = "loading" }) => {
  return (
    <GasPriceContainer>
      {status === "error" ? (
        <p>{error}</p>
      ) : status === "ready" ? (
        <>
          <GasPriceText>Safe: {gasPrices.safe} Gwei</GasPriceText>
          <GasPriceText>Average: {gasPrices.average} Gwei</GasPriceText>
          <GasPriceText>Fast: {gasPrices.fast} Gwei</GasPriceText>
          <CountdownText>Refreshing in {countdown} seconds...</CountdownText>
        </>
      ) : (
        <p>Loading gas price...</p>
      )}
    </GasPriceContainer>
  );
};

export default GasPriceView;
