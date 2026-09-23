import React from 'react';
import type { Note } from '../types';
import { UserCheck } from 'lucide-react';
import { formatNoteTime } from '../lib/formatters';

export const NoteTimeline: React.FC<{ notes: Note[] }> = ({ notes }) => {
  if (!notes.length) {
    return <p className="text-sm text-ink/40 py-4">No notes yet.</p>;
  }

  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-line/70 before:-z-0">
      {notes.map((note, index) => (
        <div key={note.id || index} className="flex items-start gap-3.5 relative z-10">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-card">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 bg-canvas border border-line rounded-xl p-4 shadow-2xs hover:border-line/90 transition-colors">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-line/60">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-ink">Support Agent</span>
                <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold">
                  INTERNAL
                </span>
              </div>
              <span className="text-[11px] font-mono text-ink/45">
                {formatNoteTime(note.created_at)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed whitespace-pre-wrap font-sans">
              {note.note_text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};