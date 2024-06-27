import "./globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Nav from "./Components/Nav";
import MainBgImg from "./Components/MainBgImg";
import { ClerkProvider } from "@clerk/nextjs";

config.autoAddCss = false;

export const metadata = {
  title: "Morror",
  description: "Movies website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="baba d-flex vw-100">
            <MainBgImg />
            <Nav />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
