export const fetchProfile = async (username: string) => {
  const res = await fetch("/api/profile", {
    headers: { username },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
};

export const updateProfile = async (oldUsername: string, newUsername: string) => {
  const res = await fetch(`/api/profile/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldUsername, newUsername }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal update profile");
  return data;
};