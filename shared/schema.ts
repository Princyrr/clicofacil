import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cycleData = pgTable("cycle_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cycleDuration: integer("cycle_duration").notNull().default(28),
  periodDuration: integer("period_duration").notNull().default(5),
  lastPeriodDate: timestamp("last_period_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const insertCycleDataSchema = createInsertSchema(cycleData).pick({
  cycleDuration: true,
  periodDuration: true,
  lastPeriodDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCycleData = z.infer<typeof insertCycleDataSchema>;
export type CycleData = typeof cycleData.$inferSelect;
