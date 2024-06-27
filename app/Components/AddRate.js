"use client";
import { useUser } from "@clerk/nextjs";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import RequestsHub from "../_utils/RequestsHub";

export default function AddRate({ movieId }) {
  const [edit, setEdit] = useState(false);
  const [inp, setInp] = useState(undefined);
  const [err, setErr] = useState([false, ""]);
  const [debounc, setDebounc] = useState(null);
  const [debounc2, setDebounc2] = useState(null);
  const [ratedMovies, setRatedMovies] = useState(null);
  const { user } = useUser();
  let sessionId = Cookies.get("sessionId");
  function checkRate() {
    if (user) {
      if (debounc2) {
        clearTimeout(debounc2);
      }
      const timer = setTimeout(async () => {
        const checkRatedMovies_ = async () => {
          let page = 1;
          let totalPages = 1;
          let cloneRatedMovies = [];
          while (page <= totalPages) {
            try {
              let response = await RequestsHub.checkRatedMovies(page, sessionId);
              cloneRatedMovies.push(response.data.results);
              totalPages = response.data.total_pages;
              setRatedMovies(cloneRatedMovies.flat());
            } catch (err) {
              setEdit(true);
              console.error(err);
            }
            page++;
          }
        };
        checkRatedMovies_();
      }, 200);
      setDebounc2(timer);
    } else {
      setEdit(true);
    }
  }

  useLayoutEffect(() => {
    if (ratedMovies) {
      let trry = ratedMovies.find((e) => {
        e.id == movieId;
        if (e.id == movieId) {
          setInp(e.rating.toString());
        }
        setEdit(true);
      });
    }
  }, [ratedMovies]);

  function handleSend() {
    if (user) {
      if (+inp >= 1 && +inp <= 10) {
        if (debounc) {
          clearTimeout(debounc);
        }
        const timer = setTimeout(() => {
          setErr([true, "Loading..."]);
          const postNewRate_ = () => {
            RequestsHub.postNewRate(movieId, sessionId, inp)
              .then((response) => {
                if (response.data.status_message === "Success.") {
                  setErr([true, "Your rating was added successfully"]);
                } else {
                  setErr([true, "Your rating was updated successfully"]);
                }
                setTimeout(() => {
                  setEdit(false);
                  setErr([false, ""]);
                }, 2000);
              })
              .catch(() => {
                setErr([true, "There is somthing wronge please try again later"]);
              });
          };
          postNewRate_();
        }, 500);
        setDebounc(timer);
      } else {
        setErr([true, "Please enter a vaild rate"]);
      }
    } else {
      setErr([true, "Please Login first to rate this movie"]);
    }
  }

  if (edit) {
    return (
      <div className="position-relative">
        <div className="rating d-flex align-items-center gap-2 ps-2">
          <input value={inp} onChange={(e) => setInp(e.currentTarget.value)} className="loading-bac border-0 fs-5 red-color text-center" style={{ outline: "none", caretColor: "var(--red-color)", height: "25px", width: "30px" }} />
          <p className="red-color m-0 fw-bold fs-md-5">from 10</p>
          <div onClick={handleSend} className="sendAction pointer red-bac main-color px-sm-2 py-sm-1 main-rounded" style={{ fontSize: "12px" }}>
            Send
          </div>
          <div
            onClick={() => {
              setEdit(false);
              setErr([false, ""]);
            }}
            className="sendAction pointer red-bac main-color px-sm-2 py-sm-1 main-rounded"
            style={{ fontSize: "12px" }}
          >
            Cansel
          </div>
        </div>
        {err[0] ? (
          <div className="text-danger position-absolute start-0 ps-2" style={{ fontSize: "16px", bottom: "-25px", whiteSpace: "nowrap" }}>
            {err[1]}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <FontAwesomeIcon onClick={inp ? () => setEdit(true) : checkRate} icon={faPenToSquare} className="addRate ps-2 main-color pointer" />;
  }
}
