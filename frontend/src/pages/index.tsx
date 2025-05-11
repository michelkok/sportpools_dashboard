"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Rider } from "../types";
import { TeamChart } from "../components/TeamChart";
import { RiderStats } from "../components/RiderStats";
import ExportButton from "../components/Button";

export default function Home() {
  const [riders, setRiders] = useState<Rider[]>([]);

  const columnMapping = {
    // Mapping Dutch column names to English field names in the Rider object
    Gebruiker: "user",
    Renner: "name",
    Team: "team",
    Uitgevallen: "dnf",
    "": "cost",
    Eind: "gc_points",
    Berg: "mountain_points",
    Sprint: "sprint_points",
    Jongeren: "young_gc_points",
    Punten: "points",
  };

  useEffect(() => {
    fetch("riders.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<Rider>(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            const mappedData = result.data.map((row) => {
              const mappedRow: any = {};

              for (const key in row) {
                const mappedKey = columnMapping[key] || key;
                mappedRow[mappedKey] = row[key];
              }

              return mappedRow;
            });

            // Group by user
            const grouped: Record<string, Rider[]> = {};
            mappedData.forEach((rider) => {
              if (!grouped[rider.user]) grouped[rider.user] = [];
              grouped[rider.user].push(rider);
            });

            // Mark the last rider per user as the kluns
            const finalRiders = Object.values(grouped).flatMap((userRiders) => {
              const updated = userRiders.map((r, idx) => ({
                ...r,
                isKluns: false,
              }));
              updated[updated.length - 1].isKluns = true;
              return updated;
            });

            setRiders(finalRiders);
          },
        });
      });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-sans font-bold mb-4">goede morgen</h1>
      <TeamChart riders={riders} />
      <RiderStats
        title="Populairste renner"
        riders={riders.filter((r) => !r.isKluns)}
      />
      <RiderStats
        title="Populairste kluns"
        riders={riders.filter((r) => r.isKluns)}
      />
      <ExportButton />
    </main>
  );
}
