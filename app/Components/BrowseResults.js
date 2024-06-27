"use client";
import Image from "next/image";
import Stars from "./Stars";

// DONE

export default function BrowseResults({ id, poster, title, rate, date }) {
  let stars = String(Number(rate) / 2);
  return (
    <div className="browseRes d-flex w-100 border-bottom border-secondary pointer gap-3 overflow-hidden" style={{ maxHeight: "250px", backgroundColor: "rgba(255, 255, 255, 0.151)" }}>
      <Image src={`https://image.tmdb.org/t/p/w500${poster}`} width={100} height={120} alt="No Image" style={{ objectFit: "cover" }} />
      <div className="d-flex flex-column pt-3 ">
        <h3 className="main-color">{title}</h3>
        <div className="stars d-flex gap-1">
          <Stars stars={stars} />
        </div>
        <p className="pt-2" style={{ color: "#888" }}>
          {date}
        </p>
      </div>
    </div>
  );
}
