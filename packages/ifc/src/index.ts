/**
 * @metranik/ifc — BIM/IFC metraj extraction
 */

export * from "./types";
export * from "./parser";
export * from "./extractor";

export async function processIfc(file: File) {
  const { initIfcApi, parseIfc, extractQuantities, closeIfc } = await import(
    "./parser"
  );
  const { extractQuantities: extract } = await import("./extractor");

  const startTime = performance.now();

  try {
    await initIfcApi();
    const model = await parseIfc(file);
    const extracted = await extractQuantities(model);

    return {
      fileName: file.name,
      entities: [],
      extracted,
      parseTime: performance.now() - startTime,
    };
  } catch (error) {
    throw new Error(`Failed to process IFC file: ${error}`);
  }
}
