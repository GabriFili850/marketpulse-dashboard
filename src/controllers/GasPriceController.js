import App from "../App";
import useGasPrice from "../GasPrice/useGasPrice";
import useEthPrice from "../hooks/useEthPrice";

const GasPriceController = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const gasState = useGasPrice({ apiKey });
  const ethState = useEthPrice();

  return <App gasState={gasState} ethState={ethState} />;
};

export default GasPriceController;
