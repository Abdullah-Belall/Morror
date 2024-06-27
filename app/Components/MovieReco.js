"use client";
import CardMovie from "@/app/Components/CardMovie";
import axios from "axios";
import Image from "next/image";
import bgImg from "@/public/Images/bgImg.jpg";
import BackButton from "@/app/Components/goBack";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import MyPagesLoad from "./MyPagesLoad";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import RequestsHub from "../_utils/RequestsHub";

export default function AllMovieReco({ params }) {
  const [isSmallScreen, setIsSmallScreen] = useState(null);
  const [recoMovies, setRecoMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(2);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getMovieReco_ = async () => {
      try {
        let recoResponse = await RequestsHub.getMovieReco(source.token, params.moviePage, 1);
        let needed = recoResponse.data.results;
        setRecoMovies(needed);
        setTotalPages(recoResponse.data.total_pages);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by user`);
        } else {
          router.push(`/spmovie/${params.moviePage}`);
        }
      }
    };
    getMovieReco_();
    return () => {
      source.cancel("operation canceled");
    };
  }, []);
  let disRecomed = useMemo(() => {
    if (recoMovies) {
      return recoMovies.map((e) => {
        return (
          <div key={e.id} className="movieCardconLists">
            <CardMovie id={e.id} pad={"px-5 py-3"} rate={e.vote_average} title={e.original_title} poster={e.poster_path} />;
          </div>
        );
      });
    }
  }, [recoMovies]);

  async function showMore() {
    let source = axios.CancelToken.source();
    if (totalPages >= page) {
      setIsLoading(true);
      try {
        let recoResponse = await RequestsHub.getMovieReco(source.token, params.moviePage, page);
        let needed = recoResponse.data.results;
        setRecoMovies(recoMovies.concat(needed));
        setPage(page + 1);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by user`);
        } else {
          console.error(err);
        }
      }
      setIsLoading(false);
    }
  }
  const loading = () => {
    let allLoading = [];
    for (let i = 0; i < 20; i++) {
      allLoading.push(
        <div key={v4()} className="movieCardconLists">
          <div className="loading-Ani loading-bac main-rounded w-100 h-100"></div>
        </div>
      );
    }
    return allLoading;
  };
  if (recoMovies) {
    return (
      <div className="recommendPage container d-flex flex-column px-4 py-5">
        <Image src={bgImg} fill alt="err" className="position-absolute start-0 w-100 h-100" style={{ zIndex: "-2" }} />
        <BackButton />
        <p className="main-color fs-3 red-bac mt-3 text-center main-rounded">Recommendations</p>
        <div className="d-flex flex-wrap position-relative" style={{ gap: "8px" }}>
          {disRecomed}
          {isloading ? isSmallScreen ? loading() : <MyPagesLoad /> : ""}
        </div>
        {totalPages < page ? (
          <p className="text-center m-0 mt-3" style={{ color: "#888" }}>
            no More Results
          </p>
        ) : (
          <p className="showMore pointer text-center m-0 mt-3" style={{ color: "#888" }} onClick={showMore}>
            show more
          </p>
        )}
      </div>
    );
  } else {
    if (isSmallScreen != null) {
      return isSmallScreen ? (
        <div className="root container mt-5 pt-5 d-flex flex-wrap gap-2 mt-3">{loading()}</div>
      ) : (
        <div className="root container mt-5 pt-5">
          <div className="allMovies d-flex flex-wrap gap-2">
            <MyPagesLoad />
          </div>
        </div>
      );
    }
  }
}
