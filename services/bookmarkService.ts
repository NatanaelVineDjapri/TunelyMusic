export const addBookmark = async (trackId: string, username: string) => {
  const res = await fetch("/api/bookmarks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackId, username }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal menambahkan bookmark");
  return data;
};

export const removeBookmark = async (trackId: string, username: string) => {
  const res = await fetch("/api/bookmarks/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackId, username }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal menghapus bookmark");
  return data;
};

export const fetchBookmarks = async (username: string) => {
  const res = await fetch(`/api/bookmarks/${username}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengambil bookmark");
  return data;
};
