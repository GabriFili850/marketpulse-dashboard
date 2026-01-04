import EthPriceChart from "../features/eth-price/EthPriceChart";
import EthNews from "../features/eth-news/EthNews";
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
  SkipLink,
} from "./styles";

function App({ gasState, ethState, newsState }) {
  const { gasPrices, countdown, error, status } = gasState;
  const { price, history, error: ethError, status: ethStatus } = ethState;
  const { items, error: newsError, status: newsStatus } = newsState;

  return (
    <AppContainer>
      <GlobalStyle />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <AppShell id="main-content" tabIndex="-1">
        <AppHeader>
          <LogoBadge>
            <LogoMark src={EthereumLogo} alt="Ethereum Logo" />
          </LogoBadge>
          <AppHeaderMeta>
            <AppTitle>MarketPulse Crypto</AppTitle>
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
        <EthNews items={items} status={newsStatus} error={newsError} />
      </AppShell>
    </AppContainer>
  );
}

export default App;
