export const API_BASE = "http://localhost:8080";

export async function getJson(path: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + path, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function postJson(path: string, body: any) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function putJson(path: string, body: any) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function del(path: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + path, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error(await res.text());
}
