// "use client";

// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import {
//   clearStoredAuth,
//   getStoredAuth,
//   setStoredAuth,
// } from "@/lib/auth-storage";

// type User = {
//   uid: any;
//   name?: string;
//   email?: string;
// } | null;

// type AuthContextValue = {
//   token: string | null;
//   user: User;
//   isAuthenticated: boolean;
//   hydrated: boolean;
//   login: (token: string, user: User) => void;
//   logout: () => void;
//   setUser: (user: User) => void;
// };

// const AuthContext = createContext<AuthContextValue | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User>(null);

//   // NEW: Tracks when localStorage has finished loading
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     const { token, user } = getStoredAuth();
//     if (token) setToken(token);
//     if (user) setUser(user);

//     setHydrated(true); // 🔥 Important
//   }, []);

//   const login = (newToken: string, newUser: User) => {
//     setToken(newToken);
//     setUser(newUser ?? null);
//     setStoredAuth(newToken, newUser ?? null);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     clearStoredAuth();
//   };

//   const value = useMemo(
//     () => ({
//       token,
//       user,
//       isAuthenticated: !!token,
//       hydrated,
//       login,
//       logout,
//       setUser,
//     }),
//     [token, user, hydrated]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
} from "@/lib/auth-storage";

/**
 * User type
 * - `uid` is optional (to support guest or local users)
 * - Supports `name` and `email` for profile display
 */
type User = {
  uid?: string;
  name?: string;
  email?: string;
} | null;

/**
 * Auth context value structure
 */
type AuthContextValue = {
  token: string | null;
  user: User;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);

  // Tracks when localStorage (or any persisted auth) has finished loading
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Load stored token + user from localStorage (via helper)
    const { token, user } = getStoredAuth();

    if (token) setToken(token);
    if (user) setUser(user);

    setHydrated(true); // ✅ ensures context consumers can render
  }, []);

  /**
   * Logs in the user and persists to localStorage
   */
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser ?? null);
    setStoredAuth(newToken, newUser ?? null);
  };

  /**
   * Logs out the user and clears from localStorage
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    clearStoredAuth();
  };

  /**
   * Memoized context value (to avoid unnecessary re-renders)
   */
  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      hydrated,
      login,
      logout,
      setUser,
    }),
    [token, user, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
