"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PlaceFinder() {
  const [city, setCity] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const search = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const safeCity = encodeURIComponent(city.trim());
      // const list = await apiFetch<string[]>(`/api/geoapify/places/${safeCity}`)
      const list = await apiFetch<string[]>(`/api/places/${safeCity}`);

      setResults(list || []);
    } catch (e: any) {
      toast({
        title: "Search failed",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Finder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a city (e.g., Paris)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="City name"
          />
          <Button onClick={search} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="max-h-64 overflow-auto rounded border p-2 text-sm">
          {results.length === 0 ? (
            <div className="text-muted-foreground">No results.</div>
          ) : (
            <ul className="list-disc pl-4">
              {results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
