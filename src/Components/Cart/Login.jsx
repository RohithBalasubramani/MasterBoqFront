import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
// import LoginHooks from './Loginhooks';
import { Checkbox, Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Logo from "./Logo";
import axiosInstance from "../../Services/axiosins";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/actions/action";

const Container = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  text-transform: none;
`;

const Wrapper = styled.div`
  display: block;
  align-items: center;
`;

const PassCont = styled.div`
  font-family: Lexend;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.02em;
  text-align: left;
`;
const PassContfor = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;

  cursor: pointer;
  &:hover {
    font-weight: 500;
    text-decoration: underline;
    /* text-decoration: underline; */
  }
`;

const OrDisp = styled.div`
  font-family: Lexend;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #828282;
`;
const Title = styled.div`
  font-family: Lexend;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: #000000;
  display: inline-flex;
`;
const TitleSpan = styled.div`
  font-family: Lexend;
  font-size: 32px;
  font-weight: 500;
  line-height: 43px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    axiosInstance
      .post(`users/login/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("refresh_token", res.data.refresh);
        const accessToken = res.data.access;
        dispatch(loginSuccess({ accessToken }));

        axiosInstance.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        navigate("/");
        props.handleClose();
        //console.log(res);
        //console.log(res.data);
      });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>
            <Logo /> RENVISA
          </Title>
          <TitleSpan>Login</TitleSpan>
          {/* <LoginHooks/> */}

          <OrDisp>Welcome back, please Login to continue</OrDisp>
        </Wrapper>
        <PassCont>Username</PassCont>
        <TextField
          fullWidth
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        ></TextField>
        <PassCont>
          Password
          <PassContfor>
            <p>Forgot Password?</p>
          </PassContfor>
        </PassCont>
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        ></TextField>
        <PassCont>
          <Checkbox />
          <p>Remember me</p>
        </PassCont>
        <Button
          onClick={handleSubmit}
          sx={{
            color: "#F2DEBA",
            background: "#09193D",
            height: "7vh",
            fontSize: "3.5vh",
            fontWeight: "300",
            "&:hover": { background: "#11234d" },
          }}
          fullWidth
        >
          Login
        </Button>
      </Container>
    </>
  );
};

export default Login;
