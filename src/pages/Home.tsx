import React from 'react';
import LoginForm from '../components/molecules/LoginForm';
import AuthShell from '../components/organisms/AuthShell';

export default function Home() {
  return (
    <AuthShell>
      <section className="grid place-items-center py-12">
        <div className="card text-center">
          <h1 className="text-2xl mb-4">Bem-vindo ao Revolux</h1>
          <p className="text-sm text-slate-600 mb-6">Faça login para continuar</p>
          <LoginForm />
        </div>
      </section>
    </AuthShell>
  );
}
