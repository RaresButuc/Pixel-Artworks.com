import axios from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

import DefaultURL from "../utils/DefaultURL";

export default function RegisterPage() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [retypePass, setRetypePass] = useState("");

  const onSubmit = async (values) => {
    try {
      const id = toast.loading("Please Wait A Little Bit...");

      let response = await axios.post(`${DefaultURL}/auth/register`, values);

      toast.update(id, {
        render: "You Were Succesfully Registered!",
        type: "success",
        isLoading: false,
      });

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email, role: response.data.role },
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

    if (authenticateData.password === retypePass) {
      onSubmit(authenticateData);
    } else {
      toast.error(
        `You Didn't Rewrite The Password Correctly! Try Again Carefully!`,
        {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    }
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
                      Register
                    </h1>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="usernameInput"
                        name="usernameInput"
                        className="form-control form-control-lg"
                        required
                        placeholder="Username"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="emailInput"
                        name="emailInput"
                        className="form-control form-control-lg"
                        required
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="passwordInput"
                        name="passwordInput"
                        className="form-control form-control-lg"
                        required
                        placeholder="Password"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="retypePasswordInput"
                        className="form-control form-control-lg"
                        required
                        placeholder="Retype The Password"
                        onChange={(e) => {
                          setRetypePass(e.target.value);
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning btn-lg btn-block"
                    >
                      <b style={{ color: "white" }}>Register</b>
                    </button>

                    <hr className="my-4" />

                    <div className="text-center">
                      <p className="mb-0">Already A Member?</p>
                      <b>
                        <a
                          href="/register"
                          style={{ textDecoration: "none", color: "#2596be" }}
                        >
                          Log In Here
                        </a>
                      </b>
                    </div>
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
