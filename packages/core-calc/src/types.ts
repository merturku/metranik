import type { ZodType } from "zod";

export type Discipline = "mekanik" | "elektrik" | "insaat" | "ev";

export interface CalcResult<O> {
  value: O;
  intermediates: Record<string, number | string>;
  standardsUsed: string[];
  verdict?: { status: "uygun" | "sinirda" | "uygunsuz"; note: string };
}

export interface CalcModule<I, O> {
  id: string;
  title: string;
  discipline: Discipline;
  standards: string[];
  inputSchema: ZodType<I>;
  compute(input: I): CalcResult<O>;
}
