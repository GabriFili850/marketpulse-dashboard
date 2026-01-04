import styled, { keyframes } from "styled-components";

const liftIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GasPriceContainer = styled.section`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e3e9f2;
  box-shadow: 0 24px 48px rgba(15, 28, 46, 0.08);
  animation: ${liftIn} 0.6s ease-out;
`;

export const GasPriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const GasPriceTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #22324a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const GasPriceGrid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 14px;
  margin: 12px 0 0;
`;

export const GasPriceItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f5f8fd 0%, #eef4fb 100%);
  border: 1px solid #e1e9f4;
`;

export const GasPriceLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b7b94;
`;

export const GasPriceValue = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: #0b5ed7;
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

export const GasPriceUnit = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7b94;
`;

export const CountdownText = styled.p`
  margin: 18px 0 0;
  font-size: 0.95rem;
  color: #52627a;
`;

export const StatusText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  color: #4a5b73;
`;

export const ErrorText = styled(StatusText)`
  color: #cc2f4c;
  font-weight: 600;
`;
