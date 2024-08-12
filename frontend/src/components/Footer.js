import FacebookIcon from "../images/social-media/FacebookIcon.png";
import InstagramIcon from "../images/social-media/InstagramIcon.png";
import XIcon from "../images/social-media/XIcon.png";
import websiteLogo from "../images/website-logo.png";

export default function Footer() {
  return (
    <div className="container-xl">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top ">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img
              src={websiteLogo}
              alt="Pixel-Artworks Logo"
              className="h-auto"
              style={{ width: 195 }}
            />
          </a>
          <span className="mb-3 mb-md-0" style={{ color: "white" }}>
            &copy; 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <img
                src={FacebookIcon}
                alt="facebookLogo"
                className="h-auto"
                style={{ width: 45 }}
              />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <img
                src={InstagramIcon}
                alt="instagramLogo"
                className="h-auto"
                style={{ width: 45 }}
              />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <img
                src={XIcon}
                alt="XLogo"
                className="h-auto"
                style={{ width: 45 }}
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
