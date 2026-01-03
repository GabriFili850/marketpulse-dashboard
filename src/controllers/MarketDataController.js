import App from "../App";
import useGasPrice from "../features/gas/useGasPrice";
import useEthPrice from "../features/eth-price/useEthPrice";
import useEthNews from "../features/eth-news/useEthNews";

const MarketDataController = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const gasState = useGasPrice({ apiKey });
  const ethState = useEthPrice();
  const newsState = useEthNews();

  return <App gasState={gasState} ethState={ethState} newsState={newsState} />;
};

export default MarketDataController;
