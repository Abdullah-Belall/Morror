"use client";

import axios from "axios";
import CardMovie from "./CardMovie";
import MyPagination from "./Pagination";
import { useEffect, useState } from "react";
import MyPagesLoad from "./MyPagesLoad";
import RequestsHub from "../_utils/RequestsHub";

export default function HomePage() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getHomePageMovies_ = () => {
      RequestsHub.getHomePageMovies(source.token)
        .then((res) => {
          setResponse(res);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            console.log(err);
          }
        });
    };
    getHomePageMovies_();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  let displayData = () => {
    if (response) {
      return response.data.results.map((e) => {
        return (
          <div key={e.id} className="movieCardcon">
            <CardMovie pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    }
  };
  if (response) {
    return (
      <>
        <div className="allMovies d-flex flex-wrap">{displayData()}</div>
        <MyPagination totalPages={500} />
      </>
    );
  } else {
    return (
      <div className="allMovies d-flex flex-wrap gap-2">
        <MyPagesLoad />;
      </div>
    );
  }
}
