import React from 'react';
import AuthShell from '../components/organisms/AuthShell';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <AuthShell>
      <div className="space-y-4">
        <h1>Dashboard</h1>
        <p>Logado como: <strong>{user?.email}</strong> ({user?.role})</p>
      </div>
    </AuthShell>
  );
}
