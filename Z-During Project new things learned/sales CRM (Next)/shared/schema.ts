import { sql } from "drizzle-orm";
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("BDE"),
  managerId: varchar("manager_id"),
  profilePicture: text("profile_picture"),
  canViewFullLeadDetails: boolean("can_view_full_lead_details").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  name: true,
  role: true,
  managerId: true,
  profilePicture: true,
  canViewFullLeadDetails: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  country: text("country"),
  email: text("email"),
  phone: text("phone"),
  position: text("position").notNull(),
  companyName: text("company_name"),
  assignedTo: varchar("assigned_to").notNull(),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  skype: text("skype"),
  telegram: text("telegram"),
  linkedIn: text("linked_in"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).superRefine((data, ctx) => {
  // At least one contact method must be provided
  if (!data.email && !data.phone && !data.skype && !data.telegram && !data.linkedIn) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one contact method (email, phone, any other contact info, telegram, or linkedIn) is required",
      path: ["email"],
    });
  }
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  companyName: text("company_name"),
  country: text("country"),
  email: text("email"),
  phone: text("phone"),
  skype: text("skype"),
  telegram: text("telegram"),
  linkedIn: text("linked_in"),
  serviceType: text("service_type").notNull(),
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  stage: text("stage").notNull().default("New"),
  priority: text("priority").notNull().default("Medium"),
  source: text("source").notNull(),
  leadUrl: text("lead_url"),
  assignedTo: varchar("assigned_to").notNull(),
  createdBy: varchar("created_by").notNull(),
  description: text("description"),
  expectedCloseDate: text("expected_close_date"),
  primaryContactId: varchar("primary_contact_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  leadId: varchar("lead_id").notNull(),
  industry: text("industry"),
  size: text("size"),
  website: text("website"),
  primaryContactId: varchar("primary_contact_id"),
  convertedDate: timestamp("converted_date").notNull().defaultNow(),
  convertedBy: varchar("converted_by").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  convertedDate: true,
  createdAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  clientId: varchar("client_id").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  totalValue: decimal("total_value", { precision: 12, scale: 2 }).notNull(),
  estimationHours: decimal("estimation_hours", { precision: 10, scale: 2 }),
  documents: jsonb("documents").$type<{ name: string; url: string; uploadedAt: string }[]>().notNull().default(sql`'[]'::jsonb`),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  assignedTo: varchar("assigned_to").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  startDate: z.coerce.date(),
  endDate: z.union([
    z.coerce.date(),
    z.literal('').transform(() => undefined)
  ]).optional().nullable(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const changeRequests = pgTable("change_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  hours: decimal("hours", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  approvedAt: timestamp("approved_at"),
  approvedBy: varchar("approved_by"),
});

export const insertChangeRequestSchema = createInsertSchema(changeRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertChangeRequest = z.infer<typeof insertChangeRequestSchema>;
export type ChangeRequest = typeof changeRequests.$inferSelect;

export const milestones = pgTable("milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  name: text("name").notNull(),
  dueDate: timestamp("due_date").notNull(),
  completedDate: timestamp("completed_date"),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
  createdAt: true,
});

export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestones.$inferSelect;

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  paymentDate: timestamp("payment_date").notNull(),
  paymentMethod: text("payment_method").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  description: text("description").notNull(),
  activityDate: timestamp("activity_date").notNull().defaultNow(),
  leadId: varchar("lead_id"),
  clientId: varchar("client_id"),
  projectId: varchar("project_id"),
  userId: varchar("user_id").notNull(),
  attachments: text("attachments").array().notNull().default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
}).extend({
  activityDate: z.union([
    z.date(),
    z.string().transform((str) => new Date(str))
  ]).optional(),
});

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(),
  dueDate: timestamp("due_date").notNull(),
  assignedTo: varchar("assigned_to").notNull(),
  leadId: varchar("lead_id"),
  clientId: varchar("client_id"),
  projectId: varchar("project_id"),
  priority: text("priority").notNull().default("Medium"),
  status: text("status").notNull().default("pending"),
  description: text("description"),
  reminderSent: boolean("reminder_sent").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  dueDate: z.union([
    z.date(),
    z.string().transform((str) => new Date(str))
  ]),
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Pipeline Stages
export const pipelineStages = pgTable("pipeline_stages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  color: text("color").notNull(),
  order: integer("order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPipelineStageSchema = createInsertSchema(pipelineStages, {
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  order: z.number().int().min(0).optional()
});

export type InsertPipelineStage = z.infer<typeof insertPipelineStageSchema>;
export type PipelineStage = typeof pipelineStages.$inferSelect;

// Service Types (managed list similar to pipeline stages, without color)
export const serviceTypesTable = pgTable("service_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  color: text("color").notNull().default('bg-blue-500'),
  order: integer("order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertServiceTypeSchema = createInsertSchema(serviceTypesTable, {
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  order: z.number().int().min(0).optional(),
});

export type InsertServiceType = z.infer<typeof insertServiceTypeSchema>;
export type ServiceType = typeof serviceTypesTable.$inferSelect;

// Pipeline stages are stored as JSONB for flexibility
export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default('global-settings'),
  serviceTypes: jsonb("service_types").default([]),
  pipelineStages: jsonb("pipeline_stages").default([]),
  autoCreateClientOnWin: boolean("auto_create_client_on_win").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
}).extend({
  pipelineStages: z.array(z.string()).optional(),
});

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;