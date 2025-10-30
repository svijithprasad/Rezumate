
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create resume
export const create = mutation({
  args: {
    title: v.string(),
    templateId: v.string(),
    accentColor: v.string(), // ✅ ADD THIS
    createdAt: v.number(),
    lastEdited: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.insert("resumes", {
      userId: identity.subject,
      title: args.title,
      templateId: args.templateId,
      accentColor: args.accentColor, // ✅ now valid
      isFavorite: false,
      createdAt: args.createdAt,
      lastEdited: args.lastEdited,
    });
  },
});



// Update resume
export const update = mutation({
  args: {
    id: v.id("resumes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    aiEnhancedContent: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFavorite: v.optional(v.boolean()),
    templateId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user.subject) {
      throw new Error("Resume not found or unauthorized");
    }

    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      lastEdited: Date.now(),
    });

    return { success: true };
  },
});

// Get single resume
export const get = query({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user.subject) {
      throw new Error("Resume not found or unauthorized");
    }

    return resume;
  },
});

export const getResumesByUserId = query({
  args: {
    userId: v.string(), // Clerk user ID
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // ✅ Only allow user to get their own resumes
    if (identity.subject !== args.userId) {
      throw new Error("Unauthorized access");
    }

    // ✅ Fetch all resumes for this user
    const resumes = await ctx.db
      .query("resumes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc") // newest first
      .collect();

    return resumes;
  },
});