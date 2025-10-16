import { Protected } from "../components/Protected";
import Navbar from "../components/Navbar";
import FileDrop from "../components/FileDrop";
import CsvTable from "../components/CsvTable";
import { useState } from "react";
import type { Role } from "../../app/services/roles";

export default function UploadCsv() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Protected allow={["admin","gestor"] as Role[]}>
      <Navbar />
      <main className="mx-auto max-w-6xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Upload de CSV</h1>
        <FileDrop onFile={setFile} />
        {file && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Preview</h2>
            <CsvTable file={file} />
          </div>
        )}
      </main>
    </Protected>
  );
}
