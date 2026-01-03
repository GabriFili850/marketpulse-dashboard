import {
  NewsBadge,
  NewsCard,
  NewsError,
  NewsHeader,
  NewsItem,
  NewsLink,
  NewsList,
  NewsMeta,
  NewsStatus,
  NewsTitle,
} from "./styles";

const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const EthNews = ({ items, status, error }) => {
  return (
    <NewsCard>
      <NewsHeader>
        <NewsTitle>Ethereum News</NewsTitle>
        <NewsBadge>Live</NewsBadge>
      </NewsHeader>
      {status === "error" ? (
        <NewsError>{error}</NewsError>
      ) : status === "ready" ? (
        <NewsList>
          {items.map((item) => (
            <NewsItem key={item.id}>
              <NewsLink href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </NewsLink>
              <NewsMeta>
                <span>{item.source}</span>
                <span>{formatTimestamp(item.timestamp)}</span>
              </NewsMeta>
            </NewsItem>
          ))}
        </NewsList>
      ) : (
        <NewsStatus>Loading Ethereum news...</NewsStatus>
      )}
    </NewsCard>
  );
};

export default EthNews;
