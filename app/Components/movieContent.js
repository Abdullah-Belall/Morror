"use client";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import bgImg from "@/public/Images/bgImg.jpg";
import { Button, CircularProgress } from "@mui/material";
import AddTo from "./AddTo";
import AddRate from "./AddRate";
import Stars from "./Stars";
import Trail from "./Trailr";
import { useEffect, useLayoutEffect, useState } from "react";
import { v4 } from "uuid";
import RequestsHub from "../_utils/RequestsHub";

export default function MovieContent({ movieId }) {
  const [showTrailr, setShowTrailr] = useState(false);
  const [data, setData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(null);

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
    const getMovieContent_ = async () => {
      try {
        let response = await RequestsHub.getMovieContent(source.token, movieId);
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by the user`);
        } else {
          console.log(err);
        }
      }
    };
    getMovieContent_();
    return () => {
      source.cancel("operation canceled");
    };
  }, []);
  if (data) {
    let movieTitle = data.original_title;
    let poster = data.poster_path;
    let overView = data.overview;
    let date = data.release_date.slice(0, 4);
    let rate = data.vote_average;
    let genres = data.genres;
    let dGenres = genres.map((e) => {
      return (
        <p key={v4()} className="main-color mb-0 main-rounded" style={{ fontSize: "13px", padding: "0px 5px", backgroundColor: "#888" }}>
          {e.name}
        </p>
      );
    });
    let bg = data.backdrop_path;
    let stars = String(Number(rate) / 2);
    return (
      <>
        {showTrailr ? (
          <>
            <div onClick={() => setShowTrailr(false)} className="w-100 h-100 position-fixed top-50 start-50 translate-middle" style={{ backgroundColor: "rgba(0, 0, 0, 0.438)", zIndex: "11111111111" }}></div>
            <Trail movieId={movieId} />
          </>
        ) : (
          ""
        )}
        <Image src={bg ? `https://image.tmdb.org/t/p/w500` + bg : bgImg} fill alt="err" className="position-fixed start-0 w-100 h-100" style={{ zIndex: "-1" }} />
        <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: "-1", backgroundColor: "rgba(0, 0, 0, 0.63)" }}></div>
        <div className="moviePageContent d-flex flex-column align-items-center align-items-md-start">
          {isSmallScreen ? (
            <div className="mobilePoster border border-2 position-relative" style={{ width: "150px", minHeight: "230px" }}>
              <Image src={poster ? `https://image.tmdb.org/t/p/w500` + poster : ""} fill alt="No image" />
            </div>
          ) : (
            ""
          )}
          <h1 className="mt-4 main-color" style={{ maxWidth: "550px", fontSize: "64px" }}>
            {movieTitle}
          </h1>
          <p className="overView main-color normal mt-3" style={{ maxWidth: "350px", fontSize: "13px" }}>
            {overView}
          </p>
          <p className="release main-color normal mb-2" style={{ fontSize: "12px" }}>
            General release: {date}
          </p>
          <div className="stars d-flex align-items-center gap-1 mb-md-0 mb-3" style={{ height: "20px" }}>
            <Stars stars={stars} />
            <AddRate movieId={movieId} />
          </div>
          <div className="addtoWhat">
            <AddTo movieId={movieId} />
          </div>
          <div className="tags d-flex gap-2 mt-3 flex-wrap">{dGenres}</div>
          <div className="movieActionss d-flex align-items-center gap-3 mt-1 mb-2">
            <Button className="red-bac fs-md-5 d-flex align-items-center gap-2 main-color" variant="contained" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={faCirclePlay} />
              Play now
            </Button>
            <Button onClick={() => setShowTrailr(true)} className="fs-md-6 main-color" variant="contained" style={{ backgroundColor: "#888", fontSize: "13px" }}>
              Trailer
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="moviePage pb-4">
        <div className="position-absolute start-0 w-100 h-100" style={{ zIndex: "-1", backgroundColor: "rgba(0, 0, 0, 0.63)" }}></div>
        <div className="d-flex flex-column align-items-center align-items-md-start moviePageContent mt-5 pt-3">
          <div className="loading-Ani main-rounded d-md-none" style={{ width: "146px", height: "226px" }}></div>
          <h1 className="mt-5 p-3 loading-Ani main-rounded mb-0" style={{ width: "400px" }}></h1>
          <h1 className="p-3 loading-Ani main-rounded" style={{ width: "400px" }}></h1>
          <p className="mt-2 mb-0 p-3 loading-Ani main-rounded" style={{ width: "350px" }}></p>
          <p className="p-3 mb-0 loading-Ani main-rounded" style={{ width: "350px" }}></p>
          <p className="p-3 mb-0 loading-Ani main-rounded" style={{ width: "350px" }}></p>
          <p className="p-3 mb-0 loading-Ani main-rounded" style={{ width: "350px" }}></p>
          <p className="p-2 mt-2 mb-1 loading-Ani main-rounded" style={{ width: "150px" }}></p>
          <div className="d-flex gap-1">
            <p className="p-2 mb-1 loading-Ani main-rounded"></p>
            <p className="p-2 mb-1 loading-Ani main-rounded"></p>
            <p className="p-2 mb-1 loading-Ani main-rounded"></p>
            <p className="p-2 mb-1 loading-Ani main-rounded"></p>
            <p className="p-2 mb-1 loading-Ani main-rounded"></p>
          </div>
          <div className="d-flex gap-2">
            <p className="px-3 mb-1 py-3 loading-Ani main-rounded"></p>
            <p className="px-3 mb-1 py-3 loading-Ani main-rounded"></p>
          </div>
          <div className="d-flex gap-2">
            <p className="p-2 loading-Ani main-rounded mb-0" style={{ width: "70px" }}></p>
            <p className="p-2 loading-Ani main-rounded mb-0" style={{ width: "70px" }}></p>
            <p className="p-2 loading-Ani main-rounded mb-0" style={{ width: "70px" }}></p>
          </div>
          <div className="d-flex align-items-center gap-3 mt-1">
            <div className="loading-Ani main-rounded" style={{ width: "165px", height: "45px" }}></div>
            <div className="loading-Ani main-rounded" variant="contained" style={{ width: "100px", height: "40px" }}></div>
          </div>
        </div>
      </div>
    );
  }
}
