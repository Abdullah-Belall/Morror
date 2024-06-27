import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import venom from "@/public/Images/venom.jpg";

export const metadata = {
  title: {
    default: "Sign up to Morror",
  },
  description: "Signup to Morror",
};
export default function Page() {
  return (
    <section>
      <Image src={venom} className="position-absolute start-0 top-0 vh-100 w-100" style={{ zIndex: "111" }} />
      <span className="position-absolute start-0 top-0 vh-100 w-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.590)", zIndex: "111" }}></span>
      <div className="clerkForm position-relative vh-100 d-flex justify-content-center align-items-center" style={{ zIndex: "111" }}>
        <SignUp />
      </div>
    </section>
  );
}
