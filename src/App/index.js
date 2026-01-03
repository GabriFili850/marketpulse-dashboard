import EthPriceChart from "../features/eth-price/EthPriceChart";
import GasPriceView from "../features/gas/GasPriceView";
import EthereumLogo from "../assets/images/ethereum-logo.svg";
import {
  AppContainer,
  AppHeader,
  AppHeaderMeta,
  AppShell,
  AppSubtitle,
  AppTitle,
  GlobalStyle,
  LogoBadge,
  LogoMark,
} from "./styles";

function App({ gasState, ethState }) {
  const { gasPrices, countdown, error, status } = gasState;
  const { price, history, error: ethError, status: ethStatus } = ethState;

  return (
    <AppContainer>
      <GlobalStyle />
      <AppShell>
        <AppHeader>
          <LogoBadge>
            <LogoMark src={EthereumLogo} alt='Ethereum Logo' />
          </LogoBadge>
          <AppHeaderMeta>
            <AppTitle>MarketPulse Dashboard</AppTitle>
            <AppSubtitle>
              Ethereum price and gas, built to grow across chains.
            </AppSubtitle>
          </AppHeaderMeta>
        </AppHeader>
        <EthPriceChart
          price={price}
          history={history}
          status={ethStatus}
          error={ethError}
        />
        <GasPriceView
          gasPrices={gasPrices}
          countdown={countdown}
          error={error}
          status={status}
        />
      </AppShell>
    </AppContainer>
  );
}

export default App;
