import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import GasPriceController from "../controllers/GasPriceController";
import { MISSING_API_KEY_MESSAGE } from "../GasPrice/constants";

jest.mock("axios");

describe("GasPrice component", () => {
  const originalEnv = process.env;
  let consoleErrorSpy;
  const mockEthPriceSuccess = (price = 2300.45) => ({
    data: {
      prices: [
        [1700000000000, price - 10],
        [1700008640000, price],
      ],
    },
  });

  const mockGasOracleSuccess = (overrides = {}) => ({
    data: {
      status: "1",
      message: "OK",
      result: {
        LowGasPrice: "10",
        ProposeGasPrice: "20",
        HighGasPrice: "30",
        ...overrides,
      },
    },
  });

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    process.env = {
      ...originalEnv,
      REACT_APP_ETHERSCAN_API_KEY: "test-api-key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
  const findGasValue = (value) =>
    screen.findByText((_, element) => {
      if (!element) {
        return false;
      }
      return normalizeText(element.textContent || "") === `${value} Gwei`;
    });

  test("renders gas prices", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("action=gasoracle")) {
        return Promise.resolve(mockGasOracleSuccess());
      }
      if (url.includes("coingecko.com")) {
        return Promise.resolve(mockEthPriceSuccess());
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    render(<GasPriceController />);

    expect(screen.getByText(/Low/i)).toBeInTheDocument();
    expect(screen.getByText(/Average/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
    expect(await findGasValue("10.00")).toBeInTheDocument();
    expect(await findGasValue("20.00")).toBeInTheDocument();
    expect(await findGasValue("30.00")).toBeInTheDocument();
  });

  test("renders an error when the request fails", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("action=gasoracle")) {
        return Promise.reject(new Error("Network error"));
      }
      if (url.includes("coingecko.com")) {
        return Promise.resolve(mockEthPriceSuccess());
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    render(<GasPriceController />);

    const errorElement = await screen.findByText(/Network error/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("retries after a failure and clears the error", async () => {
    jest.useFakeTimers();
    let gasCallCount = 0;
    axios.get.mockImplementation((url) => {
      if (url.includes("action=gasoracle")) {
        gasCallCount += 1;
        if (gasCallCount === 1) {
          return Promise.reject(new Error("Network error"));
        }
        return Promise.resolve(
          mockGasOracleSuccess({
            LowGasPrice: "15",
            ProposeGasPrice: "25",
            HighGasPrice: "35",
          })
        );
      }
      if (url.includes("coingecko.com")) {
        return Promise.resolve(mockEthPriceSuccess());
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    render(<GasPriceController />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Network error/i)).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(await findGasValue("15.00")).toBeInTheDocument();
    expect(screen.queryByText(/Network error/i)).toBeNull();
    expect(screen.getByText(/Refreshing in 15 seconds/i)).toBeInTheDocument();
  });

  test("shows a missing API key message", () => {
    delete process.env.REACT_APP_ETHERSCAN_API_KEY;
    axios.get.mockResolvedValue(mockEthPriceSuccess());
    render(<GasPriceController />);

    expect(screen.getAllByText(MISSING_API_KEY_MESSAGE).length).toBeGreaterThan(
      0
    );
  });
});
