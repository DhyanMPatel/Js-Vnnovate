import { StatsCard } from "../stats-card";
import { TrendingUp } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="w-80 p-4">
      <StatsCard
        title="Total Revenue"
        value="$342,500"
        change="+12.5% from last month"
        changeType="positive"
        icon={TrendingUp}
      />
    </div>
  );
}
