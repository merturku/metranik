/**
 * @metranik/ifc — BIM/IFC metraj extraction
 */

export * from "./types";
export * from "./parser";
export * from "./extractor";
export * from "./mapper";

export async function processIfc(file: File) {
  const { initIfcApi, parseIfc } = await import("./parser");
  const { extractQuantities } = await import("./extractor");
  const { mapToModules } = await import("./mapper");

  const startTime = performance.now();

  try {
    await initIfcApi();
    const model = await parseIfc(file);
    const extracted = await extractQuantities(model);
    const mapped = mapToModules(extracted);

    return {
      fileName: file.name,
      entities: [],
      extracted,
      mapped,
      parseTime: performance.now() - startTime,
    };
  } catch (error) {
    throw new Error(`Failed to process IFC file: ${error}`);
  }
}
