import { z } from "zod";
export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  description: z.string().min(1, "Des is required"),
});
