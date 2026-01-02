import React from "react";
import GasPriceContainer from "./GasPrice";
import EthereumLogo from "./images/ethereum-logo.svg";
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

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <AppShell>
        <AppHeader>
          <LogoBadge>
            <LogoMark src={EthereumLogo} alt="Ethereum Logo" />
          </LogoBadge>
          <AppHeaderMeta>
            <AppTitle>Etherscan Gas Oracle</AppTitle>
            <AppSubtitle>
              Low, average, and high estimates from the Etherscan oracle.
            </AppSubtitle>
          </AppHeaderMeta>
        </AppHeader>
        <GasPriceContainer />
      </AppShell>
    </AppContainer>
  );
}

export default App;
