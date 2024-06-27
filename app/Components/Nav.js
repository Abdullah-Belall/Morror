"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function Nav() {
  const { user } = useUser();
  const segment = useSelectedLayoutSegment();
  const sideBar = useRef();
  const menuBarIcon = useRef();
  function handleMenuBar() {
    if (sideBar.current.classList.contains("showon")) {
      sideBar.current.classList.remove("showon");
      menuBarIcon.current.style.cssText = "left: 0px !important; top: 200px;z-index: 99999";
    } else {
      menuBarIcon.current.style.cssText = "left: 160px !important; top: 200px;z-index: 99999";
      sideBar.current.classList.add("showon");
    }
  }
  function handleClickOutside(event) {
    if (sideBar.current && !sideBar.current.contains(event.target) && !menuBarIcon.current.contains(event.target)) {
      if (sideBar.current.classList.contains("showon")) {
        sideBar.current.classList.remove("showon");
        menuBarIcon.current.style.cssText = "left: 0px !important; top: 200px; z-index: 99999";
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div ref={menuBarIcon} onClick={handleMenuBar} className="menuBar d-md-none position-fixed start-0 px-2 red-bac rounded-end pointer main-color" style={{ top: "200px", zIndex: "99999" }}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <aside ref={sideBar} className="sideBar d-flex flex-column vh-100 start-0 top-0" style={{ zIndex: "11111" }}>
        <Link href={"/"}>
          <div className="logo">Morror</div>
        </Link>
        <div className="navContainer d-flex flex-column">
          <Link href={"/"} className={segment === null ? "NavActive" : ""}>
            <p className="mylinkspage normal">Home</p>
          </Link>
          <Link href={"/browes"} className={segment === "browes" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Browes</p>
          </Link>
          <Link href={"/favorite"} className={segment === "favorite" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Favorite</p>
          </Link>
          <Link href={"/watchlist"} className={segment === "watchlist" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Watchlist</p>
          </Link>
        </div>
        <div className="navFooter d-flex flex-column gap-2">
          {user ? (
            <div style={{ position: "relative", zIndex: "911111111111" }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <Link href="/accessToLogin" className={segment === "sign-in" ? "NavActive" : ""}>
                <p className="normal mylinkspage" style={{ fontSize: "18px" }}>
                  Log in
                </p>
              </Link>
              <Link href="/accessToSignup" className={segment === "sign-up" ? "NavActive" : ""}>
                <p className="normal mylinkspage" style={{ fontSize: "18px" }}>
                  Sign up
                </p>
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
