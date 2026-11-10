"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Лёгкая обёртка над YouTube: до клика грузится только обложка.
 * Это экономит около мегабайта скриптов и не портит скорость загрузки страницы.
 */
export function YoutubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-secondary p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Видео появится здесь. Задайте <code className="font-mono">howTo.videoId</code> в
          <code className="font-mono"> src/lib/site.config.ts</code> — это часть адреса ролика после
          <code className="font-mono"> v=</code>.
        </p>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-black"
      aria-label={`Смотреть видео: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        className="size-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
        loading="lazy"
        width={1280}
        height={720}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-105">
          <Play className="ml-0.5 size-7 fill-current" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-left font-display text-base font-semibold text-white">
        {title}
      </span>
    </button>
  );
}
