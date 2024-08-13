import axios from "axios";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

import DefaultURL from "../utils/DefaultURL";
import CurrentUserInfos from "../utils/CurrentUserInfos";

export default function NewPostPage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const currentUser = CurrentUserInfos();

  useEffect(() => {
    if (!isAuthenticated() || currentUser.role !== "ADMIN") {
      navigate("/error");
    }
  }, [currentUser, isAuthenticated()]);

  const onSubmit = async (values) => {
    try {
      const id = toast.loading("Please Wait A Little Bit...");

      let response = await axios.post(`${DefaultURL}/auth/register`, values);

      toast.update(id, {
        render: "You Were Succesfully Registered!",
        type: "success",
        isLoading: false,
      });

      setTimeout(() => {
        navigate("/portofolio");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
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
      email: formData.get("emailInput"),
      username: formData.get("usernameInput"),
      password: formData.get("passwordInput"),
    };

    onSubmit(authenticateData);
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
        <section className="container-xl vh-100">
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
                        id="usernameInput"
                        name="usernameInput"
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

                    <div className="form-outline mb-4">
                      <input
                        id="clientInput"
                        className="form-control form-control-lg"
                        placeholder="Client Link"
                      />
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
