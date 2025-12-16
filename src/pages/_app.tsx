// pages/_app.tsx
import type { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  // 🔑 Set synchronously on first render
  if (typeof window !== "undefined" && !window.APP_USER) {
    window.APP_USER = {
      firstName: "Cody",
    };
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
