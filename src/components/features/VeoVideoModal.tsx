import React, { useState, useRef } from 'react';
import { LEAD_INVESTIGATION } from '../../data/mockData';

interface VeoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultImage?: string;
}

export const VeoVideoModal: React.FC<VeoVideoModalProps> = ({
  isOpen,
  onClose,
  defaultImage
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    defaultImage || LEAD_INVESTIGATION.imageUrl
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState(
    'Cinematic aerial drone sweep over Vice City coastline, authentic dynamic water surface swells and neon reflections at twilight'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulatedAnimation, setSimulatedAnimation] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setGeneratedVideoUrl(null);
        setSimulatedAnimation(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setGeneratedVideoUrl(null);
    setSimulatedAnimation(false);
    setProgressMsg('Initializing Veo model (veo-3.1-fast-generate-preview)...');

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          prompt,
          aspectRatio
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Veo video generation failed');
      }

      const operationName = data.operationName;
      setProgressMsg('Rendering video frames with photogrammetric motion vectors...');

      // Poll status
      let attempts = 0;
      const interval = setInterval(async () => {
        attempts++;
        if (attempts % 3 === 0) {
          setProgressMsg(`Simulating volumetric lighting & fluid dynamics... (${attempts * 4}s)`);
        }

        try {
          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName })
          });
          const statusData = await statusRes.json();

          if (statusData.done) {
            clearInterval(interval);
            setProgressMsg('Finalizing MP4 video stream...');

            // Download video
            const dlRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName })
            });

            if (dlRes.ok) {
              const blob = await dlRes.blob();
              const videoUrl = URL.createObjectURL(blob);
              setGeneratedVideoUrl(videoUrl);
              setIsGenerating(false);
            } else {
              throw new Error('Could not stream final video');
            }
          }
        } catch (err: any) {
          clearInterval(interval);
          setIsGenerating(false);
          setErrorMessage(err.message || 'Error during video polling');
        }
      }, 5000);
    } catch (err: any) {
      setIsGenerating(false);
      setErrorMessage(err.message);
      // Offer simulated high-res camera motion fallback
      setSimulatedAnimation(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[20px]">movie</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              VEO FORENSIC VIDEO ANIMATOR // veo-3.1-fast-generate-preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image / Video Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a68b7f] uppercase font-bold">
                  SOURCE STILL FRAME / VIDEO CANVAS
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif] text-[#ffb694] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">upload_file</span>
                  <span>Upload Custom Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Viewport Box */}
              <div
                className={`relative rounded overflow-hidden border border-[#584238]/40 bg-[#0b0e15] flex items-center justify-center ${
                  aspectRatio === '16:9' ? 'aspect-[16/9]' : 'aspect-[9/16] max-h-[360px] mx-auto'
                }`}
              >
                {generatedVideoUrl ? (
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Source still frame"
                      className={`w-full h-full object-cover ${
                        simulatedAnimation
                          ? 'animate-[pulse_4s_ease-in-out_infinite] scale-110 transition-transform duration-1000'
                          : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {simulatedAnimation && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <div className="text-[11px] font-mono text-[#4edea3] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
                          <span>FORENSIC TELEMETRY MOTION PREVIEW ACTIVE</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Loading state indicator */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-10 h-10 border-3 border-[#ffb694] border-t-transparent rounded-full animate-spin" />
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-[#e0e2ec]">
                      {progressMsg}
                    </span>
                    <span className="text-[10px] text-[#a68b7f] font-mono">
                      Veo model synthesizing temporal continuity...
                    </span>
                  </div>
                )}
              </div>

              {/* Preset selection chips */}
              <div className="flex items-center gap-2 pt-1 overflow-x-auto text-[11px] font-['JetBrains_Mono',monospace]">
                <span className="text-[#a68b7f]">PRESETS:</span>
                <button
                  onClick={() => setSelectedImage(LEAD_INVESTIGATION.imageUrl)}
                  className="px-2 py-0.5 bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded border border-[#584238]/30"
                >
                  Vice City Map
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA'
                    )
                  }
                  className="px-2 py-0.5 bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded border border-[#584238]/30"
                >
                  Lucia Ankle
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMkAZhwgXTiMQRdDJ-FigBWgvv40_OO1Iz-E_TZdlTlTytnf6b6QZSJ7X3ZexMzeE-7xF7NSHx34cG_LADQyPnlhYHZ1lwC6-TG_x10shpo_t19RqG5YOxMwI7Qqe9tdhE-8CLAMKQxlLek2DnSGt7MhGy0FmtGkWvAtoKFfRdv8ePhBdy_wqk8EsNW8nZesQGpqFX7fWBHeFV5ZU76f722NqdbmUoX6q4pmUXY4DSn0V5FmUUqLAPwQ'
                    )
                  }
                  className="px-2 py-0.5 bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded border border-[#584238]/30"
                >
                  Transit Train
                </button>
              </div>
            </div>

            {/* Right: Controls & Parameters */}
            <div className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] uppercase font-bold mb-2">
                  Target Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`py-2 px-3 rounded text-xs font-bold font-mono border flex items-center justify-center gap-2 transition-colors ${
                      aspectRatio === '16:9'
                        ? 'bg-[#e86c28] border-[#e86c28] text-white shadow-md'
                        : 'bg-[#10131a] border-[#584238]/40 text-[#dfc0b3] hover:border-[#a68b7f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">crop_16_9</span>
                    <span>16:9 (Landscape)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`py-2 px-3 rounded text-xs font-bold font-mono border flex items-center justify-center gap-2 transition-colors ${
                      aspectRatio === '9:16'
                        ? 'bg-[#e86c28] border-[#e86c28] text-white shadow-md'
                        : 'bg-[#10131a] border-[#584238]/40 text-[#dfc0b3] hover:border-[#a68b7f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">crop_portrait</span>
                    <span>9:16 (Portrait)</span>
                  </button>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] uppercase font-bold">
                  Animation Prompt
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe motion (e.g., camera orbit, moving traffic, water waves)..."
                  className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none rounded p-3 text-xs text-[#e0e2ec] font-['Plus_Jakarta_Sans',sans-serif]"
                />
              </div>

              {/* Model Note */}
              <div className="p-3 bg-[#10131a] rounded border border-[#584238]/30 space-y-1.5 font-['JetBrains_Mono',monospace] text-xs">
                <div className="flex items-center justify-between text-[#dfc0b3]">
                  <span className="text-[#a68b7f]">TARGET MODEL:</span>
                  <span className="text-[#ffb694] font-bold">veo-3.1-fast-generate-preview</span>
                </div>
                <div className="flex items-center justify-between text-[#dfc0b3]">
                  <span className="text-[#a68b7f]">RESOLUTION:</span>
                  <span>720p HD @ 24fps</span>
                </div>
                <div className="flex items-center justify-between text-[#dfc0b3]">
                  <span className="text-[#a68b7f]">INTERPOLATION:</span>
                  <span>Temporal Flow Advection</span>
                </div>
              </div>

              {/* Error notice if API key lacks paid Veo quota */}
              {errorMessage && (
                <div className="p-3 bg-[#93000a]/20 border border-[#ffb4ab]/40 rounded space-y-1 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                  <div className="text-[#ffb4ab] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Veo Model Key Requirement</span>
                  </div>
                  <p className="text-[#dfc0b3]">
                    {errorMessage}
                  </p>
                  <p className="text-[#4edea3] text-[11px] font-mono">
                    A cinematic camera sweep and telemetry preview has been activated for this still frame.
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className="w-full py-2.5 bg-[#e86c28] hover:bg-[#f97316] disabled:opacity-50 text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>{isGenerating ? 'Rendering Video...' : 'Generate Veo Video'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] px-6">
          <span>Supported Aspect Ratios: 16:9 and 9:16</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
