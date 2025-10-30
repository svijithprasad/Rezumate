import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ==========================
  // Resume Collection
  // ==========================
  resumes: defineTable({
    userId: v.string(), // Clerk user ID (from auth)
    title: v.string(), // e.g. "Frontend Developer Resume"
    content: v.optional(v.string()), // raw text or structured JSON from editor
    aiEnhancedContent: v.optional(v.string()), // optional AI-enhanced version
    tags: v.optional(v.array(v.string())), // optional keywords or skill tags
    isFavorite: v.boolean(false), // quick toggle flag
    templateId: v.optional(v.string()), // which template used (if multiple templates supported)
    accentColor: v.optional(v.string()),
    lastEdited: v.number(), // timestamp (Date.now())
    createdAt: v.number(), // timestamp
  })
    .index("by_user", ["userId"])
    .index("by_favorite", ["userId", "isFavorite"])
    .index("by_template", ["templateId"]),

  // ==========================
  // Templates Collection
  // (if you offer multiple designs)
  // ==========================
  templates: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    previewUrl: v.optional(v.string()), // link to preview image
    structure: v.optional(v.string()), // JSON or HTML template definition
    createdAt: v.number(),
  }),

  // ==========================
  // AI Enhancements Logs
  // (optional: track enhancements per resume)
  // ==========================
  aiEnhancements: defineTable({
    resumeId: v.id("resumes"),
    userId: v.string(),
    prompt: v.string(), // user prompt
    result: v.string(), // AI output text
    createdAt: v.number(),
  }).index("by_resume", ["resumeId"]),


  accentColors: defineTable({
    label: v.string(),
    color: v.string()
  })
});
