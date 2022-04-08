import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import registerUser from "../../service/auth/register.service";
import { setAuthPageToggle } from "../../store/user/slice";
import UniversalButton from "../global/universal-button";
import { StyleLessButton } from "./constants";
import ForgotPassword from "./forgotPassword";
import styles from "./styles/auth.module.scss";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = (data: any) => {
    console.log(data);
    
    registerUser(data.email, data.password,setError,clearErrors);
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
                minLength: 10,
                maxLength: 100,
                pattern: {
                  value: emailRegex,
                  message: "must be a valid email",
                },
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
                minLength: 3,
                maxLength: 50,
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
              REGISTER
            </UniversalButton>
          </div>
          </form>
            <div>
              <div style={{ marginTop: "50px" }}>
                Already have an account?
                <button
                  style={{ ...StyleLessButton, paddingLeft: "5px" }}
                  onClick={() => dispatch(setAuthPageToggle(false))}
                  >
                  Login
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
            </div>
          <ForgotPassword open={open} setOpen={setOpen} />
        </div>
      </>
  );
};

export default Register;
