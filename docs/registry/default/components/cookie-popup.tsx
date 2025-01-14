"use client";

import * as React from "react";
import { type CSSProperties, useLayoutEffect } from "react";

import { cn } from "@/lib/utils";

type CookiePopupProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  lockScroll?: boolean;
};

function useLockBodyScroll(lock: boolean) {
  useLayoutEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}

export function CookiePopup({
  children,
  className,
  style,
  lockScroll = false,
}: CookiePopupProps) {
  useLockBodyScroll(lockScroll);
  return (
    <>
      <div
        className={cn(
          "fixed inset-x-4 bottom-4 mx-auto max-w-md rounded-lg bg-background p-4 shadow-lg md:start-4 sm:start-2 md:end-auto md:bottom-4 sm:bottom-2 md:w-auto sm:w-full z-50",
          className,
        )}
        style={style}
      >
        {children}
      </div>
      <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
    </>
  );
}
