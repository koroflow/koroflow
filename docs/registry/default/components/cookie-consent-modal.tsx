"use client";

import * as React from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { useForm, Control } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/components/accordion";
import { Button } from "@/registry/default/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/registry/default/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/registry/default/components/form";
import { Switch } from "@/registry/default/components/switch";
import { CookiePopup } from "@/registry/default/components/cookie-popup";
import {
  allConsentNames,
  consentType,
} from "@/registry/default/lib/gdpr-consent-types";
import { useCookieConsent } from "@/registry/default/hooks/use-cookie-consent";

type CookieConsentContextType = {
  consent: (params: {
    gdprPurposes?: Record<allConsentNames, boolean>;
    type: "all" | "minimum" | "custom";
  }) => void;
};

const CookieConsentContext = React.createContext<
  CookieConsentContextType | undefined
>(undefined);

function useCookieConsentContext() {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "Cookie consent components must be used within CookieConsentModal",
    );
  }
  return context;
}

type CookieModalProps = {
  children: React.ReactNode;
  className?: string;
  requiredGdprPurposes: allConsentNames[];
  style?: React.CSSProperties;
  useAnalytics: () => {
    consent: (params: {
      gdprPurposes?: Record<allConsentNames, boolean>;
      type: "all" | "minimum" | "custom";
    }) => void;
  };
  renderConsentItem?: (props: {
    cookie: consentType;
    control: Control<Record<allConsentNames, boolean>>;
  }) => React.ReactNode;
  customSections?: React.ReactNode;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  lockScroll?: boolean;
};

export function CookieConsentModal({
  children,
  className,
  requiredGdprPurposes,
  style,
  useAnalytics,
  renderConsentItem,
  customSections,
  dialogTitle,
  dialogDescription,
  lockScroll = false,
}: CookieModalProps) {
  const { consent } = useAnalytics();
  const { mergedList, defaultValues } = useCookieConsent(requiredGdprPurposes);

  const form = useForm<Record<allConsentNames, boolean>>({
    defaultValues,
  });

  const contextValue = React.useMemo(() => ({ consent }), [consent]);

  return (
    <CookieConsentContext.Provider value={contextValue}>
      <Dialog>
        <Form {...form}>
          <CookiePopup
            className={className}
            style={style}
            lockScroll={lockScroll}
          >
            {children}
          </CookiePopup>
          <DialogContent className="sm:max-w-lg">
            <form
              onSubmit={form.handleSubmit((data) => {
                const gdprPurposes = { ...defaultValues, ...data };
                consent({ gdprPurposes, type: "custom" });
              })}
            >
              <DialogHeader>
                {dialogTitle ? (
                  <div className="text-lg font-semibold leading-none tracking-tight">
                    {dialogTitle}
                  </div>
                ) : (
                  <DialogTitle>Cookie Preferences</DialogTitle>
                )}
                <DialogDescription asChild>
                  <CustomDialogDescription>
                    {dialogDescription || (
                      <>
                        We use cookies to improve your site experience. The
                        "strictly necessary" cookies are required for the site
                        to function.
                      </>
                    )}
                  </CustomDialogDescription>
                </DialogDescription>
              </DialogHeader>
              <Accordion className="w-full mt-4" collapsible type="single">
                {mergedList.map((cookie) => (
                  <React.Fragment key={cookie.name}>
                    {renderConsentItem ? (
                      renderConsentItem({ cookie, control: form.control })
                    ) : (
                      <CookieConsentItem
                        key={cookie.name}
                        cookie={cookie}
                        control={form.control}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Accordion>
              {customSections}
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button type="submit">Save Current Settings</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}

function CookieConsentItem({
  cookie,
  control,
}: {
  cookie: consentType;
  control: Control<Record<allConsentNames, boolean>>;
}) {
  return (
    <AccordionItem value={cookie.name}>
      <AccordionTrigger className="px-4">
        <div className="flex items-center space-x-2 text-foreground capitalize">
          <FormField
            control={control}
            name={cookie.name}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={cookie.disabled}
                    aria-readonly={cookie.disabled}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {field.value ? (
                    <CircleCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <CircleX className="h-4 w-4 text-red-500" />
                  )}
                  <span className="ml-2">{cookie.name}</span>
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        <FormDescription>{cookie.description}</FormDescription>
      </AccordionContent>
    </AccordionItem>
  );
}

const CustomDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CustomDialogDescription.displayName = "CustomDialogDescription";

export const CookieConsentTrigger = DialogTrigger;
export const CookieConsentAccept = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { consent } = useCookieConsentContext();
  return (
    <Button
      onClick={() => {
        consent({ type: "all" });
        if (onClick) onClick();
      }}
    >
      {children}
    </Button>
  );
};
export const CookieConsentDecline = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { consent } = useCookieConsentContext();
  return (
    <Button
      variant="outline"
      onClick={() => {
        consent({ type: "minimum" });
        if (onClick) onClick();
      }}
    >
      {children}
    </Button>
  );
};
