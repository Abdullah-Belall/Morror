"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CardMovie from "./CardMovie";

export default function ListsGet({ type }) {
  const [page, setPage] = useState("1");
  const [data, setData] = useState(null);
  const [displayData, sitDisplayData] = useState(null);
  const sessionId = Cookies.get("sessionId");
  useEffect(() => {
    let cancelToken;
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/account/21012830/${type}/movies`,
      params: {
        language: "en-US",
        page,
        session_id: sessionId,
        sort_by: "created_at.asc",
      },
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
      },
      cancelToken: new axios.CancelToken((c) => {
        cancelToken = c;
      }),
    };
    axios
      .request(options)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      });
    return () => {
      if (cancelToken) {
        cancelToken("Operation canceled by the user.");
      }
    };
  }, [page]);
  useEffect(() => {
    if (data) {
      let same = data.results.map((e) => {
        return (
          <div key={e.id} className="movieCardconLists">
            <CardMovie pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
      if (page == 1) {
        sitDisplayData(same);
      } else {
        sitDisplayData([...displayData, ...same]);
      }
    }
  }, [data]);
  function showMoreText() {
    if (data) {
      if (data.total_pages > page) {
        return (
          <p onClick={() => setPage(+page + 1)} className="showMore pointer fs-5 mt-3 text-center" style={{ color: "#888" }}>
            show more
          </p>
        );
      } else {
        return (
          <p className="fs-5 mt-3 text-center" style={{ color: "#888" }}>
            No more results
          </p>
        );
      }
    }
  }
  if (displayData) {
    if (data.total_results != 0) {
      return (
        <>
          <div className="d-flex flex-wrap" style={{ gap: "8px" }}>
            {displayData}
          </div>
          {showMoreText()}
        </>
      );
    } else {
      return <div className="main-color loading-bac fs-2 px-5 py-3 main-rounded position-absolute start-50 top-50 translate-middle">No {type === "favorite" ? "favorite" : "watchlist"} Movies</div>;
    }
  } else {
    return <div className="main-color loading-bac fs-2 px-5 py-3 main-rounded position-absolute start-50 top-50 translate-middle">No {type === "favorite" ? "favorite" : "watchlist"} Movies</div>;
  }
}
