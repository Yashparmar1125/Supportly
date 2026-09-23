import React from 'react';
import type { Note } from '../types';
import { Lock, MessageSquare } from 'lucide-react';
import { formatNoteTime, formatRelativeTime, getInitials } from '../lib/formatters';

export const NoteTimeline: React.FC<{ notes: Note[] }> = ({ notes }) => {
  if (!notes.length) {
    return <p className="text-sm text-ink/40 py-4">No notes or customer replies yet.</p>;
  }

  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-line/70 before:-z-0">
      {notes.map((note, index) => {
        const isInternal = note.is_internal !== false;
        const author = note.author_name || 'Support Agent';
        const initials = getInitials(author);

        return (
          <div key={note.id || index} className="flex items-start gap-3.5 relative z-10">
            {/* Author Avatar with initials */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs border-2 border-card text-white font-bold text-[11px] font-mono ${
                isInternal ? 'bg-slate-700' : 'bg-primary'
              }`}
              title={author}
            >
              {initials}
            </div>

            <div
              className={`flex-1 rounded-xl p-4 shadow-2xs border transition-colors ${
                isInternal
                  ? 'bg-amber-50/20 border-amber-200/50 hover:border-amber-300/60'
                  : 'bg-canvas border-line hover:border-line/90'
              }`}
            >
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2 pb-2 border-b border-line/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-ink">{author}</span>
                  {isInternal ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-mono font-bold">
                      <Lock className="w-2.5 h-2.5" />
                      INTERNAL NOTE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-50 text-primary border border-primary/20 text-[10px] font-mono font-bold">
                      <MessageSquare className="w-2.5 h-2.5" />
                      CUSTOMER REPLY
                    </span>
                  )}
                </div>
                <span
                  className="text-[11px] font-mono text-ink/45 cursor-default"
                  title={formatNoteTime(note.created_at)}
                >
                  {formatRelativeTime(note.created_at)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed whitespace-pre-wrap font-sans">
                {note.note_text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};