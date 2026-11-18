import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Izgara yerleşimi: nx = ⌈L/Smaks⌉, ny = ⌈W/Smaks⌉; alan (L/nx)(W/ny) > Amaks ise büyük aralıklı doğrultuya sıra eklenir.
export const sprinklerAdediYerlesimiInputSchema = z.object({
  boy_m: z.number().positive(),
  en_m: z.number().positive(),
  aMaks_m2: z.number().positive(),
  sMaks_m: z.number().positive(),
});

export type SprinklerAdediYerlesimiInput = z.infer<typeof sprinklerAdediYerlesimiInputSchema>;

export interface SprinklerAdediYerlesimiOutput {
  sprinklerAdedi: number;
}

function compute(input: SprinklerAdediYerlesimiInput): CalcResult<SprinklerAdediYerlesimiOutput> {
  let nx = Math.max(1, Math.ceil(input.boy_m / input.sMaks_m - 1e-9));
  let ny = Math.max(1, Math.ceil(input.en_m / input.sMaks_m - 1e-9));
  for (let i = 0; i < 10000 && (input.boy_m / nx) * (input.en_m / ny) > input.aMaks_m2 + 1e-9; i++) {
    if (input.boy_m / nx >= input.en_m / ny) nx += 1;
    else ny += 1;
  }
  const sx = input.boy_m / nx;
  const sy = input.en_m / ny;
  return {
    value: { sprinklerAdedi: nx * ny },
    intermediates: { nx, ny, aralik_x_m: sx, aralik_y_m: sy, sprinkler_basina_alan_m2: sx * sy },
    standardsUsed: ["NFPA 13 / TS EN 12845 (yerleşim kuralları)"],
  };
}

export const sprinklerAdediYerlesimi: CalcModule<SprinklerAdediYerlesimiInput, SprinklerAdediYerlesimiOutput> = {
  id: "sprinkler-adedi-yerlesimi",
  title: "Sprinkler Adedi ve Izgara Yerleşimi",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: sprinklerAdediYerlesimiInputSchema,
  compute,
};
