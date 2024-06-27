"use client";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import RequestsHub from "@/app/_utils/RequestsHub";

export default function Login() {
  const [nextStep, setNextStep] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [approved, setArrroved] = useState(false);
  const [err, setErr] = useState([false, ""]);
  const router = useRouter();

  const goToApprove = () => {
    RequestsHub.goToApproveSessinId()
      .then((response) => {
        window.open("https://www.themoviedb.org/authenticate/" + response.data.request_token);
        setNextStep(response.data.request_token);
        setErr([false, ""]);
      })
      .catch(() => {
        setErr([true, "There is a problem please try again later..."]);
      });
  };

  function handleSessionId() {
    const payload = {
      request_token: nextStep,
    };
    axios
      .post("https://api.themoviedb.org/3/authentication/session/new?api_key=2c8cbe1d27ca2b0b671b01827a6fabf6", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSessionId(response.data.session_id);
      })
      .catch((err) => {
        console.error(err.response);
      });
    setArrroved(true);
  }
  useLayoutEffect(() => {
    if (sessionId && approved) {
      Cookies.set("sessionId", sessionId, { expires: 30 });
      setTimeout(() => {
        router.push("/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F");
      }, 2000);
    }
  }, [sessionId]);
  if (nextStep) {
    if (approved) {
      if (!sessionId) {
        return (
          <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
            <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
              <p className="main-color fs-3 text-center w-100">Unfortunately, something is wrong. Please make sure that you have approved the request on the TMDB website and try again.</p>
              <div
                onClick={() => {
                  setNextStep(null);
                  setArrroved(false);
                }}
                className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded"
              >
                Try again
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
            <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
              <p className="main-color fs-3 text-center w-100">Thank you, you will now be redirected to the login page</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
          <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
            <p className="main-color fs-3 text-center w-100">If you have authenticated on the TMDB website, click the button below</p>
            <div onClick={handleSessionId} className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded">
              Done
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
        <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
          <p className="main-color fs-3 text-center" style={{ maxWidth: "600px" }}>
            You should have an account at TMDB website, if you already have give us a primation to show your TMDB Account details. If you don't have an account,{" "}
            <Link href="/accessToSignup" style={{ color: "var(--red-color)" }}>
              click here
            </Link>
          </p>
          <div onClick={goToApprove} className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded">
            Give us a primation
          </div>
          {err[0] ? (
            <p className="text-danger mt-2" style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
              {err[1]}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
