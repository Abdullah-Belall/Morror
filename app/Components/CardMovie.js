"use client";
import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";

export default function CardMovie({ id, title, titfs, pad, rate, poster }) {
  let stars = String(Number(rate) / 2);
  return (
    <Link href={`/spmovie/${id}`}>
      <div data-id={`${id}`} className="movieCard main-rounded position-relative d-flex flex-column justify-content-between">
        <Image src={`https://image.tmdb.org/t/p/w500${poster}`} fill style={{ objectFit: "cover" }} className="main-rounded position-absolute start-0 top-0 w-100 h-100" alt="no image" />
        <div className="cardHead px-3 pt-3 d-flex flex-column justify-content-start position-relative">
          <h2 className={`main-color pointer ${titfs}`}>{title}</h2>
          <div className="stars d-flex gap-1">
            <Stars stars={stars} />
          </div>
        </div>
        <div className="cardActions position-relative d-flex gap-2 p-2">
          <div className={`mywatchnow fw-bold w-100 red-bac pointer text-dark main-rounded d-flex justify-content-center align-items-center ${pad}`} style={{ whiteSpace: "nowrap" }}>
            Watch Now
          </div>
        </div>
      </div>
    </Link>
  );
}
