import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Disc, CheckCircle, Shield, HardDrive, RefreshCw } from 'lucide-react';
import { Deal } from '../../types/deals';

interface VideoRoomProps {
  selectedDeal?: Deal;
  onCloseMeeting?: () => void;
}

export const VideoRoom: React.FC<VideoRoomProps> = ({ selectedDeal, onCloseMeeting }) => {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(145);
  const [isSavedToDrive, setIsSavedToDrive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const brandName = selectedDeal?.brandName || 'Notion España';

  const handleEndMeeting = () => {
    setIsSavedToDrive(true);
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col xl:flex-row min-h-[580px] xl:h-[620px]">
      {/* Video Call Stage */}
      <div className="flex-1 bg-[#090D16] p-3 sm:p-4 flex flex-col justify-between relative">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between z-10 bg-[#111827]/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <div>
              <h3 className="font-bold text-white text-xs">Negociación Comercial: {brandName}</h3>
              <p className="text-[11px] text-slate-400 font-mono">Tiempo de llamada: {formatTime(seconds)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> REC ACTIVO
            </span>
            <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Cifrado E2E
            </span>
          </div>
        </div>

        {/* Video Feeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-4 items-center">
          {/* Creator Feed */}
          <div className="relative h-64 md:h-full max-h-72 bg-[#1A2337] rounded-xl overflow-hidden border border-slate-700/60 shadow-lg flex items-center justify-center">
            {videoActive ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Mateo Silva"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-400 text-xs">Cámara desactivada</div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1.5">
              Mateo Silva (Creador) {!micActive && <MicOff className="w-3 h-3 text-rose-400" />}
            </div>
          </div>

          {/* Brand Representative Feed */}
          <div className="relative h-64 md:h-full max-h-72 bg-[#162032] rounded-xl overflow-hidden border border-slate-700/60 shadow-lg flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
              alt="Brand Rep"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-white">
              Representante de {brandName}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 z-10 pt-2">
          <button
            onClick={() => setMicActive(!micActive)}
            className={`p-3 rounded-xl transition-all ${micActive ? 'bg-slate-800 text-white' : 'bg-rose-600 text-white'}`}
          >
            {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVideoActive(!videoActive)}
            className={`p-3 rounded-xl transition-all ${videoActive ? 'bg-slate-800 text-white' : 'bg-rose-600 text-white'}`}
          >
            {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={handleEndMeeting}
            className="w-full sm:w-auto px-4 sm:px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all text-center"
          >
            Finalizar Llamada & Resguardar en Drive
          </button>
        </div>
      </div>

      {/* Right Drive Sovereignty Panel */}
      <div className="w-full xl:w-80 bg-[#0E1526] p-5 border-t xl:border-t-0 xl:border-l border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-3">
            <HardDrive className="w-4 h-4 text-emerald-400" /> Protocolo de Privacidad y Resguardo
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs mb-4">
            <p className="text-slate-300 font-medium">Soberanía de Datos del Creador (Zero-Knowledge):</p>
            <div className="flex items-start gap-2 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
              <span>La llamada se graba localmente en formato MP4 de alta resolución.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
              <span>Al finalizar, se transfiere automáticamente a tu <strong>Google Drive personal</strong>.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
              <span>El archivo se <strong>elimina definitivamente</strong> de los servidores de la plataforma. Nadie más tiene acceso.</span>
            </div>
          </div>

          {isSavedToDrive && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" /> Grabación Sincronizada con Éxito
              </div>
              <p className="text-slate-300 text-[11px]">
                Guardado en: <span className="font-mono text-emerald-300">/Google Drive/Patrocinios_2026/Notion_Call_Oct14.mp4</span>
              </p>
              <p className="text-slate-400 text-[10px] italic">
                Copia temporal borrada del servidor (0 bytes almacenados en nube compartida).
              </p>
            </div>
          )}
        </div>

        {onCloseMeeting && (
          <button
            onClick={onCloseMeeting}
            className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Volver al Tablero CRM
          </button>
        )}
      </div>
    </div>
  );
};
