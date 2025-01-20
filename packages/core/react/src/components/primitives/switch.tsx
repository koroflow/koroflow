"use client"

import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "../../libs/utils"

const Switch = ({ children, className, ...props }: AriaSwitchProps) => (
  <AriaSwitch
    className={composeRenderProps(className, (className) =>
      cn(
        "group inline-flex items-center gap-2 text-sm font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children) => (
      <>
        <div
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            /* Focus Visible */
            "group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background",
            /* Disabled */
            "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50",
            /* Selected */
            "bg-input group-data-[selected]:bg-primary",
            /* Readonly */
            "group-data-[readonly]:cursor-default",
            /* Resets */
            "focus-visible:outline-none"
          )}
        >
          <div
            className={cn(
              "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
              /* Selected */
              "translate-x-0 group-data-[selected]:translate-x-5"
            )}
          />
        </div>
        {children}
      </>
    ))}
  </AriaSwitch>
)

export { Switch }
