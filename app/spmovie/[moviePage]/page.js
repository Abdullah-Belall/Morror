import Criedts from "@/app/Components/criedts";
import BackButton from "@/app/Components/goBack";
import MovieContent from "@/app/Components/movieContent";
import MovieReco from "@/app/Components/MovieRecomenditions";

export default async function MoviePage(props) {
  const movieId = props.params.moviePage;
  return (
    <div className="moviePage2 pb-md-4 px-4 px-xxl-5 d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="mt-md-5 mt-3 mb-md-0 mb-3">
        <BackButton />
      </div>
      <div className="moviePage d-flex flex-column justify-content-md-between h-100">
        <div className="uppercontent d-flex justify-content-between ps-md-3">
          <MovieContent movieId={movieId} />
          <div className="criedtsScroll ps-3 mt-5 mt-md-0 mb-md-2 h-100 ms-md-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
            <div className="criedtsScroll2 d-flex flex-md-column gap-md-2">
              <Criedts movieId={movieId} />
            </div>
          </div>
        </div>
        <div className="recomedtion d-flex gap-2 position-relative overflow-hidden w-100 pe-3" style={{ height: "295px" }}>
          <div className="recomedtionScroll w-100 d-flex gap-2 overflow-x-scroll pt-4 overflow-y-hidden">
            <MovieReco paramsMovie={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
}
