import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSignIn } from "react-auth-kit";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

import DefaultURL from "../utils/DefaultURL";

export default function LoginPage() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const id = toast.loading("Please Wait A Little Bit...");

      let response = await axios.post(`${DefaultURL}/auth/login`, values);

      toast.update(id, {
        render: "You Were Succesfully Logged In!",
        type: "success",
        isLoading: false,
      });

      const decodedTokenUser = jwtDecode(response.data);
      
      signIn({
        token: response.data,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email, role: decodedTokenUser.role },
      });

      // setTimeout(() => {
      //   navigate("/portofolio");
      // }, 2000);
    } catch (err) {
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
                      Login
                    </h1>

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

                    <button
                      type="submit"
                      className="btn btn-warning btn-lg btn-block"
                    >
                      <b style={{ color: "white" }}>Log in</b>
                    </button>

                    <hr className="my-4" />

                    <div className="text-center">
                      <p className="mb-0">Not A Member Yet?</p>
                      <b>
                        <a
                          href="/register"
                          style={{ textDecoration: "none", color: "#2596be" }}
                        >
                          Register Here
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
