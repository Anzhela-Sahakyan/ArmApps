"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import styles from "./login.module.css";
export default function SignInPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
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
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </Box>

      <Button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white
       font-bold py-2 px-4"
        onClick={onLogin}
      >
        {buttonDisabled ? "No log in" : "Log in"}
      </Button>
      <Link href="/signin">Open Signin Page</Link>
    </div>
  );
}
