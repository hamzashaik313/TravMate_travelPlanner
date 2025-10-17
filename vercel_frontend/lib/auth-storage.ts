// "use client"

// type StoredUser = { name?: string; email?: string } | null

// const TOKEN_KEY = "travmate_token"
// const USER_KEY = "travmate_user"

// export function getStoredAuth(): { token: string | null; user: StoredUser } {
//   if (typeof window === "undefined") return { token: null, user: null }
//   const token = window.localStorage.getItem(TOKEN_KEY)
//   const userRaw = window.localStorage.getItem(USER_KEY)
//   const user = userRaw ? (JSON.parse(userRaw) as StoredUser) : null
//   return { token, user }
// }

// export function setStoredAuth(token: string, user: StoredUser) {
//   if (typeof window === "undefined") return
//   window.localStorage.setItem(TOKEN_KEY, token)
//   window.localStorage.setItem(USER_KEY, JSON.stringify(user ?? null))
// }

// export function clearStoredAuth() {
//   if (typeof window === "undefined") return
//   window.localStorage.removeItem(TOKEN_KEY)
//   window.localStorage.removeItem(USER_KEY)
// }

"use client";

// Defines the structure of the user object saved in local storage.
// This confirms we have 'name' and 'email' available.
type StoredUser = { name?: string; email?: string } | null;

const TOKEN_KEY = "travmate_token";
const USER_KEY = "travmate_user";

// Function to retrieve the stored data. This is what the components will call.
export function getStoredAuth(): { token: string | null; user: StoredUser } {
  if (typeof window === "undefined") return { token: null, user: null };

  const token = window.localStorage.getItem(TOKEN_KEY);
  const userRaw = window.localStorage.getItem(USER_KEY);
  const user = userRaw ? (JSON.parse(userRaw) as StoredUser) : null;

  // Returns the token and the user object ({name, email})
  return { token, user };
}

// Function to save the token and user data (called upon successful login/registration).
export function setStoredAuth(token: string, user: StoredUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user ?? null));
}

// Function to remove all stored authentication data (called on logout).
export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}
