import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Sparkles, Copy, Check, ArrowDownToLine } from 'lucide-react';

interface AISuggestionProps {
  onSuggest: () => void;
  suggestion: string | null;
  isLoading: boolean;
  onApply?: (text: string) => void;
}

export const AISuggestion: React.FC<AISuggestionProps> = ({
  onSuggest,
  suggestion,
  isLoading,
  onApply,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-line rounded-xl p-4 bg-canvas/60">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold flex items-center gap-1.5 text-ink">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Response Copilot
        </h4>
        <Button size="sm" variant="ghost" onClick={onSuggest} isLoading={isLoading}>
          {suggestion ? 'Regenerate' : 'Generate Reply'}
        </Button>
      </div>

      {suggestion && (
        <div className="space-y-3">
          <div className="relative bg-card border border-line rounded-lg p-3.5 text-sm text-ink/85 leading-relaxed whitespace-pre-wrap">
            {suggestion}
          </div>
          <div className="flex items-center justify-end gap-2 text-xs">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-card text-ink/70 hover:text-ink hover:bg-canvas transition-colors font-semibold cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-status-closed" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy text</span>
                </>
              )}
            </button>
            {onApply && (
              <button
                onClick={() => onApply(suggestion)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary-deep transition-colors font-semibold cursor-pointer"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Use as note</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};