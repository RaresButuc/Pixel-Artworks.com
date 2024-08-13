import ArtistPhoto from "../images/home-page/artist-photo.png";

export default function HomePage() {
  return (
    <div className="container-xl">
      <div
        className="row d-flex align-items-center"
        style={{ marginTop: "7%", marginBottom: "5%" }}
      >
        <div className="col-xl-5 col-sm-12">
          <img
            className="img-fluid"
            src={ArtistPhoto}
            style={{ maxWidth: "550px" }}
          />
        </div>
        <div className="col-xl-7 col-sm-12" style={{ marginTop: "55px" }}>
          <hr
            style={{
              width: "50%",
              border: "2px solid #fee466",
              marginBottom: "25px",
              opacity: 1,
            }}
          />
          <h1
            style={{
              fontFamily: "Impact",
              color: "white",
              fontSize: "70px",
              marginBottom: "30px",
            }}
          >
            Hi, I'm Jamila Jackson!
          </h1>

          <h5
            className="mb-5"
            style={{ fontFamily: "Impact", color: "white", color: "#fee466" }}
          >
            In every piece, I pour a part of my soul, inviting you to see the
            world through my eyes.
          </h5>

          <div className="row d-flex justify-content-center">
            <a
              className="font-weight-bold mx-2 col-4"
              aria-current="page"
              href="/register"
              style={{
                backgroundColor: "#fc9c58",
                padding: "10px",
                textDecoration: "none",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <b>Contact Me</b>
            </a>
            <a
              className="font-weight-bold mx-2 col-4"
              aria-current="page"
              href="/register"
              style={{
                border: "2px solid #fee466",
                backgroundColor: "none",
                padding: "10px",
                textDecoration: "none",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <b>Browse My Portofolio</b>
            </a>
          </div>
          <hr
            style={{
              width: "50%",
              border: "2px solid #fee466",
              marginTop: "90px",
              opacity: 1,
              marginLeft: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
