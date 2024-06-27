import AllMovieReco from "@/app/Components/MovieReco";

export default async function recommend({ params }) {
  return <AllMovieReco params={params} />;
}
