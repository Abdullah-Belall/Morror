// DONE

import ListsGet from "../Components/ListsGet";
export const metadata = {
  title: {
    default: "Favorite",
  },
  description: "My favorite Movies",
};
export default function fav() {
  return (
    <>
      <div className="container root position-relative" style={{ minHeight: "100vh" }}>
        <p className="main-color fs-3 red-bac mt-5 text-center main-rounded">Favoritelist</p>
        <ListsGet type="favorite" />
      </div>
    </>
  );
}
