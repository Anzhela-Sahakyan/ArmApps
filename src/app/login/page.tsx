"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import images from "../../Data/images";
import { ThemeProvider } from "@mui/system";
import theme from "@/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { combineClasses } from "@/utils/style.utils";
import { useTransition } from "react";

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

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const isButtonDisabled = !user.email || !user.password;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          ...user,
          rememberMe,
        }
      );

      if (response.status === 200) {
        setTimeout(() => router.push("/profile"), 1000);
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error: any) {
      console.error("error:::::", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.layout}>
        <Box className={styles.header_layout}>
          <Typography className={styles.header}>
            {loading ? "Loading" : "Sign in"}{" "}
          </Typography>
        </Box>

        {errorMessage && (
          <Box className={styles.error_msg_layout}>
            <Typography className={styles.error_msg} color="error">
              Sign in failed. Please enter correct email and password.
            </Typography>
          </Box>
        )}

        <Box>
          <Box>
            <Typography className={styles.email_box_label}>
              Email address
            </Typography>
          </Box>
          <Box>
            <TextField
              className={combineClasses(
                styles.input_box,
                errorMessage ? styles.error_borders : undefined
              )}
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={user.email}
              type="text"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Box>
        </Box>
        <Box>
          <Typography className={styles.password_box_label}>
            Password
          </Typography>
          <TextField
            className={combineClasses(
              styles.input_box,
              errorMessage ? styles.error_borders : undefined
            )}
            size="small"
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
            label="Remember me"
          />
        </Box>
        <Button
          disabled={isButtonDisabled}
          className={combineClasses(
            styles.btn,
            isButtonDisabled ? styles.btn_disabled : undefined
          )}
          sx={{ color: "white" }}
          onClick={onLogin}
        >
          Sign in
        </Button>
        <Link href="/signin">Open Signup Page</Link>
      </Box>
    </Box>
  );
}
