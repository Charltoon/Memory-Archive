import * as React from "react"

export const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => (
  open ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">{children}</div> : null
)

export const DialogContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"bg-white rounded-lg shadow-lg p-6 max-w-lg w-full " + className} {...props} />
)

export const DialogHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"mb-4 " + className} {...props} />
)

export const DialogTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={"text-lg font-bold " + className} {...props} />
)

export const DialogTrigger = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props}>{children}</button>
) 