import { pipelineStages, users } from "@shared/schema";
import bcrypt from "bcryptjs";
import { db } from "./db";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing users
  await db.delete(users);

  // Hash password - using same password for all demo users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create users with proper hierarchy
  const createdUsers = await db.insert(users).values([
    // Admin
    {
      id: "user-admin-1",
      username: "admin",
      email: "admin@company.com",
      password: hashedPassword,
      name: "Admin User",
      role: "Admin",
      managerId: null,
      canViewFullLeadDetails: true,
      isActive: true,
    },
    // Sales Head
    {
      id: "user-head-1",
      username: "saleshead",
      email: "sarah.miller@company.com",
      password: hashedPassword,
      name: "Sarah Miller",
      role: "Sales Head",
      managerId: null,
      canViewFullLeadDetails: true,
      isActive: true,
    },
    // BDM 1
    {
      id: "user-bdm-1",
      username: "john.davis",
      email: "john.davis@company.com",
      password: hashedPassword,
      name: "John Davis",
      role: "BDM",
      managerId: "user-head-1",
      canViewFullLeadDetails: true,
      isActive: true,
    },
    // BDM 2
    {
      id: "user-bdm-2",
      username: "mike.johnson",
      email: "mike.johnson@company.com",
      password: hashedPassword,
      name: "Mike Johnson",
      role: "BDM",
      managerId: "user-head-1",
      canViewFullLeadDetails: true,
      isActive: true,
    },
    // BDE 1 - reports to BDM 1
    {
      id: "user-bde-1",
      username: "emma.wilson",
      email: "emma.wilson@company.com",
      password: hashedPassword,
      name: "Emma Wilson",
      role: "BDE",
      managerId: "user-bdm-1",
      canViewFullLeadDetails: false,
      isActive: true,
    },
    // BDE 2 - reports to BDM 1
    {
      id: "user-bde-2",
      username: "alex.brown",
      email: "alex.brown@company.com",
      password: hashedPassword,
      name: "Alex Brown",
      role: "BDE",
      managerId: "user-bdm-1",
      canViewFullLeadDetails: false,
      isActive: true,
    },
    // BDE 3 - reports to BDM 2
    {
      id: "user-bde-3",
      username: "lisa.anderson",
      email: "lisa.anderson@company.com",
      password: hashedPassword,
      name: "Lisa Anderson",
      role: "BDE",
      managerId: "user-bdm-2",
      canViewFullLeadDetails: false,
      isActive: true,
    },
    // BDE 4 - reports to BDM 2
    {
      id: "user-bde-4",
      username: "david.lee",
      email: "david.lee@company.com",
      password: hashedPassword,
      name: "David Lee",
      role: "BDE",
      managerId: "user-bdm-2",
      canViewFullLeadDetails: false,
      isActive: true,
    },
  ]).returning();

  const createdPipelineStages = await db.insert(pipelineStages).values([
    {
      id: "ace40ace-c848-4d00-a0db-f5aba25e8d10",
      name: "New Lead",
      color: "bg-blue-500",
      order: 1,
    },
    {
      id: "d3e42b3a-4765-4608-a64f-075b12447b87",
      name: "In - Conversation",
      color: "bg-purple-500",
      order: 2,
    },
    {
      id: "e5ebbdb6-c4da-4bbd-8dd6-d54645c3ccdb",
      name: "Proposal / Quotation Sent",
      color: "bg-green-500",
      order: 3,
    },
    {
      id: "f7f35053-51b7-440b-a8a2-b17a6bfb3b9f",
      name: "Negotiation / Discussion",
      color: "bg-yellow-500",
      order: 4,
    },
    {
      id: "ab2e47c1-9249-48e4-90ba-778c37e4af7e",
      name: "Won / Project Awarded",
      color: "bg-orange-500",
      order: 5,
    },
    {
      id: "cb94e238-5f2d-4e95-9d91-1225489afbc6",
      name: "Lost",
      color: "bg-red-500",
      order: 6,
    },
  ]).returning();

  console.log(`✅ Created ${createdUsers.length} users`);
  console.log(`✅ Stage Added ${createdPipelineStages.length}`)
  console.log("\nUser hierarchy:");
  console.log("Admin: Admin User");
  console.log("Sales Head: Sarah Miller");
  console.log("  BDM: John Davis");
  console.log("    BDE: Emma Wilson");
  console.log("    BDE: Alex Brown");
  console.log("  BDM: Mike Johnson");
  console.log("    BDE: Lisa Anderson");
  console.log("    BDE: David Lee");

  console.log("\n🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
