import type { Metrics } from "./types";

/** Envia o arquivo CSV para a Azure Function /analyze-csv e retorna métricas. */
export async function analyzeOnAzure(file: File): Promise<Metrics> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${import.meta.env.VITE_AZURE_FN_URL}/analyze-csv`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Falha na análise (${res.status}) ${txt || ""}`.trim());
  }
  return res.json();
}
