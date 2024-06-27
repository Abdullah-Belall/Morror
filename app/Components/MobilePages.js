"use client";
import { useEffect, useMemo, useState } from "react";
import MobileCard from "./MobileCard";
import axios from "axios";
import MyPagination from "./Pagination";
import { v4 } from "uuid";
import BackButton from "./goBack";
import RequestsHub from "../_utils/RequestsHub";

export default function MobilePages({ pageNum }) {
  const [allallMovies, setAllAllMovies] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getMobileHomePageMovies_ = async () => {
      try {
        let page = +pageNum + 1;
        let neededPages = +pageNum + 2;
        let cloneMovies = [];
        while (page <= neededPages) {
          let response = await RequestsHub.getMobileHomePageMovies(source.token, page);
          cloneMovies.push(response.data.results);
          page++;
        }
        setAllAllMovies(cloneMovies.flat());
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by the user`);
        } else {
          console.log(err);
        }
      }
    };
    getMobileHomePageMovies_();
    return () => {
      source.cancel("operation canceled");
    };
  }, []);

  // ==================================
  let displayDataForMobiles1 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(0, 10).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles2 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(10, 20).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles3 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(20, 30).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles4 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(30, 40).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);

  const loading = () => {
    let allLoading = [];
    for (let i = 0; i < 4; i++) {
      allLoading.push(
        <div key={v4()} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
          <div className="loading-Ani loading-bac main-rounded w-100 h-100"></div>
        </div>
      );
    }
    return allLoading;
  };
  if (allallMovies) {
    return (
      <div className="root container mt-5 overflow-hidden">
        <div className="ps-3">
          <BackButton />
        </div>
        <div className="w-100 d-flex flex-column align-items-center overflow-hidden mb-5 mt-4">
          <div className="w-100 d-flex flex-column gap-5 mb-5 overflow-hidden" style={{ width: "calc(100% - 298px)" }}>
            <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles1}</div>
            <div className="allMovies2 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles2}</div>
            <div className="allMovies3 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles3}</div>
            <div className="allMovies4 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles4}</div>
          </div>
          <MyPagination pageNum={pageNum} totalPages={498} />
        </div>
      </div>
    );
  }
  return (
    <div className="root container d-flex flex-column gap-5 w-100 mt-5 overflow-hidden">
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll mt-4">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
    </div>
  );
}
