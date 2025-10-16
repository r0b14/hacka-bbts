import { useState } from "react";
import { createAccount } from "../../app/services/authService";

export default function SignupForm({ onComplete }: { onComplete?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createAccount(email, password);
      onComplete?.();
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Senha</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded" disabled={loading}>
          {loading ? "Criando…" : "Criar conta"}
        </button>
      </div>
    </form>
  );
}
