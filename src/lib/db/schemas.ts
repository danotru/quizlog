import {
  boolean,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Supabase-generated auth schema
 */
const authSchema = pgSchema("auth");

/**
 * Supabase-generated users schema
 */
export const usersTable = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

/**
 * User relationships
 */
export const userRelations = relations(usersTable, ({ one }) => ({
  profile: one(profilesTable),
}));

/**
 * User profiles table
 */
export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
});

/**
 * Profile relationships
 */
export const profileRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}));

/**
 * Quiz privacy enum
 */
export const quizPrivacyEnum = pgEnum("quiz_privacy", ["public", "private"]);

/**
 * Quizzes table
 */
export const quizzesTable = pgTable("quizzes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  bannerUrl: text("banner_url"),
  description: text("description"),
  privacy: quizPrivacyEnum().notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
});

/**
 * Quiz relationships
 */
export const quizRelations = relations(quizzesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [quizzesTable.userId],
    references: [usersTable.id],
  }),
  questions: many(questionsTable),
}));

/**
 * Question type enum
 */
export const questionTypeEnum = pgEnum("question_type", [
  "multiple_choice",
  "multiple_answer",
  "true_or_false",
  "short_answer",
  /*"fill_in_the_blank_text",
  "fill_in_the_blank",*/
]);

/**
 * Quiz questions table
 */
export const questionsTable = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  type: questionTypeEnum().notNull(),
  explanation: text("explanation"),
  hint: text("hint"),
  quizId: uuid("quiz_id")
    .references(() => quizzesTable.id, { onDelete: "cascade" })
    .notNull(),
});

/**
 * Question relationships
 */
export const questionRelations = relations(questionsTable, ({ one, many }) => ({
  quiz: one(quizzesTable, {
    fields: [questionsTable.quizId],
    references: [quizzesTable.id],
  }),
  answers: many(answersTable),
}));

/**
 * Question answers table
 */
export const answersTable = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  questionId: uuid("question_id")
    .references(() => questionsTable.id, { onDelete: "cascade" })
    .notNull(),
});

/**
 * Answer relationships
 */
export const answerRelations = relations(answersTable, ({ one }) => ({
  question: one(questionsTable, {
    fields: [answersTable.questionId],
    references: [questionsTable.id],
  }),
}));
