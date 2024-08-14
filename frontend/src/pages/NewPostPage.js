import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";
import imageCompression from "browser-image-compression";

import DefaultURL from "../utils/DefaultURL";
import CurrentUserInfos from "../utils/CurrentUserInfos";
import PhotoInput from "../components/inputs/PhotoInput";

export default function NewPostPage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const token = useAuthHeader();

  const photo = useRef(null);

  const currentUser = CurrentUserInfos();

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.role !== "ADMIN" || !isAuthenticated()) {
        navigate("/error");
      }
    }
  }, [currentUser, isAuthenticated]);

  const onSubmit = async (values) => {
    const id = toast.loading("Please Wait A Little Bit...");

    try {
      const headers = { Authorization: token() };

      let response = await axios.post(`${DefaultURL}/post`, values, {
        headers,
      });

      const formData = new FormData();
      formData.append("file", photo.current.data);

      await axios.post(`${DefaultURL}/s3/upload/${response.data}`, formData, {
        headers,
      });

      toast.update(id, {
        render: "You Succesfully Made A New Post!",
        type: "success",
        isLoading: false,
      });

      // setTimeout(() => {
      //   navigate("/portofolio");
      // }, 2000);
    } catch (err) {
      console.log(err);
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const authenticateData = {
      title: formData.get("titleInput"),
      description: formData.get("descriptionInput"),
      link: formData.get("clientInput"),
    };

    if (photo.current !== null) {
      onSubmit(authenticateData);
    } else {
      toast.error("You Can't Make The Post Without Choosing One Photo!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleFileUpload = async (file) => {
    return await imageCompression(file, {
      maxSizeMB: 1,
      // maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <form onSubmit={onSave}>
        <section className="container-xl">
          <div className="container py-5 h-75">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong bg-white border-0 rounded-3"
                  style={{ boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="card-body p-5 text-center">
                    <h1 className="mb-5 fw-bold" style={{ color: "#2596be" }}>
                      Make A New Post
                    </h1>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="titleInput"
                        name="titleInput"
                        className="form-control form-control-lg"
                        required
                        placeholder="Title"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <textarea
                        id="descriptionInput"
                        name="descriptionInput"
                        className="form-control form-control-lg"
                        style={{ height: "200px" }}
                        required
                        placeholder="Description"
                      />
                    </div>

                    <div className="form-outline mb-5">
                      <input
                        id="clientInput"
                        name="clientInput"
                        className="form-control form-control-lg"
                        placeholder="Client Link"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <PhotoInput ref={photo} />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning btn-lg btn-block"
                    >
                      <b style={{ color: "white" }}>Post</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
