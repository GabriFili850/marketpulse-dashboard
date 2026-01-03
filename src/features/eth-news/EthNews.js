import { useEffect, useMemo, useState } from "react";
import { MAX_NEWS_PAGES, NEWS_ITEMS_PER_PAGE } from "./constants";
import {
  NewsBadge,
  NewsCard,
  NewsError,
  NewsHeader,
  NewsItem,
  NewsLink,
  NewsList,
  NewsMeta,
  NewsPageButton,
  NewsPageNumbers,
  NewsPagination,
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
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.min(
    MAX_NEWS_PAGES,
    Math.max(1, Math.ceil(items.length / NEWS_ITEMS_PER_PAGE))
  );

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  const pageItems = useMemo(() => {
    const startIndex = currentPage * NEWS_ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + NEWS_ITEMS_PER_PAGE);
  }, [currentPage, items]);

  const showPagination = status === "ready" && totalPages > 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <NewsCard>
      <NewsHeader>
        <NewsTitle>Ethereum News</NewsTitle>
        <NewsBadge>Live</NewsBadge>
      </NewsHeader>
      {status === "error" ? (
        <NewsError>{error}</NewsError>
      ) : status === "ready" ? (
        <>
          <NewsList>
            {pageItems.map((item) => (
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
          {showPagination ? (
            <NewsPagination>
              <NewsPageButton
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(0, prev - 1))
                }
                disabled={currentPage === 0}
              >
                Prev
              </NewsPageButton>
              <NewsPageNumbers>
                {pages.map((pageIndex) => (
                  <NewsPageButton
                    key={`news-page-${pageIndex}`}
                    type="button"
                    onClick={() => setCurrentPage(pageIndex)}
                    data-active={pageIndex === currentPage}
                    aria-current={pageIndex === currentPage ? "page" : undefined}
                  >
                    {pageIndex + 1}
                  </NewsPageButton>
                ))}
              </NewsPageNumbers>
              <NewsPageButton
                type="button"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalPages - 1, prev + 1)
                  )
                }
                disabled={currentPage === totalPages - 1}
              >
                Next
              </NewsPageButton>
            </NewsPagination>
          ) : null}
        </>
      ) : (
        <NewsStatus>Loading Ethereum news...</NewsStatus>
      )}
    </NewsCard>
  );
};

export default EthNews;
