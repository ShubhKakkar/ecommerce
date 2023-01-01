import Layout from "../components/Layout";
import { StoreProvider } from "../contexts/store";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </StoreProvider>
    </SessionProvider>
  );
}
