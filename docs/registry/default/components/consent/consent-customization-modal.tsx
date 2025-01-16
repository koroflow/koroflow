"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ConsentCustomizationWidget from "./consent-customization-widget";
import { usePrivacyConsent } from "@koroflow/core-react";
import { Overlay } from "@/registry/default/components/consent/overlay";
import { Button } from "@/registry/default/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/registry/default/components/card";

interface ConsentCustomizationModalProps {
  children?: React.ReactNode;
  triggerClassName?: string;
  showCloseButton?: boolean;
}

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const ModalContent = ({
  onClose,
  showCloseButton,
  handleSave,
  ref,
}: {
  onClose: () => void;
  showCloseButton: boolean;
  handleSave: () => void;
  ref: React.RefObject<HTMLDivElement>;
}) => (
  <Card>
    <CardHeader className="relative">
      {showCloseButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close privacy settings"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardTitle id="privacy-settings-title">Privacy Settings</CardTitle>
      <CardDescription>
        Customize your privacy settings here. You can choose which types of
        cookies and tracking technologies you allow.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ConsentCustomizationWidget onSave={handleSave} />
    </CardContent>
  </Card>
);

const ConsentCustomizationModal = React.forwardRef<
  HTMLDivElement,
  ConsentCustomizationModalProps
>(({ children, triggerClassName, showCloseButton = false }, ref) => {
  const {
    isPrivacyDialogOpen,
    setIsPrivacyDialogOpen,
    setShowPopup,
    saveConsents,
  } = usePrivacyConsent();
  const [isMounted, setIsMounted] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  console.log("isPrivacyDialogOpen", isPrivacyDialogOpen);
  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setIsPrivacyDialogOpen(newOpen);
      if (newOpen) {
        setShowPopup(false);
      }
    },
    [setIsPrivacyDialogOpen, setShowPopup],
  );

  const handleSave = React.useCallback(() => {
    saveConsents("custom");
    setIsPrivacyDialogOpen(false);
  }, [setIsPrivacyDialogOpen, saveConsents]);

  const handleClose = React.useCallback(() => {
    setIsPrivacyDialogOpen(false);
  }, [setIsPrivacyDialogOpen]);

  const modalContent = (
    <AnimatePresence mode="wait">
      {isPrivacyDialogOpen && (
        <>
          <Overlay show={isPrivacyDialogOpen} />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-settings-title"
          >
            <motion.div
              ref={contentRef}
              className="z-50 w-full max-w-md mx-auto"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalContent
                ref={ref as React.RefObject<HTMLDivElement>}
                onClose={handleClose}
                showCloseButton={showCloseButton}
                handleSave={handleSave}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div onClick={() => handleOpenChange(true)}>
        {children || (
          <Button variant="outline" size="sm" className={triggerClassName}>
            Customise Consent
          </Button>
        )}
      </div>
      {isMounted && createPortal(modalContent, document.body)}
    </>
  );
});

ConsentCustomizationModal.displayName = "ConsentCustomizationModal";

export default ConsentCustomizationModal;
