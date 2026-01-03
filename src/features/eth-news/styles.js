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
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const NewsItem = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: linear-gradient(135deg, #f5f8fd 0%, #eef4fb 100%);
  border: 1px solid #e1e9f4;
  overflow: hidden;
`;

export const NewsImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #e7edf7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  &[data-fallback="true"] {
    object-fit: contain;
    padding: 18px;
    background: #eef3fb;
  }
`;

export const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 16px;
`;

export const NewsLink = styled.span`
  color: #0b2c5f;
  font-weight: 600;
  line-height: 1.35;
`;

export const NewsItemLink = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;

  &:hover ${NewsLink} {
    color: #0b5ed7;
  }

  &:focus-visible {
    outline: 2px solid #0b5ed7;
    outline-offset: 2px;
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

export const NewsPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

export const NewsPageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const NewsPageButton = styled.button`
  border: 1px solid #d6e0ef;
  background: #ffffff;
  color: #2a3b55;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
    color 0.2s ease;

  &:hover:enabled {
    background: #f2f6fd;
    box-shadow: 0 6px 14px rgba(15, 28, 46, 0.08);
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
    transform: none;
  }

  &[data-active="true"] {
    background: #0b5ed7;
    border-color: #0b5ed7;
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(11, 94, 215, 0.2);
  }
`;
