"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  useEffect(() => {
    setIsPasswordValid(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/.test(
        user.password
      )
    );
    setIsEmailValid(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email));
  }, [user]);
  const onSignin = async () => {
    try {
      if (!isEmailValid && !isPasswordValid) {
        console.log("invalid email or password");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message, "sign up failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEmailValid && isPasswordValid && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py2">
      <h1 className="text-center text-2xl m-2">
        {loading ? "Loading" : "Sign In"}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-600 text-black "
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          const newEmail = e.target.value;
          setUser({ ...user, email: newEmail });
          setIsEmailValid(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail)
          );
        }}
        placeholder="email"
      />
      {!isEmailValid && user.email.length > 0 && (
        <p className="text-red-500">Please enter a valid email address</p>
      )}
      <label htmlFor="password">password</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          const newPassword = e.target.value;
          setUser({ ...user, password: e.target.value });
          setIsPasswordValid(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/.test(
              newPassword
            )
          );
        }}
        placeholder="password"
      />
      {!isPasswordValid && user.password.length > 0 && (
        <p className="text-red-500">Please enter a valid password</p>
      )}
      <button
        onClick={onSignin}
        className="p-2 border-black-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Sign In" : "Sign In"}
      </button>
      <Link href="/login"> Open Login Page</Link>
    </div>
  );
}
