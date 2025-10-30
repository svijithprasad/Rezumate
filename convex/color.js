import { query } from "./_generated/server";

export const getColors = query({
    args: {},
    handler: async (ctx) => {
        // Fetch all documents from the "accentColors" table
        return await ctx.db.query("accentColors").collect();
    },
});
