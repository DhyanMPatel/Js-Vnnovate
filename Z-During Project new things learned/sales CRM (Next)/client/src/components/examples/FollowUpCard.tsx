import { FollowUpCard } from "../followup-card";

export default function FollowUpCardExample() {
  return (
    <div className="w-full max-w-2xl p-4">
      <FollowUpCard
        id="1"
        title="Send proposal presentation to client"
        dueDate="Dec 15, 2024"
        assignee="Sarah Johnson"
        priority="high"
        leadCompany="TechCorp Solutions"
      />
    </div>
  );
}
