import Image from "next/image";
import bgImg from "@/public/Images/bgImg.jpg";

export default function MainBgImg() {
  return (
    <div style={{ zIndex: "-1", height: "100vh" }} className="bgImageLayer position-fixed w-100 start-0 top-0">
      <Image className="bgImage w-100 h-100" fill style={{ objectFit: "cover" }} src={bgImg} alt="error" />
    </div>
  );
}
