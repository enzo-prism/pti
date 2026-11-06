/** An HTML redirect/error page with a 200 status must not count as a lead. */
export const submitLeadForm = async (endpoint: string, body: FormData | string) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", ...(typeof body === "string" ? { "Content-Type": "application/json" } : {}) },
    body,
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error("The form provider did not accept the request.");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("The form provider did not confirm acceptance.");
  }
};
