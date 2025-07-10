import React, { useState } from 'react';

const CommentsSection = ({ comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>

      {/* Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Add a comment..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
      >
        Post
      </button>

      {/* List of Comments */}
      <ul className="mt-4 space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="border p-2 rounded">
            <p className="font-semibold">
              {c.userId?.username || 'Anonymous'}
            </p>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
