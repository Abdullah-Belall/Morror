"use client";

// DONE 3

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BrowseResults from "./BrowseResults";
import Link from "next/link";
import RequestsHub from "../_utils/RequestsHub";

export default function BrowseContent() {
  const [inp, setInp] = useState("");
  const [fristReqFix, setFristReqFix] = useState(false);
  const [result, setResult] = useState(null);
  const [result2, setResult2] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [debouncForShowMore, setDebouncForShowMore] = useState(null);
  const [page, setPage] = useState(1);

  function showMore() {
    if (debouncForShowMore) {
      clearTimeout(debouncForShowMore);
    }
    const timer = setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 700);
    setDebouncForShowMore(timer);
  }

  useEffect(() => {
    let cancelToken;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const timerId = setTimeout(() => {
      cancelToken = axios.CancelToken.source();
      const getBrowseResult_ = () => {
        RequestsHub.getBrowseResult(cancelToken.token, inp, 1)
          .then((res) => {
            setResult(res.data);
            setResult2(res.data.results);
          })
          .catch((thrown) => {
            if (axios.isCancel(thrown)) {
              console.log("Request canceled", thrown.message);
            } else {
              console.error(thrown);
            }
          });
      };
      if (fristReqFix) {
        getBrowseResult_();
      }
    }, 1000);
    setTimeoutId(timerId);
    return () => {
      clearTimeout(timerId);
      if (cancelToken) {
        cancelToken.cancel("Operation canceled");
      }
    };
  }, [inp]);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    const getBrowseResult_ = () => {
      RequestsHub.getBrowseResult(cancelToken.token, inp, page)
        .then((res) => {
          setResult2((prevResults) => [...prevResults, ...res.data.results]);
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
            console.error(thrown);
          }
        });
    };
    getBrowseResult_();
    return () => {
      if (cancelToken) {
        cancelToken.cancel("Operation canceled 2");
      }
    };
  }, [page, inp]);

  const displayData = useMemo(() => {
    if (result && result.results) {
      return result.results.map((e) => (
        <Link key={e.id} href={`/spmovie/${e.id}`}>
          <BrowseResults id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} date={e.release_date.slice(0, 4)} />
        </Link>
      ));
    }
  }, [result]);

  const displayData2 = useMemo(() => {
    if (result2) {
      return result2.map((e) => (
        <Link key={e.id} href={`/spmovie/${e.id}`}>
          <BrowseResults id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} date={e.release_date.slice(0, 4)} />
        </Link>
      ));
    }
  }, [result2]);

  if (result && result.total_results !== 0) {
    return (
      <div className="browse root container py-5 d-flex flex-column pe-3 pe-xl-4" style={{ minHeight: "100vh" }}>
        <div className="search position-relative">
          <input
            value={inp}
            onChange={(e) => {
              setFristReqFix(true);
              setInp(e.target.value);
              setPage(1);
            }}
            className="w-100 main-rounded ps-3 py-2 white-bac border-0 main-color"
            style={{ outline: "none" }}
            placeholder="what are you looking for?"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="main-color position-absolute end-0 top-50 translate-middle-y pe-3" />
        </div>
        <p className="main-color fs-3 red-bac mt-5 text-center main-rounded">Results</p>
        <div className="browseResult d-flex flex-column" style={{ gap: "10px" }}>
          {page === 1 ? displayData : displayData2}
        </div>
        {result.total_pages > page ? (
          <p onClick={showMore} className="showMore pointer fs-5 py-4 text-center" style={{ color: "#888" }}>
            show more
          </p>
        ) : (
          <p className="fs-5 mt-3 text-center" style={{ color: "#888" }}>
            No more results
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className="browse vh-100 root d-flex flex-column container position-relative py-5 pe-3 pe-xl-4">
        <div className="search position-relative">
          <input
            value={inp}
            onChange={(e) => {
              setFristReqFix(true);
              setInp(e.target.value);
              setPage(1);
            }}
            className="w-100 main-rounded ps-3 py-2 white-bac border-0 main-color"
            style={{ outline: "none" }}
            placeholder="what are you looking for?"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="main-color position-absolute end-0 top-50 translate-middle-y pe-3" />
        </div>
        <div className="main-color loading-bac fs-2 px-5 py-3 main-rounded position-absolute start-50 top-50 translate-middle" style={{ whiteSpace: "nowrap" }}>
          No Results
        </div>
      </div>
    );
  }
}
