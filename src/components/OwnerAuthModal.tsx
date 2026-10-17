import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldCheck, LogOut, Check } from 'lucide-react';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
  onLogin: (passcode: string) => boolean;
  onLogout: () => void;
  onChangePasscode: (oldPass: string, newPass: string) => boolean;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  isOwner,
  onLogin,
  onLogout,
  onChangePasscode,
}) => {
  if (!isOpen) return null;

  const [inputPass, setInputPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Change pass sub-state
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = onLogin(inputPass.trim());
    if (success) {
      setInputPass('');
      onClose();
    } else {
      setErrorMsg('Incorrect owner passcode. Default passcode is trevor137');
    }
  };

  const handleChangePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!newPass || newPass.length < 4) {
      setErrorMsg('New passcode must be at least 4 characters');
      return;
    }
    const ok = onChangePasscode(oldPass.trim(), newPass.trim());
    if (ok) {
      setSuccessMsg('Passcode updated successfully!');
      setOldPass('');
      setNewPass('');
      setTimeout(() => {
        setIsChangingPass(false);
        setSuccessMsg('');
      }, 1200);
    } else {
      setErrorMsg('Current passcode incorrect.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-100 text-blue-700">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isOwner ? 'Owner & Admin Controls' : 'Owner Verification'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Trevor Barrett Administration Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {isOwner ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Owner Access Active
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    You have full access to the live Content Customizer, ATS Keyword Scanner, and data export. Public visitors cannot see or use these admin tools.
                  </p>
                </div>
              </div>

              {!isChangingPass ? (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setIsChangingPass(true)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Change Owner Passcode</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock Admin Session (Logout)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleChangePassSubmit} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Passcode
                    </label>
                    <input
                      type="password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="Current passcode"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Passcode
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new passcode"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      required
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                  )}
                  {successMsg && (
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{successMsg}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPass(false);
                        setErrorMsg('');
                      }}
                      className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Update Passcode
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmitLogin} className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your owner passcode to unlock editing, ATS scanning, and resume customization:
              </p>

              <div>
                <input
                  type="password"
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  placeholder="Owner passcode (default: trevor137)"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
              )}

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                Default initial passcode: <code className="font-semibold text-slate-800">trevor137</code>. You can change this anytime once logged in.
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel & Return
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Unlock Owner Access
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
