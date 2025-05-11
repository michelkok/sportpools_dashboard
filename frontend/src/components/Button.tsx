import { useState } from "react";

export default function ExportButton() {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/run-export");
    const data = await res.json();
    setLogs(data.output || data.error);
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Running..." : "Export Data"}
      </button>
      {logs && (
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto">
          {logs}
        </pre>
      )}
    </div>
  );
}
