"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function signup() {
  const router = useRouter();
  function handle() {
    router.push("/accessToLogin");
  }

  return (
    <>
      <div className="container vh-100 gap-5 d-flex flex-column justify-content-center align-items-center">
        <p className="main-color fs-3 text-center" style={{ maxWidth: "600px" }}>
          First, you should register on the TMDB website. If you already have an account,{" "}
          <Link href="/accessToLogin" style={{ color: "var(--red-color)" }}>
            click here
          </Link>
        </p>
        <a onClick={handle} className="fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded" href="https://www.themoviedb.org/signup" target="_blank">
          Register
        </a>
      </div>
    </>
  );
}
