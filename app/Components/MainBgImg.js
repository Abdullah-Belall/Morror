import Image from "next/image";
import bgImg from "@/public/Images/bgImg.jpg";

export default function MainBgImg() {
  return (
    <div style={{ zIndex: "-1", height: "100vh" }} className="bgImageLayer position-fixed w-100 start-0 top-0">
      <Image priority className="bgImage w-100 h-100" fill style={{ objectFit: "cover" }} src={"https://pub-7b3c4b6d7e7a4248b4faec6a06591b68.r2.dev/bgImg.jpeg"} alt="error" />
    </div>
  );
}
