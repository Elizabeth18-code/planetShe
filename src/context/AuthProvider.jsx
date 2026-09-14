import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth, isFirebaseConfigured } from "../firebase.js";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(() => !isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return undefined;
    }

    const app = getFirebaseApp();
    const auth = getFirebaseAuth();
    if (!app || !auth) {
      const t = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(t);
    }

    const db = getFirestore(app);

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(db, "admin_users", u.uid));
          setIsAdmin(Boolean(snap.exists && snap.data()?.active === true));
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setReady(true);
    });

    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      ready,
      firebaseOk: isFirebaseConfigured(),
      async signIn(email, password) {
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase não configurado.");
        await signInWithEmailAndPassword(auth, email, password);
      },
      async signOut() {
        const auth = getFirebaseAuth();
        if (!auth) return;
        await firebaseSignOut(auth);
      },
    }),
    [user, isAdmin, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
