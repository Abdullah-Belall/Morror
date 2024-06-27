export default function loading() {
  return (
    <>
      <div className="loader position-absolute top-50 start-50 translate-middle">
        <span className="loader-text position-absolute top-0 fs-5">loading</span>
        <span className="load"></span>
      </div>
    </>
  );
}
