export async function getWithLogs(url: string, opts: RequestInit = {}) {
  console.log("➡️ GET", url, opts);
  const res = await fetch(url, opts);
  const text = await res.text();
  console.log("⬅️", res.status, text);
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) };
  } catch {
    return { ok: res.ok, status: res.status, data: text };
  }
}
