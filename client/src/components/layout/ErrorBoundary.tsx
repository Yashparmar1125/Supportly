import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Supportly Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas flex flex-col justify-between selection:bg-primary/10 selection:text-primary">
          <header className="border-b border-line bg-card/80 backdrop-blur-md px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <Logo />
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-lg w-full">
              <div className="border border-line rounded-2xl overflow-hidden bg-card shadow-[0_24px_60px_-24px_rgba(26,26,46,0.22)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-canvas/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-ink/40 font-medium">
                    APPLICATION_RECOVERY
                  </span>
                  <div className="w-10" />
                </div>

                <div className="p-8 text-center sm:p-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 mb-6 shadow-xs">
                    <AlertCircle className="w-7 h-7" />
                  </div>

                  <h1 className="text-2xl font-extrabold text-ink tracking-tight mb-2">
                    Something went wrong
                  </h1>

                  <p className="text-sm text-ink/65 leading-relaxed mb-6 max-w-sm mx-auto">
                    An unexpected error occurred while displaying this page. Please reload the application or return to your tickets dashboard.
                  </p>

                  {this.state.error && (
                    <div className="mb-6 p-3 rounded-lg bg-canvas border border-line text-left overflow-x-auto max-h-32 text-xs font-mono text-ink/70">
                      {this.state.error.message}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={this.handleReload}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-deep text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reload Application</span>
                    </button>

                    <button
                      onClick={this.handleGoHome}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-card hover:bg-canvas border border-line text-ink text-xs font-bold transition-all cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-ink/50" />
                      <span>Back to Dashboard</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="text-center py-6 text-xs text-ink/40">
            Supportly Application Recovery
          </footer>
        </div>
      );
    }

    return this.props.children;
  }
}
