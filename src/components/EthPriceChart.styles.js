import styled, { keyframes } from "styled-components";

const glideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ChartCard = styled.section`
  background: #ffffff;
  border-radius: 22px;
  padding: 22px 24px 26px;
  border: 1px solid #e3e9f2;
  box-shadow: 0 20px 40px rgba(15, 28, 46, 0.08);
  margin-bottom: 22px;
  animation: ${glideIn} 0.6s ease-out;
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ChartTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #22324a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const ChartPrice = styled.div`
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  font-weight: 700;
  color: #0b5ed7;
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

export const ChartCurrency = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7b94;
`;

export const ChartBody = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f5f8fd 0%, #eef4fb 100%);
  border: 1px solid #e1e9f4;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 120px;
`;

export const ChartLine = styled.polyline`
  fill: none;
  stroke: #0b5ed7;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const ChartFill = styled.polygon`
  fill: rgba(11, 94, 215, 0.12);
`;

export const ChartMeta = styled.p`
  margin: 12px 0 0;
  font-size: 0.92rem;
  color: #52627a;
`;

export const ChartStatus = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #52627a;
`;

export const ChartError = styled(ChartStatus)`
  color: #cc2f4c;
  font-weight: 600;
`;
