import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Rider } from "../types";

export function TeamChart({ riders }: { riders: Rider[] }) {
  // Aggregate points per user
  const aggregated = Object.values(
    riders.reduce((acc, rider) => {
      acc[rider.user] = acc[rider.user] || { user: rider.user, total: 0 };
      acc[rider.user].total += rider.points;
      return acc;
    }, {} as Record<string, { user: string; total: number }>)
  );

  // Sort the aggregated data by total points in descending order
  const sortedAggregated = aggregated.sort((a, b) => b.total - a.total);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Puntentelling</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedAggregated}>
          <XAxis
            dataKey="user"
            tick={{ fontSize: 10 }}
            interval={0} // Ensure that all labels are displayed
            padding={{ left: 20, right: 20 }} // Add padding for extra space
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value} points`} />
          <Bar
            dataKey="total"
            fill="#ec4899"
            barSize={25}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
