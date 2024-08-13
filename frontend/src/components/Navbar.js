import { Outlet } from "react-router-dom";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

import websiteLogo from "../images/website-logo.png";
import CurrentUserInfos from "../utils/CurrentUserInfos";
import noProfileImage from "../images/default-profile-image.png";

export default function Navbar() {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const currentUser = CurrentUserInfos();

  const handleLogOut = () => {
    setTimeout(() => {
      signOut();
    }, 500);
  };

  return (
    <div className="container" style={{ paddingBottom: 120 }}>
      <nav
        className="navbar navbar-custom fixed-top navbar-expand-md navbar-light shadow-5-strong container-xl border-bottom"
        style={{ backgroundColor: "#2596be", opacity: "0.9" }}
      >
        <div className="container-xl">
          <a className="navbar-brand" href="/">
            <img
              src={websiteLogo}
              alt="ourLogo"
              className="h-auto"
              style={{ maxWidth: 235 }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link fw-bold mx-2 mt-2"
                  aria-current="page"
                  href="/portofolio"
                  style={{ color: "white" }}
                >
                  <b>Portofolio</b>
                </a>
              </li>

              {isAuthenticated() ? (
                <>
                {currentUser?.role === "ADMIN" ?<li className="nav-item">
                    <a
                      className="nav-link fw-bold mx-2 mt-2"
                      aria-current="page"
                      href="/new-post"
                      style={{ color: "#fee466" }}
                    >
                      <b>New Post</b>
                    </a>
                  </li>:null}
                  
                  <li className="nav-item">
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={noProfileImage}
                          style={{
                            width: "40px",
                            height: "40px",
                            marginBottom: "0px",
                          }}
                        />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end border border-warning">
                        {currentUser?.role === "ADMIN" ? (
                          <li>
                            <h5
                              className="dropdown-item text-break"
                              href={`/new-post`}
                            >
                              Hello,
                              <br />
                              <b>{currentUser?.username}</b>
                            </h5>
                          </li>
                        ) : null}

                        <li>
                          <hr className="border border-warning" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="/profile/settings">
                            Account Settings
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" onClick={handleLogOut}>
                            Log Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mt-3">
                    <a
                      className="font-weight-bold mx-2"
                      aria-current="page"
                      href="/register"
                      style={{
                        border: "2px solid #fee466",
                        backgroundColor: "none",
                        padding: "10px",
                        textDecoration: "none",
                        color: "#fee466",
                        borderRadius: "15px",
                      }}
                    >
                      <b>Be Part Of My Community</b>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link fw-bold mx-2 mt-2"
                      aria-current="page"
                      href="/login"
                      style={{ color: "white" }}
                    >
                      Log In
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
