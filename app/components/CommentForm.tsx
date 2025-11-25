"use client";
import React, { useState } from "react";
import { addComment } from "@/services/commentServices";

interface CommentFormProps {
  trackId: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ trackId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const username = localStorage.getItem("username") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert("Silakan login terlebih dahulu!");
    if (!comment.trim()) return alert("Isi komentar dulu!");

    try {
      console.log("Mengirim comment:", { trackId, username, comment });
      await addComment(trackId, username, comment);
      setComment("");
      onCommentAdded();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-control mb-2"
        placeholder="Tulis komentar..."
        rows={3}
      />
      <button type="submit" className="btn btn-primary">
        Kirim
      </button>
    </form>
  );
};

export default CommentForm;
