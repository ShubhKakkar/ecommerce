import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

const Register = ({ session }) => {
  const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleRegister = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name) {
      toast.error("No name");
      return;
    }

    if (!email) {
      toast.error("No email");
      return;
    }

    if (!password) {
      toast.error("No password");
      return;
    }

    if (!confirmPassword) {
      toast.error("No confirm password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (validateEmail(email)) {
      // Sign Up and Sign In
      const data = {
        name,
        email,
        password,
      };
      try {
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        console.log(result);
        if (result.error) {
          toast.error(result.error);
        } else {
          router.push("/");
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please enter a valid email.");
      return;
    }
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Register</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full"
            ref={nameRef}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full"
            ref={emailRef}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full"
            ref={passwordRef}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="w-full"
            ref={confirmPasswordRef}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <button className="primary-button" onClick={handleRegister}>
            Register
          </button>
        </div>
        <div className="mb-4">
          Already have an account? &nbsp;
          <Link href="/auth/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
