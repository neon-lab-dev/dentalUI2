"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/store/slices/userSlice";

export default function Rehydration({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Rehydrate user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser?.isLoggedIn) {
      dispatch(setUser(savedUser));
    }
  }, [dispatch]);

  return <>{children}</>;
}
