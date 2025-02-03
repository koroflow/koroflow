import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';

interface OverlayProps {
  show: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};
