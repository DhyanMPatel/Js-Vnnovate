import {
  insertActivitySchema,
  insertChangeRequestSchema,
  insertClientSchema,
  insertContactSchema,
  insertLeadSchema,
  insertProjectSchema,
  insertTaskSchema,
  type InsertTask,
} from "@shared/schema";
import bcrypt from "bcryptjs";
import type { Express, NextFunction, Request, Response } from "express";
import "express-session";
import { createServer, type Server } from "http";
import { z } from "zod";
import { isMailConfigured, sendMail } from "./mailer";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

// Middleware to check if user is authenticated
async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user) {
    req.session.destroy(() => { });
    return res.status(401).json({ error: "User not found" });
  }

  // Check if user account is active
  if (!user.isActive) {
    req.session.destroy(() => { });
    return res
      .status(403)
      .json({
        error:
          "Your account has been deactivated. Please contact an administrator.",
      });
  }

  next();
}

// Middleware to check if user is admin
async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user) {
    req.session.destroy(() => { });
    return res.status(401).json({ error: "User not found" });
  }

  // Check if user account is active
  if (!user.isActive) {
    req.session.destroy(() => { });
    return res
      .status(403)
      .json({
        error:
          "Your account has been deactivated. Please contact an administrator.",
      });
  }

  if (user.role !== "Admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
}

// Middleware to check if user is admin or sales head
async function requireAdminOrSalesHead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user) {
    req.session.destroy(() => { });
    return res.status(401).json({ error: "User not found" });
  }

  // Check if user account is active
  if (!user.isActive) {
    req.session.destroy(() => { });
    return res
      .status(403)
      .json({
        error:
          "Your account has been deactivated. Please contact an administrator.",
      });
  }

  if (user.role !== "Admin" && user.role !== "Sales Head") {
    return res
      .status(403)
      .json({ error: "Admin or Sales Head access required" });
  }

  next();
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["Admin", "Sales Head", "BDM", "BDE"]).optional(),
  managerId: z.string().nullable().optional(),
  canViewFullLeadDetails: z.boolean().optional(),
});

const adminChangePasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const toggleActiveSchema = z.object({
  isActive: z.boolean(),
});

const deleteUserSchema = z.object({
  reassignToUserId: z.string().min(1, "Reassignment user is required"),
});

const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Admin", "Sales Head", "BDM", "BDE"]),
  managerId: z.string().nullable().optional(),
});

// Helper function to generate unique username from email
async function generateUniqueUsername(email: string): Promise<string> {
  // Extract the part before @ and sanitize it
  let emailPrefix = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Remove special characters
    .substring(0, 20); // Limit length

  // If sanitized prefix is empty or too short, use a default fallback
  if (emailPrefix.length < 3) {
    emailPrefix = "user";
  }

  // Get all existing usernames to check for collisions
  const allUsers = await storage.getAllUsers();
  const existingUsernames = new Set(
    allUsers.map((u) => u.username.toLowerCase())
  );

  // Try the base username first
  let username = emailPrefix;
  let suffix = 1;

  // If it exists, keep trying with incrementing suffix
  while (existingUsernames.has(username.toLowerCase())) {
    username = `${emailPrefix}-${suffix}`;
    suffix++;
  }

  return username;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Check if user account is active
      if (!user.isActive) {
        return res.status(403).json({
          error:
            "Your account has been deactivated. Please contact an administrator.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      req.session.userId = user.id;

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(400).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Logout failed" });
      }
      res.status(204).send();
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => { });
        return res.status(401).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/auth/change-password", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { currentPassword, newPassword } = changePasswordSchema.parse(
        req.body
      );

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUser(user.id, { password: hashedPassword });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(400).json({ error: "Failed to change password" });
    }
  });

  // User routes - accessible by all authenticated users for team hierarchy
  app.get("/api/users", requireAuth, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(
        ({ password: _, ...user }) => user
      );
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Helper function to validate reporting hierarchy
  function validateReportingHierarchy(
    userRole: string,
    managerRole: string
  ): boolean {
    const validHierarchy: Record<string, string[]> = {
      BDE: ["BDM", "Sales Head", "Admin"],
      BDM: ["Sales Head", "Admin"],
      "Sales Head": ["Admin"],
      Admin: [], // Admin should not have a manager
    };

    return validHierarchy[userRole]?.includes(managerRole) ?? false;
  }

  // Create user (Admin and Sales Head)
  app.post("/api/users", requireAdminOrSalesHead, async (req, res) => {
    try {
      const validated: any = createUserSchema.parse(req.body);

      // Get current user to check their role
      const currentUser = await storage.getUser(req.session.userId!);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      // Role-based restrictions: Sales Head can only create BDM and BDE
      if (
        currentUser.role === "Sales Head" &&
        (validated.role === "Admin" || validated.role === "Sales Head")
      ) {
        return res.status(403).json({
          error: "Sales Head can only create BDM and BDE users",
        });
      }

      // Auto-generate username from email if not provided
      const username =
        validated.username || (await generateUniqueUsername(validated.email));

      // Check email uniqueness (case-insensitive)
      const allUsers = await storage.getAllUsers();
      const emailExists = allUsers.some(
        (u) => u.email.toLowerCase() === validated.email.toLowerCase()
      );
      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // If username was provided, check its uniqueness (auto-generated ones are already unique)
      if (validated.username) {
        const usernameExists = allUsers.some(
          (u) => u.username.toLowerCase() === validated.username.toLowerCase()
        );
        if (usernameExists) {
          return res.status(400).json({ error: "Username already exists" });
        }
      }

      // Prevent self-manager assignment (Note: we don't have the user ID yet for POST, so skip this check)

      // Admin should not have a manager
      if (validated.role === "Admin" && validated.managerId) {
        return res.status(400).json({ error: "Admin cannot have a manager" });
      }

      // Validate managerId if provided
      if (validated.managerId) {
        const manager = await storage.getUser(validated.managerId);
        if (!manager) {
          return res.status(400).json({ error: "Manager not found" });
        }
        if (!manager.isActive) {
          return res
            .status(400)
            .json({ error: "Cannot assign to an inactive manager" });
        }

        // Enforce reporting hierarchy: BDE→BDM/SalesHead/Admin, BDM→SalesHead/Admin, SalesHead→Admin
        if (!validateReportingHierarchy(validated.role, manager.role)) {
          const validRoles = {
            BDE: "BDM, Sales Head, or Admin",
            BDM: "Sales Head or Admin",
            "Sales Head": "Admin",
          }[validated.role] || "";
          return res.status(400).json({
            error: `${validated.role} can only report to ${validRoles}`,
          });
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validated.password, 10);

      // Set defaults
      const canViewFullLeadDetails =
        validated.role === "Admin" ||
        validated.role === "Sales Head" ||
        validated.role === "BDM";

      // Create user
      const newUser = await storage.createUser({
        username: username, // Use the auto-generated or provided username
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
        managerId: validated.managerId || null,
        canViewFullLeadDetails,
        isActive: true,
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // User management routes (Admin only)

  app.patch("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validated = updateUserSchema.parse(req.body);

      // Get the user being updated
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compute effective next role and managerId after this update
      const nextRole = validated.role ?? existingUser.role;
      const nextManagerId =
        validated.managerId === undefined
          ? existingUser.managerId
          : validated.managerId;

      // Validate manager hierarchy with effective next values
      if (nextManagerId) {
        // Prevent self-manager assignment
        if (nextManagerId === id) {
          return res
            .status(400)
            .json({ error: "User cannot be their own manager" });
        }

        const manager = await storage.getUser(nextManagerId);
        if (!manager) {
          return res.status(400).json({ error: "Manager not found" });
        }
        if (!manager.isActive) {
          return res
            .status(400)
            .json({ error: "Cannot assign to an inactive manager" });
        }

        // Admin cannot have a manager
        if (nextRole === "Admin") {
          return res.status(400).json({
            error:
              "Admin cannot have a manager. Please clear the manager field before promoting to Admin.",
          });
        }

        // Enforce reporting hierarchy for other roles
        if (!validateReportingHierarchy(nextRole, manager.role)) {
          const validRoles =
            {
              BDE: "BDM, Sales Head, or Admin",
              BDM: "Sales Head or Admin",
              "Sales Head": "Admin",
            }[nextRole] || "";
          return res.status(400).json({
            error: `${nextRole} can only report to ${validRoles}. Please reassign manager before changing role.`,
          });
        }
      }

      const updatedUser = await storage.updateUser(id, validated);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ error: "Failed to update user" });
    }
  });

  app.post("/api/users/:id/change-password", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { newPassword } = adminChangePasswordSchema.parse(req.body);

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUser(id, { password: hashedPassword });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing user password:", error);
      res.status(400).json({ error: "Failed to change password" });
    }
  });

  app.patch("/api/users/:id/status", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = toggleActiveSchema.parse(req.body);

      // Prevent admin from deactivating themselves
      if (id === req.session.userId && !isActive) {
        return res
          .status(400)
          .json({ error: "You cannot deactivate your own account" });
      }

      const updatedUser = await storage.updateUser(id, { isActive });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(400).json({ error: "Failed to update user status" });
    }
  });

  app.delete("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { reassignToUserId } = deleteUserSchema.parse(req.body);

      // Check if user exists
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Prevent deleting yourself
      if (id === req.session.userId) {
        return res
          .status(400)
          .json({ error: "You cannot delete your own account" });
      }

      // Prevent reassigning to the same user being deleted
      if (reassignToUserId === id) {
        return res
          .status(400)
          .json({ error: "Cannot reassign data to the user being deleted" });
      }

      // Validate the target user exists and is active
      const targetUser = await storage.getUser(reassignToUserId);
      if (!targetUser) {
        return res
          .status(400)
          .json({ error: "Target user for reassignment not found" });
      }

      if (!targetUser.isActive) {
        return res
          .status(400)
          .json({ error: "Cannot reassign to an inactive user" });
      }

      // Get all data owned by the user being deleted
      const allLeads = await storage.getLeads();
      const allContacts = await storage.getContacts();
      const allTasks = await storage.getTasks();
      const allActivities = await storage.getActivities();

      const userLeads = allLeads.filter((lead) => lead.assignedTo === id);
      const userContacts = allContacts.filter(
        (contact) => contact.assignedTo === id
      );
      const userTasks = allTasks.filter(
        (task) => task.assignedTo === id || task.createdBy === id
      );
      const userActivities = allActivities.filter(
        (activity) => activity.userId === id
      );

      // Reassign all leads
      for (const lead of userLeads) {
        await storage.updateLead(lead.id, { assignedTo: reassignToUserId });
      }

      // Reassign all contacts
      for (const contact of userContacts) {
        await storage.updateContact(contact.id, {
          assignedTo: reassignToUserId,
        });
      }

      // Reassign all tasks
      for (const task of userTasks) {
        const updates: Partial<InsertTask> = {};
        if (task.assignedTo === id) updates.assignedTo = reassignToUserId;
        if (task.createdBy === id) updates.createdBy = reassignToUserId;
        await storage.updateTask(task.id, updates);
      }

      // Reassign all activities
      for (const activity of userActivities) {
        await storage.updateActivity(activity.id, {
          userId: reassignToUserId,
        });
      }

      console.log(
        `Reassigned ${userLeads.length} leads, ${userContacts.length} contacts, ${userTasks.length} tasks, and ${userActivities.length} activities to user ${reassignToUserId}`
      );

      // Delete the user
      await storage.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Activity routes
  app.get("/api/activities", async (req, res) => {
    try {
      const { leadId, clientId } = req.query;
      const activities = await storage.getActivities(
        leadId as string | undefined,
        clientId as string | undefined
      );
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validated = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validated);
      res.status(201).json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(400).json({ error: "Failed to create activity" });
    }
  });

  app.delete("/api/activities/:id", async (req, res) => {
    try {
      // Check if activity exists before deleting
      const activity = await storage.getActivity(req.params.id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      await storage.deleteActivity(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({ error: "Failed to delete activity" });
    }
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const { assignedTo, leadId, clientId, status, dueDateFrom, dueDateTo } =
        req.query;

      const filters: any = {};
      if (assignedTo) filters.assignedTo = assignedTo as string;
      if (leadId) filters.leadId = leadId as string;
      if (clientId) filters.clientId = clientId as string;
      if (status) filters.status = status as string;
      if (dueDateFrom) filters.dueDateFrom = new Date(dueDateFrom as string);
      if (dueDateTo) filters.dueDateTo = new Date(dueDateTo as string);

      const tasks = await storage.getTasks(filters);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to fetch task" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const validated = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validated);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(400).json({ error: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      // Partial validation for task updates
      const validated = insertTaskSchema.partial().parse(req.body);
      const task = await storage.updateTask(req.params.id, validated);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(400).json({ error: "Failed to update task" });
    }
  });

  app.post("/api/tasks/:id/complete", async (req, res) => {
    try {
      const task = await storage.markTaskComplete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error completing task:", error);
      res.status(500).json({ error: "Failed to complete task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      // Note: In production, you would check req.user here
      // For now, permission checking is handled on the frontend
      // Only creator, Admin, or Sales Head should be allowed to delete

      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      await storage.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // Contact routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validated = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validated);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(400).json({ error: "Failed to create contact" });
    }
  });

  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.updateContact(req.params.id, req.body);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(400).json({ error: "Failed to update contact" });
    }
  });

  app.delete("/api/contacts/:id", requireAdmin, async (req, res) => {
    try {
      // Check if contact is used as primary contact in any lead
      const leads = await storage.getLeads();
      const isUsedAsPrimary = leads.some(
        (lead) => lead.primaryContactId === req.params.id
      );

      if (isUsedAsPrimary) {
        return res.status(400).json({
          error:
            "Cannot delete contact that is used as a primary contact for a lead. Please update or delete the lead first.",
        });
      }

      const success = await storage.deleteContact(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // Client routes
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ error: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const validated = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validated);
      res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(400).json({ error: "Failed to create client" });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.updateClient(req.params.id, req.body);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      res.status(400).json({ error: "Failed to update client" });
    }
  });

  app.delete("/api/clients/:id", requireAdmin, async (req, res) => {
    try {
      // Check if client exists
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      // Protective delete: Check if any projects exist for this client
      const projects = await storage.getProjects();
      const clientProjects = projects.filter(
        (project) => project.clientId === req.params.id
      );

      if (clientProjects.length > 0) {
        return res.status(400).json({
          error: `Cannot delete client with ${clientProjects.length} project(s). Please delete all projects first.`,
          projectCount: clientProjects.length,
        });
      }

      // Delete all tasks linked to this client (not linked to projects)
      const tasks = await storage.getTasks();
      const clientTasks = tasks.filter(
        (task) => task.clientId === req.params.id
      );
      for (const task of clientTasks) {
        await storage.deleteTask(task.id);
      }
      console.log(
        `Deleted ${clientTasks.length} task(s) linked to client ${req.params.id}`
      );

      // Delete all activities linked to this client (not linked to projects)
      const activities = await storage.getActivities();
      const clientActivities = activities.filter(
        (activity) => activity.clientId === req.params.id
      );
      for (const activity of clientActivities) {
        await storage.deleteActivity(activity.id);
      }
      console.log(
        `Deleted ${clientActivities.length} activity(ies) linked to client ${req.params.id}`
      );

      // Now safe to delete the client
      const success = await storage.deleteClient(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json({ success: true, message: "Client deleted successfully" });
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ error: "Failed to delete client" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  // app.patch("/api/projects/:id", async (req, res) => {
  //   try {
  //     const project = await storage.updateProject(req.params.id, req.body);
  //     if (!project) {
  //       return res.status(404).json({ error: "Project not found" });
  //     }
  //     res.json(project);
  //   } catch (error) {
  //     console.error("Error updating project:", error);
  //     res.status(500).json({ error: "Failed to update project" });
  //   }
  // });

  app.put("/api/projects/update/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
    try {
      // Check if project exists
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Cascade delete: Delete all milestones for this project
      const milestones = await storage.getMilestones();
      const projectMilestones = milestones.filter(
        (m) => m.projectId === req.params.id
      );
      for (const milestone of projectMilestones) {
        await storage.deleteMilestone(milestone.id);
      }
      console.log(
        `Deleted ${projectMilestones.length} milestone(s) for project ${req.params.id}`
      );

      // Cascade delete: Delete all payments for this project
      const payments = await storage.getPayments();
      const projectPayments = payments.filter(
        (p) => p.projectId === req.params.id
      );
      for (const payment of projectPayments) {
        await storage.deletePayment(payment.id);
      }
      console.log(
        `Deleted ${projectPayments.length} payment(s) for project ${req.params.id}`
      );

      // Cascade delete: Delete all change requests for this project
      const changeRequests = await storage.getChangeRequests(req.params.id);
      for (const cr of changeRequests) {
        await storage.deleteChangeRequest(cr.id);
      }
      console.log(
        `Deleted ${changeRequests.length} change request(s) for project ${req.params.id}`
      );

      // Cascade delete: Delete all activities for this project
      const activities = await storage.getActivities();
      const projectActivities = activities.filter(
        (a) => a.projectId === req.params.id
      );
      for (const activity of projectActivities) {
        await storage.deleteActivity(activity.id);
      }
      console.log(
        `Deleted ${projectActivities.length} activity(ies) for project ${req.params.id}`
      );

      // Cascade delete: Delete all tasks for this project
      const tasks = await storage.getTasks();
      const projectTasks = tasks.filter((t) => t.projectId === req.params.id);
      for (const task of projectTasks) {
        await storage.deleteTask(task.id);
      }
      console.log(
        `Deleted ${projectTasks.length} task(s) for project ${req.params.id}`
      );

      // Now safe to delete the project
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({
        success: true,
        message: "Project and all related data deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Change Request routes
  app.get("/api/change-requests", async (req, res) => {
    try {
      const projectId = req.query.projectId as string | undefined;
      const changeRequests = await storage.getChangeRequests(projectId);
      res.json(changeRequests);
    } catch (error) {
      console.error("Error fetching change requests:", error);
      res.status(500).json({ error: "Failed to fetch change requests" });
    }
  });

  app.get("/api/change-requests/:id", async (req, res) => {
    try {
      const changeRequest = await storage.getChangeRequest(req.params.id);
      if (!changeRequest) {
        return res.status(404).json({ error: "Change request not found" });
      }
      res.json(changeRequest);
    } catch (error) {
      console.error("Error fetching change request:", error);
      res.status(500).json({ error: "Failed to fetch change request" });
    }
  });

  app.post("/api/change-requests", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const validatedData = insertChangeRequestSchema.parse({
        ...req.body,
        createdBy: req.session.userId,
      });

      const changeRequest = await storage.createChangeRequest(validatedData);
      res.status(201).json(changeRequest);
    } catch (error) {
      console.error("Error creating change request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create change request" });
    }
  });

  app.patch("/api/change-requests/:id", async (req, res) => {
    try {
      const changeRequest = await storage.updateChangeRequest(
        req.params.id,
        req.body
      );
      if (!changeRequest) {
        return res.status(404).json({ error: "Change request not found" });
      }
      res.json(changeRequest);
    } catch (error) {
      console.error("Error updating change request:", error);
      res.status(500).json({ error: "Failed to update change request" });
    }
  });

  // Update an existing change request (full update)
  app.put("/api/change-requests/update/:id", async (req:any, res:any) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { id } = req.params;
      const existingRequest = await storage.getChangeRequest(id);

      if (!existingRequest) {
        return res.status(404).json({ error: "Change request not found" });
      }

      // Only allow the creator or admin to update
      if (
        existingRequest.createdBy !== req.session.userId &&
        req.session.role !== "Admin"
      ) {
        return res
          .status(403)
          .json({ error: "Not authorized to update this change request" });
      }

      const validatedData = insertChangeRequestSchema.parse({
        ...req.body,
        // Don't allow changing these fields via update
        id: existingRequest.id,
        projectId: existingRequest.projectId,
        createdBy: existingRequest.createdBy,
        createdAt: existingRequest.createdAt,
        // Track who made the update
        updatedBy: req.session.userId,
        updatedAt: new Date(),
      });

      const updatedRequest = await storage.updateChangeRequest(
        id,
        validatedData
      );
      res.json(updatedRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error updating change request:", error);
      res.status(500).json({ error: "Failed to update change request" });
    }
  });

  app.delete(
    "/api/change-requests/:id",
    requireAdminOrSalesHead,
    async (req, res) => {
      try {
        const success = await storage.deleteChangeRequest(req.params.id);
        if (!success) {
          return res.status(404).json({ error: "Change request not found" });
        }
        res.json({ success: true });
      } catch (error) {
        console.error("Error deleting change request:", error);
        res.status(500).json({ error: "Failed to delete change request" });
      }
    }
  );

  // Lead routes with role-based filtering and masking
  app.get("/api/leads", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      const allLeads = await storage.getLeads();
      const allUsers = await storage.getAllUsers();

      // Get team member IDs for BDM
      const teamMemberIds =
        currentUser.role === "BDM"
          ? allUsers
            .filter((u) => u.managerId === currentUser.id)
            .map((u) => u.id)
          : [];

      // Filter leads based on role hierarchy
      const accessibleLeads = allLeads.filter((lead) => {
        if (currentUser.role === "Admin" || currentUser.role === "Sales Head") {
          return true; // See all leads
        }
        if (currentUser.role === "BDM") {
          // BDM sees their own leads + team members' leads + unassigned leads
          return (
            lead.assignedTo === currentUser.id ||
            teamMemberIds.includes(lead.assignedTo) ||
            !lead.assignedTo
          );
        }
        // BDE: see only their own leads
        return lead.assignedTo === currentUser.id;
      });

      // Apply data masking for BDM viewing team leads
      const maskedLeads = accessibleLeads.map((lead) => {
        const shouldMask =
          currentUser.role === "BDM" &&
          lead.assignedTo !== currentUser.id &&
          teamMemberIds.includes(lead.assignedTo);

        if (!shouldMask) {
          return lead;
        }

        // Mask sensitive contact information
        return {
          ...lead,
          email: lead.email ? "***@***" : null,
          phone: lead.phone ? "***-***-****" : null,
          skype: lead.skype ? "***" : null,
          telegram: lead.telegram ? "***" : null,
          linkedIn: lead.linkedIn ? "***" : null,
        };
      });

      res.json(maskedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      const allUsers = await storage.getAllUsers();
      const teamMemberIds =
        currentUser.role === "BDM"
          ? allUsers
            .filter((u) => u.managerId === currentUser.id)
            .map((u) => u.id)
          : [];

      // Check if user has access to this lead
      const hasAccess =
        currentUser.role === "Admin" ||
        currentUser.role === "Sales Head" ||
        lead.assignedTo === currentUser.id ||
        (currentUser.role === "BDM" &&
          (teamMemberIds.includes(lead.assignedTo) || !lead.assignedTo));

      if (!hasAccess) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Apply masking if BDM viewing team member's lead
      const shouldMask =
        currentUser.role === "BDM" &&
        lead.assignedTo !== currentUser.id &&
        teamMemberIds.includes(lead.assignedTo);

      if (shouldMask) {
        const maskedLead = {
          ...lead,
          email: lead.email ? "***@***" : null,
          phone: lead.phone ? "***-***-****" : null,
          skype: lead.skype ? "***" : null,
          telegram: lead.telegram ? "***" : null,
          linkedIn: lead.linkedIn ? "***" : null,
        };
        return res.json(maskedLead);
      }

      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    let createdContact = null;

    try {
      const validated = insertLeadSchema.parse(req.body);

      const hasContactMethod =
        validated.email ||
        validated.phone ||
        validated.skype ||
        validated.telegram ||
        validated.linkedIn;

      let contact = null;

      if (hasContactMethod) {
        const existingContacts = await storage.getContacts();
        const existingContact = existingContacts.find(
          (c) =>
            (validated.email && c.email === validated.email) ||
            (validated.phone && c.phone === validated.phone)
        );

        if (existingContact) {
          contact = existingContact;
        } else {
          const contactData: any = {
            name: `${validated.firstName} ${validated.lastName}`,
            email: validated.email || null,
            phone: validated.phone || null,
            position: validated.serviceType || null,
            companyName: validated.companyName || null,
            assignedTo: validated.assignedTo || null,
            tags: [],
            skype: validated.skype || null,
            telegram: validated.telegram || null,
            linkedIn: validated.linkedIn || null,
            notes: validated.description || null,
          };

          contact = await storage.createContact(contactData);
          createdContact = contact;
        }
      }

      const leadWithContact = {
        ...validated,
        expectedCloseDate: validated.expectedCloseDate || null,
        primaryContactId: contact?.id || null,
      };

      const lead = await storage.createLead(leadWithContact);

      try {
        if (isMailConfigured) {
          const users = await storage.getAllUsers();
          const recipients = users
            .filter(u => (u.role === "Admin" || u.role === "Sales Head") && u.isActive && !!u.email)
            .map(u => u.email);

          if (recipients.length > 0) {
            const subject = `New Lead Created: ${validated.firstName} ${validated.lastName}`;
            const textLines = [
              `Title: ${validated.title}`,
              `Name: ${validated.firstName} ${validated.lastName}`,
              `Company: ${validated.companyName || "-"}`,
              `Email: ${validated.email || "-"}`,
              `Phone: ${validated.phone || "-"}`,
              `Service: ${validated.serviceType}`,
              `Stage: ${validated.stage}`,
              `Value: ${validated.value}`,
              `Assigned To: ${validated.assignedTo || "-"}`,
            ];
            const text = textLines.join("\n");

            const badgeColor = validated.stage === 'Won' ? '#16a34a' : validated.stage === 'Lost' ? '#dc2626' : '#2563eb';
            const appUrl = process.env.APP_URL || '#';
            const safe = (s: any) => (s ?? '-');

            const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f6f7fb;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.06);overflow:hidden;">
            <tr>
              <td style="padding:24px 24px 16px 24px;background:linear-gradient(135deg,#eef2ff,#f0f9ff);border-bottom:1px solid #eef2ff;">
                <div style="font-size:18px;color:#111827;font-weight:600;">New Lead Created</div>
                <div style="margin-top:6px;font-size:14px;color:#6b7280;">${safe(validated.firstName)} ${safe(validated.lastName)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 8px 24px;">
                <div style="display:inline-block;padding:4px 10px;border-radius:9999px;background:${badgeColor}1A;color:${badgeColor};font-size:12px;font-weight:600;border:1px solid ${badgeColor}33;">${safe(validated.stage)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Title</td>
                    <td style="font-size:14px;color:#111827;font-weight:500;">${safe(validated.title)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Company</td>
                    <td style="font-size:14px;color:#111827;font-weight:500;">${safe(validated.companyName)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Email</td>
                    <td style="font-size:14px;"><a href="mailto:${safe(validated.email)}" style="color:#2563eb;text-decoration:none;">${safe(validated.email)}</a></td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Phone</td>
                    <td style="font-size:14px;color:#111827;">${safe(validated.phone)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Service</td>
                    <td style="font-size:14px;color:#111827;">${safe(validated.serviceType)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Value</td>
                    <td style="font-size:14px;color:#111827;">${safe(validated.value)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;color:#6b7280;font-size:13px;">Assigned To</td>
                    <td style="font-size:14px;color:#111827;">${safe(validated.assignedTo)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;background:#fafafa;border-top:1px solid #f3f4f6;color:#6b7280;font-size:12px;text-align:center;">
                You are receiving this email because you are an Admin or Sales Head.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
 </html>`;

            await sendMail({ to: recipients, subject, html });
          }
        }
      } catch (mailErr) {
      }

      res.status(201).json({ lead, contact });
    } catch (error: any) {
      console.error("Error creating lead:", error);

      if (createdContact) {
        try {
          await storage.deleteContact(createdContact.id);
          console.log(`Rolled back contact creation: ${createdContact.id}`);
        } catch (rollbackError) {
          console.error("Failed to rollback contact creation:", rollbackError);
        }
      }

      if (error.name === "ZodError") {
        return res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.post("/api/leads/bulk", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      const items: any[] = Array.isArray(req.body?.leads) ? req.body.leads : [];
      if (items.length === 0) {
        return res.status(400).json({ error: "No leads provided" });
      }

      const results: { index: number; id?: string; error?: string; issues?: { path: string; message: string }[] }[] = [];
      let createdCount = 0;
      const createdDetails: Array<{ id: string; firstName: string; lastName: string; serviceType: string; value: any; stage: string; assignedTo?: string | null }> = [];

      // helper to resolve assignedTo from various inputs
      const resolveAssignedTo = async (input: any): Promise<string> => {
        const raw = (typeof input === 'string' ? input : '').trim();
        const allUsers = await storage.getAllUsers();
        const byId = raw ? allUsers.find(u => u.id === raw) : undefined;
        if (byId && byId.isActive) return byId.id;
        // try email
        const byEmail = raw ? allUsers.find(u => (u.email || '').toLowerCase() === raw.toLowerCase()) : undefined;
        if (byEmail && byEmail.isActive) return byEmail.id;
        // try username
        const byUsername = raw ? allUsers.find(u => (u.username || '').toLowerCase() === raw.toLowerCase()) : undefined;
        if (byUsername && byUsername.isActive) return byUsername.id;
        // try exact name match
        const byName = raw ? allUsers.filter(u => (u.name || '').toLowerCase() === raw.toLowerCase() && u.isActive) : [];
        if (byName.length === 1) return byName[0].id;
        throw new Error("Assigned user not found or inactive");
      };

      for (let i = 0; i < items.length; i++) {
        let createdContact: any = null;
        try {
          // Allow client to omit title; compute if missing
          const base = items[i] || {};
          let assignedTo: string;
          try {
            assignedTo = await resolveAssignedTo(base.assignedTo || currentUser.id);
          } catch (assignErr: any) {
            results.push({ index: i, error: "Validation failed", issues: [{ path: 'assignedTo', message: assignErr?.message || 'Invalid assigned user' }] });
            continue;
          }
          const createdBy = base.createdBy || currentUser.id;
          const computedTitle = base.title || `${base.firstName ?? ""} ${base.lastName ?? ""} - ${base.serviceType ?? ""}`.trim();
          const validated = insertLeadSchema.parse({ ...base, assignedTo, createdBy, title: computedTitle });

          const hasContactMethod =
            validated.email ||
            validated.phone ||
            validated.skype ||
            validated.telegram ||
            validated.linkedIn;

          let contact = null;
          if (hasContactMethod) {
            const existingContacts = await storage.getContacts();
            const existingContact = existingContacts.find(
              (c) =>
                (validated.email && c.email === validated.email) ||
                (validated.phone && c.phone === validated.phone)
            );
            if (existingContact) {
              contact = existingContact;
            } else {
              const contactData = {
                name: `${validated.firstName} ${validated.lastName}`,
                email: validated.email || null,
                phone: validated.phone || null,
                position: validated.serviceType || "Lead",
                companyName: validated.companyName || null,
                assignedTo: validated.assignedTo || currentUser.id,
                tags: [],
                skype: validated.skype || null,
                telegram: validated.telegram || null,
                linkedIn: validated.linkedIn || null,
                notes: validated.description || null,
              };
              contact = await storage.createContact(contactData);
              createdContact = contact;
            }
          }

          const leadWithContact = {
            ...validated,
            expectedCloseDate: validated.expectedCloseDate || null,
            primaryContactId: contact?.id || null,
          };

          const lead = await storage.createLead(leadWithContact);
          createdCount += 1;
          results.push({ index: i, id: lead.id });
          createdDetails.push({
            id: lead.id,
            firstName: validated.firstName || "",
            lastName: validated.lastName || "",
            serviceType: validated.serviceType || "",
            value: (validated.value as any) ?? "",
            stage: validated.stage || "New",
            assignedTo: validated.assignedTo ?? null,
          });
        } catch (error: any) {
          // Rollback created contact if lead creation failed
          if (createdContact) {
            try { await storage.deleteContact(createdContact.id); } catch { }
          }
          if (error instanceof z.ZodError) {
            const issues = error.errors.map(e => ({
              path: (e.path || []).join('.'),
              message: e.message,
            }));
            results.push({ index: i, error: "Validation failed", ...(issues.length ? { issues } : {}) } as any);
          } else {
            const message = (error && (error as any).message) || "Failed";
            results.push({ index: i, error: message });
          }
        }
      }

      const failedCount = results.filter(r => r.error).length;

      // Send one aggregated email notification (Admins and Sales Head) if configured
      try {
        if (createdCount > 0 && isMailConfigured) {
          const users = await storage.getAllUsers();
          const recipients = users
            .filter(u => (u.role === "Admin" || u.role === "Sales Head") && u.isActive && !!u.email)
            .map(u => u.email);

          if (recipients.length > 0) {
            const subject = `Bulk Lead Import: ${createdCount} created${failedCount ? `, ${failedCount} failed` : ""}`;

            const lines = createdDetails.slice(0, 20).map((d, idx) => {
              const name = `${d.firstName} ${d.lastName}`.trim();
              return `${idx + 1}. ${name} • ${d.serviceType} • Stage: ${d.stage} • Value: ${d.value} • Assigned: ${d.assignedTo ?? "-"}`;
            });

            const moreCount = Math.max(0, createdDetails.length - 20);
            const header = `Created ${createdCount} lead(s).` + (failedCount ? ` Failed: ${failedCount}.` : "");
            const text = [header, "", ...lines, moreCount ? `...and ${moreCount} more` : ""].join("\n");

            const appUrl = process.env.APP_URL || '#';
            const tableRows = createdDetails.slice(0, 20).map((d, idx) => {
              const name = `${d.firstName} ${d.lastName}`.trim();
              return `
                <tr style=\"border-bottom:1px solid #eef2f7\">
                  <td style=\"padding:10px 12px;color:#111827;font-weight:500\">${idx + 1}.</td>
                  <td style=\"padding:10px 12px;color:#111827\">${name}</td>
                  <td style=\"padding:10px 12px;color:#111827\">${d.serviceType}</td>
                  <td style=\"padding:10px 12px\"><span style=\"display:inline-block;padding:4px 10px;border-radius:9999px;background:#eef2ff;color:#2563eb;font-size:12px;font-weight:600;border:1px solid #dbe5ff\">${d.stage}</span></td>
                  <td style=\"padding:10px 12px;color:#111827\">${d.value}</td>
                  <td style=\"padding:10px 12px;color:#6b7280\">${d.assignedTo ?? '-'}</td>
                </tr>`;
            }).join("");

            const html = `<!doctype html>
<html>
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>${subject}</title>
  </head>
  <body style=\"margin:0;padding:24px;background:#f6f7fb;font-family:Inter,Segoe UI,Arial,sans-serif\">
    <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:720px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.06);overflow:hidden\">
      <tr>
        <td style=\"padding:20px 24px;border-bottom:1px solid #eef2f7;background:linear-gradient(135deg,#f8fafc,#eef2ff)\">
          <div style=\"font-size:18px;color:#111827;font-weight:700\">Bulk Lead Import</div>
          <div style=\"margin-top:6px;font-size:13px;color:#6b7280\">${header}</div>
        </td>
      </tr>
      <tr>
        <td style=\"padding:16px 24px\">
          <div style=\"display:flex;gap:10px;align-items:center;margin-bottom:12px\">
            <span style=\"display:inline-block;padding:6px 12px;border-radius:9999px;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;font-size:12px;font-weight:700\">Created: ${createdCount}</span>
            ${failedCount ? `<span style=\\"display:inline-block;padding:6px 12px;border-radius:9999px;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;font-size:12px;font-weight:700\\">Failed: ${failedCount}</span>` : ''}
          </div>
          <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;border-spacing:0 0\">
            <thead>
              <tr style=\"background:#f9fafb;border-bottom:1px solid #eef2f7\">
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">#</th>
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">Name</th>
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">Service</th>
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">Stage</th>
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">Value</th>
                <th align=\"left\" style=\"padding:10px 12px;color:#6b7280;font-size:12px;font-weight:600\">Assigned</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          ${moreCount ? `<div style=\\"margin-top:12px;color:#6b7280\\">...and ${moreCount} more</div>` : ''}
        </td>
      </tr>
      <tr>
        <td style=\"padding:12px 24px;background:#f9fafb;border-top:1px solid #eef2f7;color:#6b7280;font-size:12px\">This is an automated summary for your recent bulk import.</td>
      </tr>
    </table>
  </body>
</html>`;

            await sendMail({ to: recipients, subject, html });
          }
        }
      } catch (mailErr) {
        // swallow email errors for bulk import
      }
      res.status(createdCount === 0 ? 400 : failedCount > 0 ? 207 : 201).json({
        created: createdCount,
        failed: failedCount,
        total: items.length,
        results,
      });
    } catch (err) {
      res.status(500).json({ error: "Bulk create failed" });
    }
  });

  app.patch("/api/leads/bulk-assign", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      // Only Admin and Sales Head can bulk assign leads
      if (currentUser.role !== "Admin" && currentUser.role !== "Sales Head") {
        return res
          .status(403)
          .json({ error: "Only Admin and Sales Head can reassign leads" });
      }

      const { leadIds, assignedTo } = req.body;

      if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
        return res.status(400).json({ error: "Lead IDs are required" });
      }

      if (!assignedTo) {
        return res.status(400).json({ error: "Assigned user is required" });
      }

      // Verify the assigned user exists and is active
      const assignedUser = await storage.getUser(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ error: "Assigned user not found" });
      }

      if (!assignedUser.isActive) {
        return res
          .status(400)
          .json({ error: "Cannot assign to inactive user" });
      }

      // Track results
      const results = {
        success: [] as string[],
        failed: [] as { id: string; reason: string }[],
      };

      // Update all leads with atomic activity logging
      for (const leadId of leadIds) {
        try {
          // Check if lead exists before updating
          const existingLead = await storage.getLead(leadId);
          if (!existingLead) {
            results.failed.push({ id: leadId, reason: "Lead not found" });
            continue;
          }

          // Update lead
          const lead = await storage.updateLead(leadId, { assignedTo });
          if (lead) {
            // Only log activity if update succeeded
            try {
              await storage.createActivity({
                type: "assignment",
                description: `Lead assigned to ${assignedUser.name}`,
                activityDate: new Date(),
                leadId: leadId,
                clientId: null,
                userId: currentUser.id,
                attachments: [],
              });
              results.success.push(leadId);
            } catch (activityError) {
              console.error(
                `Failed to log activity for lead ${leadId}:`,
                activityError
              );
              // Still count as success since lead was updated
              results.success.push(leadId);
            }
          } else {
            results.failed.push({ id: leadId, reason: "Update failed" });
          }
        } catch (error) {
          console.error(`Error updating lead ${leadId}:`, error);
          results.failed.push({ id: leadId, reason: "Internal error" });
        }
      }

      // Return appropriate status code based on results
      if (results.success.length === 0) {
        return res.status(400).json({
          error: "Failed to assign any leads",
          failed: results.failed.length,
          details: results.failed,
        });
      }

      // Partial or full success
      const statusCode = results.failed.length > 0 ? 207 : 200;
      res.status(statusCode).json({
        success: results.success.length > 0,
        updated: results.success.length,
        failed: results.failed.length,
        message: `Successfully assigned ${results.success.length} of ${leadIds.length} lead(s)`,
        failedLeads: results.failed.length > 0 ? results.failed : undefined,
      });
    } catch (error) {
      console.error("Error bulk assigning leads:", error);
      res.status(500).json({ error: "Failed to assign leads" });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      // Get the old lead - but only to check access, don't expose it yet
      const oldLead = await storage.getLead(req.params.id);
      if (!oldLead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      // Check if user has permission to edit this lead BEFORE proceeding
      const allUsers = await storage.getAllUsers();
      const teamMemberIds =
        currentUser.role === "BDM"
          ? allUsers
            .filter((u) => u.managerId === currentUser.id)
            .map((u) => u.id)
          : [];

      const canEdit =
        currentUser.role === "Admin" ||
        currentUser.role === "Sales Head" ||
        oldLead.assignedTo === currentUser.id;
      // BDM cannot edit team members' leads (they can only view them masked)

      // Block unauthorized access BEFORE any further operations
      if (!canEdit) {
        return res
          .status(403)
          .json({ error: "You do not have permission to edit this lead" });
      }

      // Update the lead (only executes if authorized)
      const lead = await storage.updateLead(req.params.id, req.body);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      // If stage changed, log an activity
      if (req.body.stage && oldLead.stage !== req.body.stage) {
        await storage.createActivity({
          type: "stage_change",
          description: `Stage changed from "${oldLead.stage}" to "${req.body.stage}"`,
          activityDate: new Date(),
          leadId: req.params.id,
          clientId: null,
          userId: req.body.userId || "user-1", // Use the userId from request body or default
          attachments: [],
        });

        // Auto-create client when stage changes to "Won / Project Awarded" (if enabled in settings)
        if (
          req.body.stage === "Won / Project Awarded" ||
          req.body.stage === "Won"
        ) {
          try {
            // Check settings to see if auto-create is enabled
            const settings = await storage.getSettings();

            if (settings.autoCreateClientOnWin) {
              // Check if client already exists for this lead
              const existingClients = await storage.getClients();
              const clientExists = existingClients.some(
                (c) => c.leadId === req.params.id
              );

              if (!clientExists) {
                // Use firstName + lastName as company name (with fallback to companyName if provided)
                const clientCompanyName =
                  lead.companyName ||
                  `${lead.firstName} ${lead.lastName}`.trim();

                await storage.createClient({
                  companyName: clientCompanyName,
                  leadId: req.params.id,
                  primaryContactId: lead.primaryContactId || null,
                  convertedBy: req.body.userId || "user-1",
                  industry: null,
                  size: null,
                  website: null,
                  notes: null,
                });
                console.log(
                  `Auto-created client for lead ${req.params.id} (${clientCompanyName})`
                );
              }
            } else {
              console.log(
                `Auto-create client is disabled in settings. Lead ${req.params.id} remains unconverted.`
              );
            }
          } catch (clientError) {
            console.error("Error auto-creating client:", clientError);
            // Don't fail the whole request if client creation fails
          }
        }
      }

      res.json(lead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", requireAdmin, async (req, res) => {
    try {
      // Check if lead exists
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      // Protective delete: Check if an associated client exists
      const clients = await storage.getClients();
      const associatedClient = clients.find(
        (client) => client.leadId === req.params.id
      );

      if (associatedClient) {
        return res.status(400).json({
          error:
            "Cannot delete lead with an associated client. Please delete the client first.",
          clientId: associatedClient.id,
          clientName: associatedClient.companyName,
        });
      }

      // Delete all tasks related to this lead only
      const tasks = await storage.getTasks();
      const leadTasks = tasks.filter((task) => task.leadId === req.params.id);
      for (const task of leadTasks) {
        await storage.deleteTask(task.id);
      }
      console.log(
        `Deleted ${leadTasks.length} task(s) linked to lead ${req.params.id}`
      );

      // Delete all activities related to this lead only
      const activities = await storage.getActivities();
      const leadActivities = activities.filter(
        (activity) => activity.leadId === req.params.id
      );
      for (const activity of leadActivities) {
        await storage.deleteActivity(activity.id);
      }
      console.log(
        `Deleted ${leadActivities.length} activity(ies) linked to lead ${req.params.id}`
      );

      // Check if primary contact is orphaned (not used by any other lead)
      if (lead.primaryContactId) {
        const allLeads = await storage.getLeads();
        const otherLeadsUsingContact = allLeads.filter(
          (l) =>
            l.id !== req.params.id &&
            l.primaryContactId === lead.primaryContactId
        );

        if (otherLeadsUsingContact.length === 0) {
          // Contact is orphaned, safe to delete
          await storage.deleteContact(lead.primaryContactId);
          console.log(`Deleted orphaned contact ${lead.primaryContactId}`);
        } else {
          console.log(
            `Contact ${lead.primaryContactId} is still used by ${otherLeadsUsingContact.length} other lead(s)`
          );
        }
      }

      // Delete the lead
      await storage.deleteLead(req.params.id);
      res.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Settings routes
  app.get("/api/settings", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getSettings();
      const pipelineStages = await storage.getAllPipelineStages();
      const serviceTypes = await storage.getServiceTypes();
      const response = {
        ...settings,
        pipelineStages: pipelineStages.map(stage => ({
          id: stage.id,
          name: stage.name,
          color: stage.color,
          order: stage.order,
        })),
        serviceTypes: serviceTypes.map(s => ({ id: s.id, name: s.name, color: s.color, order: s.order })),
      };

      return res.json(response);

    } catch (error) {
      console.error("Error in /api/settings:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      return res.status(500).json({
        error: "Failed to fetch settings",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // ---------------- PIPELINE STAGES ----------------
  app.patch("/api/settings/pipeline-stages", requireAdmin, async (req, res) => {
    try {
      const { action, data } = req.body;

      switch (action) {

        // CREATE
        case "create": {
          if (!data?.name || !data?.color) {
            return res.status(400).json({ error: "Name and color are required" });
          }

          const stage = await storage.createPipelineStage({
            name: data.name,
            color: data.color,
          });

          return res.status(201).json(stage);
        }

        // UPDATE
        case "update": {
          if (!data?.id) {
            return res.status(400).json({ error: "ID is required" });
          }

          const updated = await storage.updatePipelineStage(data.id, {
            name: data.name,
            color: data.color,
            order: data.order,
          });

          if (!updated) return res.status(404).json({ error: "Stage not found" });

          return res.json(updated);
        }

        // DELETE
        case "delete": {
          if (!data?.id) {
            return res.status(400).json({ error: "ID is required" });
          }

          const success = await storage.deletePipelineStage(data.id);

          if (!success) return res.status(404).json({ error: "Stage not found" });

          return res.json({ success: true, deletedId: data.id });
        }

        // REORDER
        case "reorder": {
          if (!Array.isArray(data?.ordered)) {
            return res.status(400).json({ error: "ordered must be an array" });
          }

          await storage.reorderPipelineStages(data.ordered);

          return res.json({ success: true });
        }

        default:
          return res.status(400).json({ error: "Invalid action" });
      }

    } catch (error) {
      console.error("Pipeline stage error:", error);
      return res.status(500).json({ error: `Failed to ${req.body.action}` });
    }
  });

  // ---------------- SERVICE TYPES ----------------
  app.patch("/api/settings/service-types", requireAdmin, async (req, res) => {
    try {
      const { action, data } = req.body;

      switch (action) {
        case "create": {
          if (!data?.name || !data?.color) {
            return res.status(400).json({ error: "Name and color are required" });
          }
          const created = await storage.createServiceType({ name: data.name, color: data.color });
          return res.status(201).json(created);
        }
        case "update": {
          if (!data?.id) {
            return res.status(400).json({ error: "ID is required" });
          }
          const updated = await storage.updateServiceType(data.id, { name: data.name, color: data.color, order: data.order });
          if (!updated) return res.status(404).json({ error: "Service type not found" });
          return res.json(updated);
        }
        case "delete": {
          if (!data?.id) {
            return res.status(400).json({ error: "ID is required" });
          }
          const ok = await storage.deleteServiceType(data.id);
          if (!ok) return res.status(404).json({ error: "Service type not found" });
          return res.json({ success: true, deletedId: data.id });
        }
        case "reorder": {
          if (!Array.isArray(data?.ordered)) {
            return res.status(400).json({ error: "ordered must be an array" });
          }
          await storage.reorderServiceTypes(data.ordered);
          return res.json({ success: true });
        }
        default:
          return res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
      console.error("Service types error:", error);
      return res.status(500).json({ error: `Failed to ${req.body.action}` });
    }
  });

  app.patch("/api/settings", async (req, res) => {
    try {
      const settings = await storage.updateSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Error updating settings:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
