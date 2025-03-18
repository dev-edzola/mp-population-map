
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  >
    <div className="collapsible-content-animation">
      <div className="w-full h-0.5 bg-gradient-to-r from-green-300 to-blue-500 mb-1 animate-horizontal-progress"></div>
      {children}
    </div>
  </CollapsiblePrimitive.Content>
))

CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
