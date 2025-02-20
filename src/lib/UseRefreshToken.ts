"use client"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "./features/api/apiSlice";
import { useRefreshTokenMutation } from "./features/api/apiSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      refreshTokenMutation({ refresh_token: refreshToken })
        .unwrap()
        .then((response) => {
          console.log("Access token refreshed successfully:", response);
        })
        .catch((error) => {
          console.error("Failed to refresh access token:", error);
        });
    }
  }, [dispatch, refreshTokenMutation]);
};

export default useRefreshToken;
