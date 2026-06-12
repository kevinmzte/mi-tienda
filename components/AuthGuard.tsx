"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({
  children,
}: Props) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    const logged =
      localStorage.getItem("logged");

    if (logged !== "true") {

      router.replace("/login");

      return;
    }

    setAuthorized(true);

  }, [router]);

  if (!authorized) {

    return null;

  }

  return <>{children}</>;

}