import axios from "axios";
import CardMovie from "./CardMovie";
import Link from "next/link";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import RequestsHub from "../_utils/RequestsHub";

export default async function MovieReco({ paramsMovie }) {
  let source = axios.CancelToken.source();
  let recoResponse = await RequestsHub.getMovieReco(source.token, paramsMovie, 1);
  let needed = recoResponse.data.results.slice(0, 6);
  let disRecomed = needed.map((e) => {
    return (
      <div key={e.id} className="movieCardconReco">
        <CardMovie id={e.id} pad={"py-2"} rate={e.vote_average} titfs={"fs-4"} title={e.title} poster={e.poster_path} />;
      </div>
    );
  });
  if (recoResponse.data.results.length != 0) {
    return (
      <>
        <Link href={`/spmovie/${paramsMovie}/recommendations`}>
          <Button variant="text" className="MorelikeThis position-absolute pointer end-0 pe-4 d-flex align-items-center gap-2" style={{ color: "#888", top: "-7px" }}>
            More like This <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
        {disRecomed}
      </>
    );
  } else {
    return "";
  }
}
