import React from 'react';
import type { Note } from '../types';
import { MessageSquare } from 'lucide-react';

export const NoteTimeline: React.FC<{ notes: Note[] }> = ({ notes }) => {
  if (!notes.length) {
    return <p className="text-sm text-ink/40 py-4">No notes yet.</p>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MessageSquare className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex-1 bg-canvas border border-line rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-sm text-ink">Note</span>
              <span className="text-xs font-mono text-ink/40">
                {new Date(note.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-ink/75 whitespace-pre-wrap">{note.note_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};