import styled, { keyframes } from "styled-components";

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NewsCard = styled.section`
  margin-top: 22px;
  background: #ffffff;
  border-radius: 20px;
  padding: 22px 24px 26px;
  border: 1px solid #e3e9f2;
  box-shadow: 0 20px 40px rgba(15, 28, 46, 0.08);
  animation: ${riseIn} 0.6s ease-out;
`;

export const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const NewsTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #22324a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const NewsBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: #0b5ed7;
  background: rgba(11, 94, 215, 0.08);
  padding: 6px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const NewsList = styled.ul`
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: grid;
  gap: 14px;
`;

export const NewsItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f5f8fd 0%, #eef4fb 100%);
  border: 1px solid #e1e9f4;
`;

export const NewsLink = styled.a`
  color: #0b2c5f;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.35;

  &:hover {
    color: #0b5ed7;
  }
`;

export const NewsMeta = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 0.78rem;
  color: #6b7b94;
`;

export const NewsStatus = styled.p`
  margin: 12px 0 0;
  font-size: 0.95rem;
  color: #52627a;
`;

export const NewsError = styled(NewsStatus)`
  color: #cc2f4c;
  font-weight: 600;
`;
