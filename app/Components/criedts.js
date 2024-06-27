import { Avatar } from "@mui/material";
import RequestsHub from "../_utils/RequestsHub";

export default async function Criedts({ movieId }) {
  let response = await RequestsHub.getMovieCredits(movieId);
  let allCriedts = response.data.cast.map((e) => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center gap-1">
        <Avatar sx={{ width: 56, height: 56 }} alt={e.name} src={`https://image.tmdb.org/t/p/w500` + e.profile_path} />
        <p className="holaAmigo main-color" style={{ whiteSpace: "nowrap" }}>
          {e.name}
        </p>
      </div>
    );
  });
  return <>{allCriedts}</>;
}
