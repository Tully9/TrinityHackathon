"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Scale, BookOpen } from "lucide-react";

// Simulated AI function (in a real app, this would be an API call to a backend service)
const analyzeContract = (file: File) => {
  return {
    summary: {
      rent: `$${Math.floor(Math.random() * 1000 + 1000)} per month`,
      duration: `${Math.floor(Math.random() * 12 + 6)} months`,
      securityDeposit: `$${Math.floor(Math.random() * 1000 + 1000)}`,
      penalties: `Late fee of $${Math.floor(Math.random() * 50 + 25)} after 5 days`,
      responsibilities: "Tenant responsible for utilities and minor repairs",
    },
    score: Math.floor(Math.random() * 20 + 80),
  };
};

interface ContractSummary {
  rent: string;
  duration: string;
  securityDeposit: string;
  penalties: string;
  responsibilities: string;
}

interface ContractAnalysis {
  summary: ContractSummary;
  score: number;
  name: string;
}

export default function ContractAnalyzer() {
  const [numHouses, setNumHouses] = useState<number>(0);
  const [contracts, setContracts] = useState<ContractAnalysis[]>([]);
  const [showUpload, setShowUpload] = useState<boolean>(false);

  const handleNumHousesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value, 10);
    setNumHouses(num);
    setContracts([]);
    setShowUpload(num > 0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const analysis = analyzeContract(file);
      const newContracts: ContractAnalysis[] = [...contracts];
      newContracts[index] = { name: file.name, ...analysis };
      setContracts(newContracts);
    }
  };

  // Define valid keys for summary
  const summaryKeys: (keyof ContractSummary)[] = [
    'rent',
    'duration',
    'securityDeposit',
    'penalties',
    'responsibilities',
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rental Contract Analyzer</h1>

      <div className="mb-6">
        <Label htmlFor="num-houses" className="block mb-2">
          How many houses do you want to compare?
        </Label>
        <Input
          id="num-houses"
          type="number"
          min="0"
          value={numHouses}
          onChange={handleNumHousesChange}
          className="max-w-xs"
        />
      </div>

      {showUpload && (
        <div className="mb-6 space-y-4">
          {[...Array(numHouses)].map((_, index) => (
            <div key={index}>
              <Label htmlFor={`contract-upload-${index}`} className="block mb-2">
                Upload Contract for House {index + 1}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={`contract-upload-${index}`}
                  type="file"
                  onChange={(e) => handleFileUpload(e, index)}
                  className="flex-grow"
                />
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {contracts.length > 0 && (
        <Tabs defaultValue="summaries" className="w-full">
          <TabsList>
            <TabsTrigger value="summaries">
              <FileText className="mr-2 h-4 w-4" />
              Summaries
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <Scale className="mr-2 h-4 w-4" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="simplified">
              <BookOpen className="mr-2 h-4 w-4" />
              Simplified Terms
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summaries">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contracts.map((contract, index) => (
                contract && (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{contract.name}</CardTitle>
                      <CardDescription>Contract Score: {contract.score}/100</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside">
                        {/* Use predefined summaryKeys */}
                        {summaryKeys.map((key) => (
                          <li key={key} className="capitalize">
                            <span className="font-semibold">{key}:</span> {contract.summary[key]}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </TabsContent>
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Contract Comparison</CardTitle>
                <CardDescription>Side-by-side comparison of uploaded contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2">Term</th>
                        {contracts.map((contract, index) => (
                          contract && (
                            <th key={index} className="border p-2">
                              {contract.name}
                            </th>
                          )
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contracts[0] && summaryKeys.map((key) => (
                        <tr key={key}>
                          <td className="border p-2 font-semibold capitalize">{key}</td>
                          {contracts.map((contract, index) => (
                            contract && (
                              <td key={index} className="border p-2">
                                {contract.summary[key]}
                              </td>
                            )
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
