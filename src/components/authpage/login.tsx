import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import login from "../../service/auth/login.service";
import { setAuthPageToggle } from "../../store/user/slice";
import UniversalButton from "../global/universal-button";
import { StyleLessButton } from "./constants";
import ForgotPassword from "./forgotPassword";

import styles from "./styles/auth.module.scss";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  function onSubmit(data: any) {
    login(data.email, data.password,setError);
  }

  return (
    <>
          <div
    style={{textAlign: 'center'}}
    >
      <form 
      onSubmit={handleSubmit(onSubmit)} 
      style={{ padding: "30px" }}>
        <div>
          <input
            className={styles["input-container"]}
            placeholder="Email"
            type="text"
            {...register("email", {
              required: true,
            })}
            autoComplete="off"
          />
        </div>

        <div>
          <input
            className={styles["input-container"]}
            placeholder="Password"
            type="password"
            autoComplete="on"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <div
        style={{color: "red",marginBottom:25}}
        >
            {errors?.password?.message}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UniversalButton
            height={30}
            width={200}
            // handleClick={() => onSubmit}
            selected={true}
            type="submit"
          >
            LOGIN
          </UniversalButton>
        </div>
          </form>
            <div>
                </div>
              <div style={{ marginTop: "50px" }}>
                Don't have an account, yet?
                <button
                  style={{ ...StyleLessButton, paddingLeft: "5px" }}
                  onClick={() => dispatch(setAuthPageToggle(true))}
                >
                  Register
                </button>
              </div>
              <div style={{ marginTop: "5px" }}>
                Forgot Password?
                <button
                  style={{ ...StyleLessButton, paddingLeft: "5px" }}
                  onClick={() => setOpen(true)}
                >
                  Reset
                </button>
              </div>
              <ForgotPassword open={open} setOpen={setOpen} />
            </div>
    </>
  );
};

export default Login;
