import { useState,useEffect } from "react";

export default function ViewPhotoModal({ photoData, onClose }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const topStyle = screenWidth < 768 ? '25%' : null;

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg" style={{ overflowY: "auto", top: topStyle }}>
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center">
            <button
              type="button"
              className="border-warning border-3"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={photoData} className="img-fluid" alt="Full Size" />
          </div>
        </div>
      </div>
    </div>
  );
}
