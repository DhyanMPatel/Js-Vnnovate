import { LeadTable } from "../lead-table";

const mockLeads = [
  { id: "1", company: "TechCorp Solutions", contact: "Sarah Johnson", email: "sarah.j@techcorp.com", phone: "+1 (555) 123-4567", value: 45000, stage: "New", serviceType: "Cloud Migration", assignedTo: "John Doe", lastActivity: "2 hours ago", priority: "high" as const, source: "Website" },
  { id: "2", company: "Digital Dynamics", contact: "Mark Peterson", email: "mark.p@digitaldynamics.com", phone: "+1 (555) 234-5678", value: 28000, stage: "Contacted", serviceType: "Development", assignedTo: "Sarah Johnson", lastActivity: "5 hours ago", priority: "medium" as const, source: "Referral" },
  { id: "3", company: "Cloud Innovators", contact: "Emily Chen", email: "emily.c@cloudinnovators.com", phone: "+1 (555) 345-6789", value: 67000, stage: "Qualified", serviceType: "Consulting", assignedTo: "Mike Chen", lastActivity: "1 day ago", priority: "high" as const, source: "LinkedIn" },
];

export default function LeadTableExample() {
  return (
    <div className="p-4">
      <LeadTable leads={mockLeads} />
    </div>
  );
}
