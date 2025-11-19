import {
  activities, type Activity, type ChangeRequest, changeRequests, type Client, clients, type Contact, contacts, type InsertActivity, type InsertChangeRequest, type InsertClient, type InsertContact, type InsertLead, type InsertMilestone, type InsertPayment, type InsertProject, type InsertSettings, type InsertTask, type InsertUser,
  type Lead, leads, type Milestone, milestones, type Payment, payments, type PipelineStage, pipelineStages, type Project, projects, type Settings, settings as settingsTable, type Task, tasks, type User, users,
  serviceTypesTable, type ServiceType
} from '@shared/schema';

import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  // Lead methods
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, data: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  // Client methods
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, data: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;

  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Milestone methods
  getMilestones(projectId?: string): Promise<Milestone[]>;
  getMilestone(id: string): Promise<Milestone | undefined>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: string, data: Partial<InsertMilestone>): Promise<Milestone | undefined>;
  deleteMilestone(id: string): Promise<boolean>;

  // Payment methods
  getPayments(projectId?: string): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, data: Partial<InsertPayment>): Promise<Payment | undefined>;
  deletePayment(id: string): Promise<boolean>;

  // Activity methods
  getActivities(leadId?: string, clientId?: string): Promise<Activity[]>;
  getActivity(id: string): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, data: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: string): Promise<boolean>;

  // Task methods
  getTasks(filters?: {
    assignedTo?: string;
    leadId?: string;
    clientId?: string;
    status?: string;
    dueDateFrom?: Date;
    dueDateTo?: Date;
  }): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, data: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  markTaskComplete(id: string): Promise<Task | undefined>;

  // Pipeline Stage methods
  getPipelineStages(): Promise<PipelineStage[]>;
  getPipelineStage(id: string): Promise<PipelineStage | undefined>;
  createPipelineStage(stage: { name: string; color: string }): Promise<PipelineStage>;
  updatePipelineStage(id: string, data: { name?: string; color?: string; order?: number }): Promise<PipelineStage | undefined>;
  deletePipelineStage(id: string): Promise<boolean>;
  reorderPipelineStages(orderedIds: string[]): Promise<boolean>;

  // Service Type methods
  getServiceTypes(): Promise<ServiceType[]>;
  getServiceType(id: string): Promise<ServiceType | undefined>;
  createServiceType(data: { name: string }): Promise<ServiceType>;
  updateServiceType(id: string, data: { name?: string; order?: number }): Promise<ServiceType | undefined>;
  deleteServiceType(id: string): Promise<boolean>;
  reorderServiceTypes(orderedIds: string[]): Promise<boolean>;

  // Settings methods
  getSettings(): Promise<Settings>;
  updateSettings(data: Partial<InsertSettings>): Promise<Settings>;

  // Change Request methods
  getChangeRequests(projectId?: string): Promise<ChangeRequest[]>;
  getChangeRequest(id: string): Promise<ChangeRequest | undefined>;
  createChangeRequest(changeRequest: InsertChangeRequest): Promise<ChangeRequest>;
  updateChangeRequest(id: string, data: Partial<InsertChangeRequest>): Promise<ChangeRequest | undefined>;
  deleteChangeRequest(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      ...insertUser,
      role: insertUser.role || "BDE",
      canViewFullLeadDetails: insertUser.canViewFullLeadDetails || false,
    }).returning();
    return result[0];
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async deleteUser(id: string): Promise<boolean> {
    await db.delete(users).where(eq(users.id, id));
    return true;
  }

  // Lead methods
  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0];
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(lead).returning();
    return result[0];
  }

  async updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined> {
    const result = await db.update(leads).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(leads.id, id)).returning();
    return result[0];
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return true;
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0];
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async updateContact(id: string, data: Partial<InsertContact>): Promise<Contact | undefined> {
    const result = await db.update(contacts).set(data).where(eq(contacts.id, id)).returning();
    return result[0];
  }

  async deleteContact(id: string): Promise<boolean> {
    await db.delete(contacts).where(eq(contacts.id, id));
    return true;
  }

  // Client methods
  async getClients(): Promise<Client[]> {
    return db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, data: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db.update(clients).set(data).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    await db.delete(clients).where(eq(clients.id, id));
    return true;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db.update(projects).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(projects.id, id)).returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    await db.delete(projects).where(eq(projects.id, id));
    return true;
  }

  // Milestone methods
  async getMilestones(projectId?: string): Promise<Milestone[]> {
    let query = db.select().from(milestones);

    if (projectId) {
      query = query.where(eq(milestones.projectId, projectId)) as any;
    }

    const result = await query.orderBy(asc(milestones.dueDate));
    return result as Milestone[];
  }

  async getMilestone(id: string): Promise<Milestone | undefined> {
    const result = await db.select().from(milestones).where(eq(milestones.id, id));
    return result[0];
  }

  async createMilestone(milestone: InsertMilestone): Promise<Milestone> {
    const result = await db.insert(milestones).values(milestone).returning();
    return result[0];
  }

  async updateMilestone(id: string, data: Partial<InsertMilestone>): Promise<Milestone | undefined> {
    const result = await db.update(milestones).set(data).where(eq(milestones.id, id)).returning();
    return result[0];
  }

  async deleteMilestone(id: string): Promise<boolean> {
    await db.delete(milestones).where(eq(milestones.id, id));
    return true;
  }

  // Payment methods
  async getPayments(projectId?: string): Promise<Payment[]> {
    let query = db.select().from(payments);

    if (projectId) {
      query = query.where(eq(payments.projectId, projectId)) as any;
    }

    const result = await query.orderBy(desc(payments.paymentDate));
    return result as Payment[];
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id));
    return result[0];
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async updatePayment(id: string, data: Partial<InsertPayment>): Promise<Payment | undefined> {
    const result = await db.update(payments).set(data).where(eq(payments.id, id)).returning();
    return result[0];
  }

  async deletePayment(id: string): Promise<boolean> {
    await db.delete(payments).where(eq(payments.id, id));
    return true;
  }

  // Activity methods
  async getActivities(leadId?: string, clientId?: string): Promise<Activity[]> {
    let query = db.select().from(activities);

    if (leadId) {
      query = query.where(eq(activities.leadId, leadId)) as any;
    } else if (clientId) {
      query = query.where(eq(activities.clientId, clientId)) as any;
    }

    const result = await query.orderBy(desc(activities.activityDate));
    return result as Activity[];
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    const result = await db.select().from(activities).where(eq(activities.id, id));
    return result[0];
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const result = await db.insert(activities).values(activity).returning();
    return result[0];
  }

  async updateActivity(id: string, data: Partial<InsertActivity>): Promise<Activity | undefined> {
    const result = await db.update(activities).set(data).where(eq(activities.id, id)).returning();
    return result[0];
  }

  async deleteActivity(id: string): Promise<boolean> {
    await db.delete(activities).where(eq(activities.id, id));
    return true;
  }

  // Task methods
  async getTasks(filters?: {
    assignedTo?: string;
    leadId?: string;
    clientId?: string;
    status?: string;
    dueDateFrom?: Date;
    dueDateTo?: Date;
  }): Promise<Task[]> {
    let query = db.select().from(tasks);

    const conditions = [];

    if (filters?.assignedTo) {
      conditions.push(eq(tasks.assignedTo, filters.assignedTo));
    }
    if (filters?.leadId) {
      conditions.push(eq(tasks.leadId, filters.leadId));
    }
    if (filters?.clientId) {
      conditions.push(eq(tasks.clientId, filters.clientId));
    }
    if (filters?.status) {
      conditions.push(eq(tasks.status, filters.status));
    }
    if (filters?.dueDateFrom) {
      conditions.push(gte(tasks.dueDate, filters.dueDateFrom));
    }
    if (filters?.dueDateTo) {
      conditions.push(lte(tasks.dueDate, filters.dueDateTo));
    }

    if (conditions.length === 1) {
      query = query.where(conditions[0]) as any;
    } else if (conditions.length > 1) {
      query = query.where(and(...conditions)) as any;
    }

    const result = await query.orderBy(asc(tasks.dueDate));
    return result as Task[];
  }

  async getTask(id: string): Promise<Task | undefined> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id));
    return result[0];
  }

  async createTask(task: InsertTask): Promise<Task> {
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  }

  async updateTask(id: string, data: Partial<InsertTask>): Promise<Task | undefined> {
    const result = await db.update(tasks).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(tasks.id, id)).returning();
    return result[0];
  }

  async deleteTask(id: string): Promise<boolean> {
    await db.delete(tasks).where(eq(tasks.id, id));
    return true;
  }

  async markTaskComplete(id: string): Promise<Task | undefined> {
    const result = await db.update(tasks).set({
      status: "completed",
      completedAt: new Date(),
      updatedAt: new Date(),
    }).where(eq(tasks.id, id)).returning();
    return result[0];
  }

  // Pipeline Stage methods
  async getPipelineStages(): Promise<PipelineStage[]> {
    return await db
      .select()
      .from(pipelineStages)
      .orderBy(asc(pipelineStages.order));
  }

  async getAllPipelineStages() {
    return db
      .select()
      .from(pipelineStages)
      .orderBy(pipelineStages.order);
  }

  async getPipelineStage(id: string): Promise<PipelineStage | undefined> {
    const result = await db
      .select()
      .from(pipelineStages)
      .where(eq(pipelineStages.id, id));
    return result[0];
  }

  async createPipelineStage(data: { name: string; color: string }): Promise<PipelineStage> {
    const [{ maxOrder }] = await db
      .select({ maxOrder: sql<number>`MAX(${pipelineStages.order})` })
      .from(pipelineStages);

    const order = (maxOrder ?? 0) + 1;

    const result = await db
      .insert(pipelineStages)
      .values({
        name: data.name,
        color: data.color,
        order,
      })
      .returning();

    return result[0];
  }

  async updatePipelineStage(id: string, data: { name?: string; color?: string; order?: number }): Promise<PipelineStage | undefined> {
    const result = await db
      .update(pipelineStages)
      .set({
        name: data.name ?? undefined,
        color: data.color ?? undefined,
        order: data.order ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(pipelineStages.id, id))
      .returning();

    return result[0];
  }

  async deletePipelineStage(id: string): Promise<boolean> {
    const result = await db
      .delete(pipelineStages)
      .where(eq(pipelineStages.id, id))
      .returning();

    if (result.length === 0) return false;

    // reorder remaining
    const all = await db
      .select()
      .from(pipelineStages)
      .orderBy(pipelineStages.order);

    for (let i = 0; i < all.length; i++) {
      await db
        .update(pipelineStages)
        .set({ order: i + 1 })
        .where(eq(pipelineStages.id, all[i].id));
    }

    return true;
  }

  async reorderPipelineStages(ids: string[]): Promise<boolean> {
    for (let i = 0; i < ids.length; i++) {
      await db
        .update(pipelineStages)
        .set({ order: i + 1 })
        .where(eq(pipelineStages.id, ids[i]));
    }

    return true;
  }

  // Service Type methods
  async getServiceTypes(): Promise<ServiceType[]> {
    return await db.select().from(serviceTypesTable).orderBy(asc(serviceTypesTable.order));
  }

  async getServiceType(id: string): Promise<ServiceType | undefined> {
    const result = await db.select().from(serviceTypesTable).where(eq(serviceTypesTable.id, id));
    return result[0];
  }

  async createServiceType(data: { name: string; color: string }): Promise<ServiceType> {
    const [{ maxOrder }] = await db
      .select({ maxOrder: sql<number>`MAX(${serviceTypesTable.order})` })
      .from(serviceTypesTable);

    const order = (maxOrder ?? 0) + 1;

    const result = await db
      .insert(serviceTypesTable)
      .values({
        name: data.name,
        color: data.color,
        order,
      })
      .returning();

    return result[0];
  }

  async updateServiceType(id: string, data: { name?: string; color?: string; order?: number }): Promise<ServiceType | undefined> {
    const result = await db
      .update(serviceTypesTable)
      .set({
        name: data.name ?? undefined,
        color: data.color ?? undefined,
        order: data.order ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(serviceTypesTable.id, id))
      .returning();

    return result[0];
  }

  async deleteServiceType(id: string): Promise<boolean> {
    const result = await db
      .delete(serviceTypesTable)
      .where(eq(serviceTypesTable.id, id))
      .returning();

    if (result.length === 0) return false;

    // reorder remaining
    const all = await db
      .select()
      .from(serviceTypesTable)
      .orderBy(serviceTypesTable.order);

    for (let i = 0; i < all.length; i++) {
      await db
        .update(serviceTypesTable)
        .set({ order: i + 1 })
        .where(eq(serviceTypesTable.id, all[i].id));
    }

    return true;
  }

  async reorderServiceTypes(ids: string[]): Promise<boolean> {
    for (let i = 0; i < ids.length; i++) {
      await db
        .update(serviceTypesTable)
        .set({ order: i + 1 })
        .where(eq(serviceTypesTable.id, ids[i]));
    }

    return true;
  }

  // async createPipelineStage(stageData: { name: string; color: string }): Promise<PipelineStage> {
  //   // Get the maximum order value to append to the end
  //   const maxOrderResult = await db.select({ maxOrder: sql<number>`MAX(${pipelineStages.order})` }).from(pipelineStages);
  //   const maxOrder = maxOrderResult[0]?.maxOrder ?? 0;

  //   const result = await db
  //     .insert(pipelineStages)
  //     .values({
  //       name: stageData.name,
  //       color: stageData.color,
  //       order: maxOrder + 1,
  //     })
  //     .returning();
  //   return result[0];
  // }

  // async updatePipelineStage(id: string, data: { name: string; color: string }): Promise<PipelineStage | undefined> {
  //   const result = await db
  //     .update(pipelineStages)
  //     .set({ 
  //       name: data.name,
  //       color: data.color,
  //       updatedAt: new Date() 
  //     })
  //     .where(eq(pipelineStages.id, id))
  //     .returning();
  //   return result[0];
  // }

  // async deletePipelineStage(id: string): Promise<boolean> {
  //   const result = await db.delete(pipelineStages).where(eq(pipelineStages.id, id));
  //   return result ? result.rowCount > 0 : false;
  // }

  // async reorderPipelineStages(orderedIds: string[]): Promise<boolean> {
  //   try {
  //     await db.transaction(async (tx) => {
  //       for (let i = 0; i < orderedIds.length; i++) {
  //         await tx
  //           .update(pipelineStages)
  //           .set({ order: i + 1, updatedAt: new Date() })
  //           .where(eq(pipelineStages.id, orderedIds[i]));
  //       }
  //     });
  //     return true;
  //   } catch (error) {
  //     console.error('Failed to reorder pipeline stages:', error);
  //     return false;
  //   }
  // }

  // Settings methods
  async getSettings(): Promise<Settings> {
    try {
      console.log('Fetching settings from database...');

      // First, check if the settings table exists
      const tableExists = await db
        .select()
        .from(sql`information_schema.tables`)
        .where(
          and(
            eq(sql`table_schema`, 'public'),
            eq(sql`table_name`, 'settings')
          )
        )
        .then(rows => rows.length > 0)
        .catch(() => false);

      if (!tableExists) {
        console.error('Settings table does not exist');
        throw new Error('Settings table does not exist');
      }

      // Get settings using Drizzle query builder
      const [settings] = await db
        .select()
        .from(settingsTable)
        .where(eq(settingsTable.id, 'global-settings'));

      if (!settings) {
        console.log('No settings found, creating default settings...');
        const defaultSettings = {
          id: 'global-settings',
          serviceTypes: [],
          pipelineStages: [],
          autoCreateClientOnWin: true,
          updatedAt: new Date()
        };

        try {
          await db.insert(settingsTable).values(defaultSettings);
          console.log('Default settings inserted successfully');
          return defaultSettings;
        } catch (insertError) {
          console.error('Failed to insert default settings:', insertError);
          throw new Error(`Failed to initialize settings: ${insertError instanceof Error ? insertError.message : String(insertError)}`);
        }
      }

      // Ensure pipelineStages is an array
      if (!Array.isArray(settings.pipelineStages)) {
        settings.pipelineStages = [];
      }

      console.log('Found existing settings:', settings);
      return settings as Settings;
    } catch (error) {
      console.error('Failed to get settings:', error);
      throw new Error(`Failed to fetch settings: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateSettings(data: Partial<InsertSettings>): Promise<Settings> {
    try {
      console.log('Updating settings with data:', data);

      // Prepare the update data
      const updateData: any = {
        ...data,
        updatedAt: new Date()
      };

      // Ensure pipelineStages is properly formatted as an array
      if ('pipelineStages' in data) {
        updateData.pipelineStages = Array.isArray(data.pipelineStages)
          ? data.pipelineStages
          : [];
      }

      // Update using Drizzle query builder
      const [updatedSettings] = await db
        .update(settingsTable)
        .set(updateData)
        .where(eq(settingsTable.id, 'global-settings'))
        .returning();

      if (!updatedSettings) {
        throw new Error('Failed to update settings');
      }

      // Ensure pipelineStages is an array
      if (!Array.isArray(updatedSettings.pipelineStages)) {
        updatedSettings.pipelineStages = [];
      }

      return updatedSettings as Settings;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw new Error(`Failed to update settings: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Change Request methods
  async getChangeRequests(projectId?: string): Promise<ChangeRequest[]> {
    if (projectId) {
      const result = await db.select().from(changeRequests).where(eq(changeRequests.projectId, projectId));
      return result;
    }
    const result = await db.select().from(changeRequests);
    return result;
  }

  async getChangeRequest(id: string): Promise<ChangeRequest | undefined> {
    const result = await db.select().from(changeRequests).where(eq(changeRequests.id, id));
    return result[0];
  }

  async createChangeRequest(changeRequest: InsertChangeRequest): Promise<ChangeRequest> {
    const result = await db.insert(changeRequests).values(changeRequest).returning();
    return result[0];
  }

  async updateChangeRequest(id: string, data: Partial<InsertChangeRequest>): Promise<ChangeRequest | undefined> {
    const result = await db.update(changeRequests).set(data).where(eq(changeRequests.id, id)).returning();
    return result[0];
  }

  async deleteChangeRequest(id: string): Promise<boolean> {
    await db.delete(changeRequests).where(eq(changeRequests.id, id));
    return true;
  }
}

export const storage = new DbStorage();