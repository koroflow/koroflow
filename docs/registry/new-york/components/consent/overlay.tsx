import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  show: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};
