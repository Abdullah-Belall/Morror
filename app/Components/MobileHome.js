"use client";
import { useEffect, useMemo, useState } from "react";
import MobileCard from "./MobileCard";
import axios from "axios";
import { v4 } from "uuid";
import MyPagination from "./Pagination";
import RequestsHub from "../_utils/RequestsHub";

export default function MobileHome() {
  const [allallMovies, setAllAllMovies] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getMobileHomePageMovies_ = () => {
      let page = 1;
      let cloneMovies = [];
      while (page <= 2) {
        RequestsHub.getMobileHomePageMovies(source.token, page)
          .then((res) => {
            cloneMovies.push(res.data.results);
            setAllAllMovies(cloneMovies.flat());
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log(`canceled by the user`);
            } else {
              console.log(err);
            }
          });
        page++;
      }
    };
    getMobileHomePageMovies_();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  // ==================================

  let displayDataForMobiles1 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(0, 10).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard id={e.id} poster={e.poster_path} />
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
            <MobileCard id={e.id} poster={e.poster_path} />
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
            <MobileCard id={e.id} poster={e.poster_path} />
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
            <MobileCard id={e.id} poster={e.poster_path} />
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
      <>
        <div className="d-flex flex-column gap-5 w-100">
          <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles1}</div>
          <div className="allMovies2 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles2}</div>
          <div className="allMovies3 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles3}</div>
          <div className="allMovies4 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles4}</div>
        </div>
        <MyPagination totalPages={498} />
      </>
    );
  }
  return (
    <div className="d-flex flex-column gap-5 w-100">
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
    </div>
  );
}
