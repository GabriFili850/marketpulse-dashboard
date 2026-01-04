import {
  CountdownText,
  ErrorText,
  GasPriceContainer,
  GasPriceGrid,
  GasPriceHeader,
  GasPriceItem,
  GasPriceLabel,
  GasPriceTitle,
  GasPriceUnit,
  GasPriceValue,
  StatusText,
} from "./styles";

const GasPriceView = ({ gasPrices, countdown, error, status = "loading" }) => {
  return (
    <GasPriceContainer aria-labelledby="gas-price-heading">
      <GasPriceHeader>
        <GasPriceTitle id="gas-price-heading">Gas Prices</GasPriceTitle>
      </GasPriceHeader>
      {status === "error" ? (
        <ErrorText role="alert">{error}</ErrorText>
      ) : status === "ready" ? (
        <>
          <GasPriceGrid>
            <GasPriceItem>
              <GasPriceLabel>Low</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.low} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
            <GasPriceItem>
              <GasPriceLabel>Average</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.average} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
            <GasPriceItem>
              <GasPriceLabel>High</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.high} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
          </GasPriceGrid>
          <CountdownText>Refreshing in {countdown} seconds...</CountdownText>
        </>
      ) : (
        <StatusText role="status" aria-live="polite">
          Loading gas price...
        </StatusText>
      )}
    </GasPriceContainer>
  );
};

export default GasPriceView;
