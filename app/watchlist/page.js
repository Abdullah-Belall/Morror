import ListsGet from "../Components/ListsGet";
export const metadata = {
  title: {
    default: "Watchlist",
  },
  description: "My watchlist Movies",
};
export default function watch() {
  return (
    <>
      <div className="container root position-relative" style={{ minHeight: "100vh" }}>
        <p className="main-color fs-3 red-bac mt-5 text-center main-rounded">Watchlist</p>
        <ListsGet type="watchlist" />
      </div>
    </>
  );
}
