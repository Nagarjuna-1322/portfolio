import React from 'react';
import { Eye, Activity } from 'lucide-react';
import { useVisitorCount } from '../hooks/useVisitorCount';

interface VisitorCounterProps {
  variant?: 'pill' | 'badge' | 'card';
  className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ variant = 'pill', className = '' }) => {
  const { visitorCount, isLive, loading } = useVisitorCount();

  const formattedCount = visitorCount !== null ? visitorCount.toLocaleString() : '...';

  if (variant === 'badge') {
    return (
      <div 
        id="visitor-counter-badge"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider ${className}`}
        title={isLive ? "Live synced via Firebase Realtime Firestore" : "Visitor tracking active"}
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </div>
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>Views:</span>
        <span className="font-bold text-white font-mono">
          {loading ? '...' : formattedCount}
        </span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div 
        id="visitor-counter-card"
        className={`p-3.5 rounded-2xl bg-black/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3 group ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              Firebase Live Counter
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
              {loading ? 'Connecting...' : `${formattedCount} Portfolio Views`}
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          ONLINE
        </div>
      </div>
    );
  }

  // Default: sleek pill
  return (
    <div 
      id="visitor-counter-pill"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:border-cyan-500/30 transition-colors ${className}`}
      title={isLive ? "Live synced via Firebase Realtime Firestore" : "Visitor tracking active"}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>
      <Eye className="w-3.5 h-3.5 text-cyan-400" />
      <span className="text-gray-400">Views:</span>
      <span className="text-white font-bold font-mono">
        {loading ? '...' : formattedCount}
      </span>
    </div>
  );
};
