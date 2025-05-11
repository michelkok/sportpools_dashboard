import { Rider } from "../types"; // Assuming you have a Rider type defined
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RiderStats({
  title,
  riders,
}: {
  title: string;
  riders: Rider[];
}) {
  // Find all chosen riders
  const allRiders = riders.filter((rider) => rider.name !== "");
  // Now count the number of times each rider has been selected
  const riderSelections: Record<string, number> = {};
  allRiders.forEach((rider) => {
    riderSelections[rider.name] = (riderSelections[rider.name] || 0) + 1;
  });

  // Sort riders by the number of times selected
  const sortedRiders = Object.entries(riderSelections)
    .sort(([, a], [, b]) => b - a)
    .map(([name, selections]) => ({
      name,
      selections,
    }));

  // Slice just the top 20 riders for visualization
  const topNRiders = sortedRiders.slice(0, 25); // Top 20 riders, you can change '20' to any number
  return (
    <div className="mb-8">
      <h2 className="text-xl font-sans font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topNRiders}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            angle={-30}
            textAnchor="end"
            interval={0} // Ensure that all labels are displayed
            padding={{ left: 20, right: 20 }}
            height={50}
          />
          <YAxis dataKey="selections" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value} points`} />
          <Bar
            dataKey="selections"
            fill="#ec4899"
            barSize={25}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
