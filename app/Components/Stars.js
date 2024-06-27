"use client";

// DONE

import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Stars({ stars }) {
  function handleStars() {
    let doneStars = stars.slice(0, 1);
    let shitStars = Array(stars.slice(2, 3));
    let starElements = [];
    if (doneStars != "") {
      for (let i = 0; i < +doneStars; i++) {
        starElements.push(<FontAwesomeIcon key={`type1 ${i}`} icon={faStar} style={{ color: "#f8b319" }} />);
      }
    }
    //
    let halfStar = [];
    if (+shitStars >= 4 && +shitStars <= 7) {
      halfStar.push(<FontAwesomeIcon key="star-half" icon={faStarHalfStroke} style={{ color: "#f8b319" }} />);
    } else if (shitStars > 7) {
      starElements.push(<FontAwesomeIcon key="star-full-extra" icon={faStar} style={{ color: "#f8b319" }} />);
    }
    //
    let starElements1 = [];
    if (doneStars != "0") {
      if (+shitStars < 4) {
        for (let i = 0; i < 5 - +doneStars; i++) {
          starElements1.push(<FontAwesomeIcon key={`type2 ${i}`} icon={faStar} style={{ color: "#494949" }} />);
        }
      } else {
        for (let i = 0; i < 5 - +doneStars - 1; i++) {
          starElements1.push(<FontAwesomeIcon key={`type3 ${i}`} icon={faStar} style={{ color: "#494949" }} />);
        }
      }
    }
    //
    let starElements2 = [];
    if (doneStars == "0") {
      for (let i = 0; i < 5; i++) {
        starElements2.push(<FontAwesomeIcon key={`type4 ${i}`} icon={faStar} style={{ color: "#494949" }} />);
      }
    }
    return [starElements, halfStar, starElements1, starElements2];
  }

  return <>{handleStars()}</>;
}
