import { useEffect, useMemo, useState } from "react";
import EthereumLogo from "../../assets/images/ethereum-logo.svg";
import { MAX_NEWS_PAGES, NEWS_ITEMS_PER_PAGE } from "./constants";
import {
  NewsBadge,
  NewsCard,
  NewsContent,
  NewsError,
  NewsHeader,
  NewsImage,
  NewsImageWrap,
  NewsItem,
  NewsItemLink,
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

  const handleImageError = (event) => {
    if (event.currentTarget.src !== EthereumLogo) {
      event.currentTarget.src = EthereumLogo;
      event.currentTarget.dataset.fallback = "true";
    }
  };

  return (
    <NewsCard aria-labelledby="news-heading">
      <NewsHeader>
        <NewsTitle id="news-heading">Ethereum News</NewsTitle>
        <NewsBadge>Live</NewsBadge>
      </NewsHeader>
      {status === "error" ? (
        <NewsError role="alert">{error}</NewsError>
      ) : status === "ready" ? (
        <>
          <NewsList>
            {pageItems.map((item) => {
              const imageUrl = item.imageUrl || EthereumLogo;
              const isFallback = !item.imageUrl;
              const timestampLabel = formatTimestamp(item.timestamp);
              const metaParts = [item.source, timestampLabel].filter(Boolean);
              const metaLabel = metaParts.join(", ");
              const ariaLabel = metaLabel
                ? `${item.title}. ${metaLabel}. Opens in new tab.`
                : `${item.title}. Opens in new tab.`;

              return (
                <NewsItem key={item.id}>
                  <NewsItemLink
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={ariaLabel}
                  >
                    <NewsImageWrap>
                      <NewsImage
                        src={imageUrl}
                        alt={item.title}
                        loading="lazy"
                        data-fallback={isFallback}
                        onError={handleImageError}
                      />
                    </NewsImageWrap>
                    <NewsContent>
                      <NewsLink>{item.title}</NewsLink>
                      <NewsMeta>
                        <span>{item.source}</span>
                        <span>{timestampLabel}</span>
                      </NewsMeta>
                    </NewsContent>
                  </NewsItemLink>
                </NewsItem>
              );
            })}
          </NewsList>
          {showPagination ? (
            <NewsPagination aria-label="News pagination">
              <NewsPageButton
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(0, prev - 1))
                }
                disabled={currentPage === 0}
                aria-label="Previous page"
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
                    aria-label={`Go to page ${pageIndex + 1}`}
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
                aria-label="Next page"
              >
                Next
              </NewsPageButton>
            </NewsPagination>
          ) : null}
        </>
      ) : (
        <NewsStatus role="status" aria-live="polite">
          Loading Ethereum news...
        </NewsStatus>
      )}
    </NewsCard>
  );
};

export default EthNews;
