import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building,
  KeyRound,
  CheckCircle2,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const roleName = user.role?.name || 'PUBLIC_VIEWER';

  const roleClearanceMap: Record<string, { level: string; color: string; badge: string }> = {
    AICTE_ADMIN: { level: 'Level 5: Supreme System Governance', color: 'from-violet-600 to-indigo-600', badge: '👑 AICTE Chief Administrator' },
    BUREAU_HEAD: { level: 'Level 4: National Bureau Authorization', color: 'from-blue-600 to-cyan-600', badge: '🏢 Academic Bureau Head' },
    CURRICULUM_EXPERT: { level: 'Level 3: SME Curriculum Authoring', color: 'from-purple-600 to-pink-600', badge: '🎓 Subject Expert Panel' },
    REVIEWER: { level: 'Level 2: Peer Review & Quality Audit', color: 'from-amber-600 to-orange-600', badge: '🔍 Peer Quality Reviewer' },
    PUBLIC_VIEWER: { level: 'Level 1: Public Open Access', color: 'from-emerald-600 to-teal-600', badge: '👁️ Public Repository Access' },
  };

  const defaultClearance = { level: 'Level 1: Public Open Access', color: 'from-emerald-600 to-teal-600', badge: '👁️ Public Repository Access' };
  const clearance = roleClearanceMap[roleName] || defaultClearance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-gradient-to-b from-card via-card to-card/90 p-6 shadow-2xl text-card-foreground space-y-5 overflow-hidden">
        {/* Decorative Top Accent Glow */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${clearance.color}`} />

        {/* Modal Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" /> Official AICTE Digital Identity Card
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            ✕
          </Button>
        </div>

        {/* Profile Card Body */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 text-white border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white font-black text-2xl shadow-lg border border-white/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Session Verified" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-xl tracking-tight leading-none">{user.name}</h3>
              <p className="text-xs text-slate-300 font-mono">{user.email}</p>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 pt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" /> {clearance.badge}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Clearance Level</span>
              <p className="font-bold text-slate-200 text-[11px]">{clearance.level}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Institutional ID</span>
              <p className="font-bold text-slate-200 text-[11px] font-mono">AICTE-IND-2026-9042</p>
            </div>
          </div>
        </div>

        {/* Credentials Details Accordion / List */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building className="h-4 w-4 text-primary" />
              <div>
                <span className="font-bold text-foreground">Affiliated Department</span>
                <p className="text-muted-foreground text-[11px]">All India Council for Technical Education (New Delhi)</p>
              </div>
            </div>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>

          <div className="p-3.5 rounded-xl border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <KeyRound className="h-4 w-4 text-purple-400" />
              <div>
                <span className="font-bold text-foreground">Digital Signature Certificate</span>
                <p className="text-muted-foreground text-[11px]">RSA 4096-bit Verified • Valid until 2028</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">Active</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Profile
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onClose();
              logout();
            }}
            className="gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
