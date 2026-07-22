"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  ticker: string;
  image: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: "1",
    title: "Bitcoin breaks key resistance",
    subtitle: "BTC eyes new highs as momentum builds",
    ticker: "BTC",
    image: "/bitcoin.jpg",
  },
  {
    id: "2",
    title: "Ethereum upgrade goes live",
    subtitle: "Network fees drop after latest rollout",
    ticker: "ETH",
    image: "/crypto.jpg",
  },
  {
    id: "3",
    title: "Solana ecosystem expands",
    subtitle: "New protocols push daily volume to record highs",
    ticker: "SOL",
    image: "/crypto2.jpg",
  },
  {
    id: "4",
    title: "Stablecoins under the microscope",
    subtitle: "Regulators propose tighter reserve rules",
    ticker: "USDC",
    image: "/crypto3.jpg",
  },
  {
    id: "5",
    title: "DeFi TVL hits yearly high",
    subtitle: "Lending protocols see renewed inflows",
    ticker: "AAVE",
    image: "/coins.jpg",
  },
];

interface ImageCarouselProps {
  autoPlayMs?: number;
}

const ImageCarousel = ({ autoPlayMs = 5000 }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!autoPlayMs) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, next]);

  return (
    <div className="mx-auto w-3/4 max-w-7xl overflow-hidden rounded-lg border border-neutral-800 bg-[#283042]">
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 w-fit rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                {slide.ticker} · Placeholder image
              </span>
              <h3 className="text-xl font-semibold text-white drop-shadow-sm sm:text-2xl">
                {slide.title}
              </h3>
              <p className="mt-1 text-sm text-white/80">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-1.5 text-white transition hover:bg-black/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-1.5 text-white transition hover:bg-black/60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-black bg-[#283042] py-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#48c2be]" : "w-1.5 bg-neutral-600 hover:bg-neutral-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;