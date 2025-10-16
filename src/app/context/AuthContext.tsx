import { createContext, useContext, useEffect, useState } from "react";
import { auth, waitForAuthInit } from "../services/firebase";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { Role, getUserRoleMock } from "../services/roles";

type AuthState = {
  user: User | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthState>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    waitForAuthInit().then((u) => {
      setUser(u);
      setRole(getUserRoleMock(u?.email ?? null));
      setLoading(false);
    });
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    if (!auth) {
      // fallback mock login when firebase not configured
      setUser({ email: email as any } as any);
      setRole(getUserRoleMock(email));
      setLoading(false);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
    const u = auth.currentUser;
    setUser(u);
    setRole(getUserRoleMock(u?.email ?? null));
    setLoading(false);
  }

  async function logout() {
    if (auth) await signOut(auth);
    setUser(null);
    setRole(null);
  }

  return (
    <Ctx.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() { return useContext(Ctx); }
