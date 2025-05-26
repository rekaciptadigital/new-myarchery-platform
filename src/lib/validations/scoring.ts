import { z } from "zod";

export const scoreEntrySchema = z.object({
  endNumber: z.number().min(1).max(12),
  scores: z.array(z.number().min(0).max(10)).min(3).max(6),
  notes: z.string().optional(),
});

export const targetAssignmentSchema = z.object({
  targetNo: z.string().min(1, "Target number is required"),
  archerId: z.string().min(1, "Archer ID is required"),
  category: z.string().min(1, "Category is required"),
  judge: z.string().min(1, "Judge assignment is required"),
});

export const scoringConfigurationSchema = z.object({
  maxArrowsPerEnd: z.number().min(3).max(6),
  totalEnds: z.number().min(6).max(12),
  scoringSystem: z.enum(["10-ring", "5-ring"]),
  timePerEnd: z.number().min(120).max(300), // 2-5 minutes in seconds
  allowScoreEdit: z.boolean(),
  requireJudgeValidation: z.boolean(),
  autoCalculateRankings: z.boolean(),
});

export type ScoreEntryInput = z.infer<typeof scoreEntrySchema>;
export type TargetAssignmentInput = z.infer<typeof targetAssignmentSchema>;
export type ScoringConfigurationInput = z.infer<typeof scoringConfigurationSchema>;
