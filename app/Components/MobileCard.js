import Image from "next/image";
import Link from "next/link";

export default function MobileCard({ id, poster }) {
  return (
    <Link href={`/spmovie/${id}`}>
      <div className="mobileCard position-relative main-rounded pointer overflow-hidden w-100 h-100">
        <Image src={`https://image.tmdb.org/t/p/w500${poster}`} fill style={{ objectFit: "cover" }} className="main-rounded position-absolute start-0 top-0 w-100 h-100" alt="no image" />
        <div className="w-100 h-100 main-rounded position-absolute top-0 start-0" style={{ background: "rgba(0, 0, 0, 0.63)", background: "linear-gradient(to top, rgba(0, 0, 0, 0.63) 0%, rgba(0, 0, 0, 0.247) 100%)" }}></div>
      </div>
    </Link>
  );
}
