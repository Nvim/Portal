export async function getRapier() {
  const rapier = await import("@dimforge/rapier3d");
  return rapier;
}
