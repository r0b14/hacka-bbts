import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../atoms/Logo';

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="nav-revolux">
        <div className="nav-inner container-revolux">
          <Logo />
          <div className="nav-links">
            {user ? (
              <>
                <span className="text-sm text-slate-600 mr-2">{user.email}</span>
                <button className="btn btn-ghost" onClick={logout}>Sair</button>
              </>
            ) : null}
          </div>
        </div>
      </header>
      <main className="container-revolux py-8">{children}</main>
    </div>
  );
}
