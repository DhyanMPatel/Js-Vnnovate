import { LeadCard } from "../lead-card";

export default function LeadCardExample() {
  return (
    <div className="w-80 p-4">
      <LeadCard
        id="1"
        company="TechCorp Solutions"
        contact="Sarah Johnson"
        value={45000}
        serviceType="Cloud Migration"
        assignedTo="John Doe"
        priority="high"
      />
    </div>
  );
}
