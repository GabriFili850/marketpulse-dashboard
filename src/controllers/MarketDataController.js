import App from "../App";
import useGasPrice from "../features/gas/useGasPrice";
import useEthPrice from "../features/eth-price/useEthPrice";

const MarketDataController = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const gasState = useGasPrice({ apiKey });
  const ethState = useEthPrice();

  return <App gasState={gasState} ethState={ethState} />;
};

export default MarketDataController;
