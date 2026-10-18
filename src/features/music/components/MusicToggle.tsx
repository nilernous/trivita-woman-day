"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeIcon, VolumeOffIcon } from "@/components/ui/icons";

/**
 * Opt-in background music. Nothing is downloaded or played until the user
 * turns it on; if playback fails the toggle simply stays off.
 */
export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  async function toggle() {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.45;
      audioRef.current = audio;
    }
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
      className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-warm-brown transition-colors duration-300 hover:bg-cream/70 hover:text-muted-red"
    >
      {playing ? <VolumeIcon /> : <VolumeOffIcon />}
      <span className="hidden font-body text-label-sm font-semibold uppercase sm:inline">
        Âm điệu
      </span>
    </button>
  );
}
