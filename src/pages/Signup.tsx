import SignupForm from "../components/molecules/SignupForm";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const nav = useNavigate();
  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Criar conta</h1>
        <p className="text-sm text-slate-600">Crie uma conta para testar o fluxo e verificar o banco de dados.</p>
      </header>
      <SignupForm onComplete={() => nav('/')} />
    </main>
  );
}
