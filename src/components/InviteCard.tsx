"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EVENT } from "@/lib/event";
import { RoseCluster } from "@/components/RoseCluster";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function InviteCard() {
  return (
    <motion.article
      className="relative mx-auto w-full max-w-[22rem] overflow-visible sm:max-w-md"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-white/25 blur-xl" />

      <div className="relative overflow-visible px-1 py-2">
        <RoseCluster position="tl" />
        <RoseCluster position="tr" />
        <RoseCluster position="bl" />
        <RoseCluster position="br" />

        <div
          className="relative z-[1] border-[1.5px] border-invite-gold bg-invite-cream px-6 pb-12 pt-10 shadow-2xl sm:px-9 sm:pb-14 sm:pt-12"
          style={{
            borderRadius: "50% 50% 1.5rem 1.5rem / 18% 18% 1.5rem 1.5rem",
          }}
        >
          <motion.div
            className="relative mx-auto h-[7.5rem] w-[7.5rem] sm:h-36 sm:w-36"
            {...fadeUp(0.15)}
          >
            <Image
              src="/assets/murugan.png"
              alt="Lord Murugan with peacock — Murugan Thunai"
              fill
              className="object-contain drop-shadow-sm"
              sizes="144px"
              priority
            />
          </motion.div>

          <motion.p
            className="mt-5 text-center font-serif text-[0.68rem] font-semibold tracking-[0.2em] text-invite-burgundy uppercase sm:text-xs"
            {...fadeUp(0.3)}
          >
            You are cordially invited to our
          </motion.p>

          <motion.h1
            className="mt-1 text-center font-script text-[3.25rem] leading-[1.1] text-invite-burgundy sm:text-6xl"
            {...fadeUp(0.4)}
          >
            {EVENT.title}
          </motion.h1>

          <GoldHeartDivider delay={0.48} />

          <motion.div
            className="mt-2 flex flex-col items-center gap-0.5"
            {...fadeUp(0.55)}
          >
            <span className="font-script text-[2.75rem] leading-tight text-invite-burgundy sm:text-5xl">
              {EVENT.bride}
            </span>
            <span className="animate-heart my-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-300/90 text-xs text-white shadow sm:h-8 sm:w-8 sm:text-sm">
              &
            </span>
            <span className="font-script text-[2.75rem] leading-tight text-invite-burgundy sm:text-5xl">
              {EVENT.groom}
            </span>
          </motion.div>

          <GoldHeartDivider delay={0.62} />

          <motion.ul
            className="relative z-[2] mx-auto mt-6 flex w-full max-w-[16rem] flex-col items-center gap-2.5 font-serif text-invite-burgundy"
            {...fadeUp(0.72)}
          >
            <DetailRow
              icon={<CalendarIcon />}
              label="Date"
              value={EVENT.dateLabel}
            />
            <DetailRow
              icon={<ClockIcon />}
              label="Time"
              value={EVENT.timeLabel}
            />
            <DetailRow
              icon={<PinIcon />}
              label="Venue"
              value={EVENT.venue}
              href={EVENT.mapsUrl}
            />
          </motion.ul>
        </div>
      </div>
    </motion.article>
  );
}

function GoldHeartDivider({ delay }: { delay: number }) {
  return (
    <motion.div
      className="mx-auto mt-3 flex items-center justify-center gap-2"
      {...fadeUp(delay)}
    >
      <div className="gold-divider w-14 sm:w-16" />
      <span className="text-sm text-invite-gold">♥</span>
      <div className="gold-divider w-14 sm:w-16" />
    </motion.div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <span className="inline-flex items-center gap-2.5 text-center text-sm sm:text-[0.95rem]">
      <span className="shrink-0 text-invite-burgundy/75">{icon}</span>
      <span>
        <span className="font-semibold">{label}</span>
        <span className="mx-1">:</span>
        <span>{value}</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <li className="w-full text-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg px-2 py-1 transition hover:bg-rose-100/70"
        >
          {inner}
        </a>
      </li>
    );
  }

  return <li className="w-full text-center">{inner}</li>;
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
