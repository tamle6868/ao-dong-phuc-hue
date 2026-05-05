"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-3 z-40 flex flex-col gap-2 md:bottom-6 md:right-6">
      <motion.a
        whileTap={{ scale: 0.92 }}
        href={`https://zalo.me/${BUSINESS_INFO.zalo}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat Zalo"
        className="grid h-12 w-12 place-items-center rounded-full bg-blue-500 text-white shadow-lg ring-1 ring-white/30"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.92 }}
        href={`tel:${BUSINESS_INFO.phoneE164}`}
        aria-label={`Gọi ${BUSINESS_INFO.phone}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-pop)] ring-1 ring-white/30"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
