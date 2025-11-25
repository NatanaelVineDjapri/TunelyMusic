"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"; 
import {fetchComments, deleteComment, updateComment} from "@/services/commentServices";

interface Comment {
  id: number;
  username: string;
  comment: string;
  track_id: string;
  created_at: string;
}

interface CommentListProps {
  trackId: string;
  reload?: boolean;
  currentUsername?: string;
}

const CommentList: React.FC<CommentListProps> = ({
  trackId,
  reload,
  currentUsername,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const loadComments = async () => {
    if (!trackId) return;
    try {
      const data = await fetchComments(trackId);
      setComments(data);
    } catch (err: any) {
      console.error("Error fetching comments:", err.message);
    }
  };

  useEffect(() => {
    loadComments();
  }, [trackId, reload]);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.comment);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editText.trim()) return alert("Komentar tidak boleh kosong");

    try {
      await updateComment(id, editText);
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, comment: editText } : c))
      );
      setEditingId(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (comments.length === 0)
    return <p className="text-muted mt-3">Belum ada komentar.</p>;

  return (
    <ul className="list-group list-group-flush mt-3">
      {comments.map((c) => (
        <li key={c.id} className="list-group-item px-0 py-3 border-bottom">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-1">
                <strong className="text-dark me-2">{c.username}</strong>
                <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {new Date(c.created_at).toLocaleString()}
                </small>
              </div>
              {editingId === c.id ? (
                <div className="mt-2">
                  <textarea
                    className="form-control mb-2"
                    rows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success d-flex align-items-center gap-1"
                      onClick={() => handleSaveEdit(c.id)}
                    >
                      <FaCheck /> Simpan
                    </button>
                    <button
                      className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
                      onClick={() => setEditingId(null)}
                    >
                      <FaTimes /> Batal
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mb-0 text-secondary">{c.comment}</p>
              )}
            </div>
            {currentUsername === c.username && !editingId && (
              <div className="d-flex gap-2 ms-3">
                <button
                  className="btn btn-outline-primary btn-sm border-0"
                  title="Edit Komentar"
                  onClick={() => handleStartEdit(c)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm border-0"
                  title="Hapus Komentar"
                  onClick={() => handleDelete(c.id)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
