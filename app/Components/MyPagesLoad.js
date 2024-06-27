// DONE LOADING

export default function MyPagesLoad() {
  let allLoad = [];
  for (let i = 0; i < 20; i++) {
    allLoad.push(
      <div key={i} className="movieCardcon">
        <div className="movieCard loading-bac main-rounded position-relative d-flex flex-column justify-content-between">
          <div className="cardHead px-3 pt-3 d-flex flex-column justify-content-start position-relative">
            <h2 className="p-3 loading-Ani main-rounded" style={{ width: "200px" }}></h2>
            <div className="d-flex gap-1">
              <p className="p-2 loading-Ani main-rounded"></p>
              <p className="p-2 loading-Ani main-rounded"></p>
              <p className="p-2 loading-Ani main-rounded"></p>
              <p className="p-2 loading-Ani main-rounded"></p>
              <p className="p-2 loading-Ani main-rounded"></p>
            </div>
          </div>
          <div className="d-flex gap-2 p-2">
            <div className="pointer loading-Ani px-4 py-3 main-rounded"></div>
            <div className={`w-100 main-rounded loading-Ani py-3`}></div>
          </div>
        </div>
      </div>
    );
  }
  return <>{allLoad}</>;
}
