"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import images from "../../Data/images";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./login.module.css";

export default function SignInPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", {
        ...user,
        rememberMe,
      });
      console.log(response);

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py2">
      <Box className={styles.header_layout}>
        <Typography className={styles.header}>
          {loading ? "Loading" : "Sign in"}{" "}
        </Typography>
      </Box>
      <hr />
      <Box>
        <Box className={styles.email_box_label_layout}>
          <Typography className={styles.email_box_label}>
            Email address
          </Typography>
        </Box>
        <Box>
          <TextField
            className={styles.email_box}
            id="outlined-basic"
            variant="outlined"
            value={user.email}
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Box>
      </Box>
      <Box>
        <Typography className={styles.password_box_label}>Password</Typography>
        <TextField
          className={styles.password_box}
          id="outlined-basic"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Image
                  src={images.eyeIcon}
                  alt="show_pass_icon"
                  width="20"
                  height="20"
                  style={{
                    marginTop: "3px",
                    marginLeft: "1.86px",
                    cursor: "pointer",
                  }}
                  onClick={togglePassword}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className={styles.checkbox}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={rememberMe}
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
            />
          }
          className={styles.checkbox}
          label="Remeber me"
        />
      </Box>
      <Button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white
       font-bold py-2 px-4"
        onClick={onLogin}
      >
        {buttonDisabled ? "No sign in" : "Sign in"}
      </Button>
      <Link href="/signin">Open Signup Page</Link>
    </div>
  );
}
