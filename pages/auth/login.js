import Link from "next/link";
import React, { useRef } from "react";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session  = await getSession(context);
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

const Login = ({ session }) => {
  console.log(session);
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      toast.error("No email");
      return;
    }

    if (!password) {
      toast.error("No password");
      return;
    }

    if (validateEmail(email)) {
      // Sign In
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result.error) {
          toast.error(result.error);
        }
        else{
          router.push('/');
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
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="webkoala1998@gmail.com"
            className="w-full"
            autoFocus
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full"
            autoFocus
            ref={passwordRef}
            required
          />
        </div>
        <div className="mb-4">
          <button
            className="primary-button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/auth/register">register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
