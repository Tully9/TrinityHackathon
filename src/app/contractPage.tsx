"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Card, CardContent } from "@/components/ui/card";

export default function ContractAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString('base64'); // Convert ArrayBuffer to base64

      const response = await fetch('/api/analyse-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBuffer: base64String }),
      });
      

      const { text } = await response.json();
      setSummary(text);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the contract.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Analyzer</h1>

      <div className="mb-4">
        <Input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <div className="mb-4">
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Contract"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {summary && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Contract Summary</h2>
            <p>{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
