export const fetchProfile = async (username: string) => {
  const res = await fetch("/api/profile", {
    headers: { username },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
};
