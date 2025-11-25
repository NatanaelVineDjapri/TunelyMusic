export const fetchComments = async (trackId: string) => {
  if (!trackId) throw new Error("trackId missing");

  const res = await fetch(`/api/comments/${trackId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengambil comment");
  return data.comments;
};

export const addComment = async (trackId: string, username: string, comment: string) => {
  const res = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackId, username, comment }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal menambahkan comment");
  }

  const data = await res.json();
  return data;
};

export const deleteComment = async (commentId: number) => {
  const res = await fetch(`/api/comments/delete`, { 
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: commentId }), 
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal menghapus");
  return data;
};

export const updateComment = async (commentId: number, newText: string) => {
  const res = await fetch(`/api/comments/edit`, { 
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: commentId, comment: newText }), 
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengupdate");
  return data;
};