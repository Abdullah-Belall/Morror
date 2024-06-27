"use client";
import axios from "axios";
import MyPagination from "./Pagination";
import CardMovie from "./CardMovie";
import MyPagesLoad from "./MyPagesLoad";
import BackButton from "./goBack";
import { useEffect, useState } from "react";
import RequestsHub from "../_utils/RequestsHub";

export default function MoviePages({ pageNum }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getMobileHomePageMovies_ = () => {
      RequestsHub.getMobileHomePageMovies(source.token, pageNum)
        .then((response) => {
          setResponse(response);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(`axios =>` + err);
          } else {
            console.log(`simpleErr` + err);
          }
        });
    };
    getMobileHomePageMovies_();
    return () => {
      source.cancel("done yo bro");
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
    } else {
      return (
        <div className="allMovies d-flex flex-wrap gap-2">
          <MyPagesLoad />;
        </div>
      );
    }
  };

  return (
    <div className="root container" style={{ width: "calc(100% - 298px)" }}>
      <div className="mt-5">
        <BackButton />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mb-5 mt-4 gap-4">
        <div className="allMovies d-flex flex-wrap">{displayData()}</div>
        <MyPagination totalPages={500} pageNum={pageNum} />
      </div>
    </div>
  );
}
