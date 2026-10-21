import React, { useState } from 'react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAudit: (ref: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onSelectAudit
}) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'GAMEINTEL FORENSIC AUDIT TERMINAL v4.2-AP',
    'NODE CLUSTER: AP-EAST // ENCRYPTION: TLS 1.3 SHA-256',
    'CLEARANCE: INVESTIGATIVE DESK (LEVEL 4)',
    'Ready. Type "help" for audit commands, or "audit <ref>" (e.g. "audit EVD-01").'
  ]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let newLogs = [...logs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('AVAILABLE COMMANDS:');
      newLogs.push('  status          - Display system integrity and active indexed claims');
      newLogs.push('  audit <ref>     - View forensic audit for claim (e.g., audit EVD-01, audit PAT-03)');
      newLogs.push('  clear           - Clear terminal window');
      newLogs.push('  verify-hash     - Compute SHA-256 cryptographic root proof');
      newLogs.push('  corpus          - Display active corpora benchmarks (GTA VI vs GTA V)');
      newLogs.push('  exit            - Close terminal session');
    } else if (cmd === 'status') {
      newLogs.push('STATUS: ALL NODES OPERATIONAL');
      newLogs.push('INDEXED CLAIMS: 141 (48 CONFIRMED, 34 REPORTED, 29 SPECULATION, 18 DISPUTED, 12 UNKNOWN)');
      newLogs.push('PEER REVIEW: SYNCHRONOUS // REGULATORY TTWO-10K SYNCED');
    } else if (cmd.startsWith('audit ')) {
      const ref = cmd.split(' ')[1]?.toUpperCase();
      if (ref) {
        newLogs.push(`Opening Evidence Audit Record [${ref}]...`);
        onSelectAudit(ref);
        onClose();
        return;
      } else {
        newLogs.push('Usage: audit <REF_ID> (e.g. audit EVD-01)');
      }
    } else if (cmd === 'clear') {
      newLogs = ['TERMINAL CLEARED.'];
    } else if (cmd === 'verify-hash') {
      newLogs.push('COMPUTING MERKLE TREE ROOT PROOF...');
      newLogs.push('ROOT HASH: 8f2b3e410a8274d89a71bc9842aef318942b87a64192b00192ea38910b847291');
      newLogs.push('VERDICT: CRYPTOGRAPHICALLY VALIDATED (0 BIT ROT, 0 UNCORROBORATED ENTRIES)');
    } else if (cmd === 'corpus') {
      newLogs.push('PRIMARY CORPUS: GRAND THEFT AUTO VI (STATE OF LEONIDA)');
      newLogs.push('BASELINE CORPUS: GRAND THEFT AUTO V (STATE OF SAN ANDREAS / 2013-2024)');
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newLogs.push(`Unknown command: "${cmd}". Type "help" for options.`);
    }

    setLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#0b0e15] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col font-['JetBrains_Mono',monospace]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="p-3 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between text-xs text-[#dfc0b3]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e86c28]" />
            <span className="font-bold text-[#e0e2ec]">GAMEINTEL // FORENSIC TERMINAL [AP-EAST]</span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Terminal Output */}
        <div className="p-4 bg-[#0b0e15] text-xs space-y-1.5 h-80 overflow-y-auto text-[#e0e2ec]">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                log.startsWith('>')
                  ? 'text-[#ffb694] font-bold'
                  : log.includes('AUTHENTICATED') || log.includes('VALIDATED')
                  ? 'text-[#4edea3]'
                  : log.includes('COMMANDS')
                  ? 'text-[#7bd0ff]'
                  : 'text-[#dfc0b3]'
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="p-3 bg-[#11141b] border-t border-[#584238]/40 flex items-center gap-2">
          <span className="text-[#ffb694] font-bold text-xs">&gt;</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder='Type command (e.g. "status", "verify-hash", "audit EVD-01")...'
            autoFocus
            className="w-full bg-transparent text-xs text-[#e0e2ec] focus:outline-none placeholder:text-[#a68b7f]/50"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded text-[11px] font-bold transition-colors"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
};
