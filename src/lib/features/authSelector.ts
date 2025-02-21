import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


// Select the auth state
const selectAuth = (state: RootState) => state.auth;

// Memoized selector for user roles
export const selectUserRoles = createSelector(
  selectAuth,
  (auth) => auth.user?.roles || []
);

// Memoized selector for first name
export const selectFirstName = createSelector(
  selectAuth,
  (auth) => auth.user?.firstName || null
);

// Memoized selector for plan
export const selectPlan = createSelector(
    selectAuth,
    (auth) => auth.user?.plan || null
  );
  
