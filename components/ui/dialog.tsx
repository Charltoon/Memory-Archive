import * as React from "react"

export const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => (
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full h-full flex items-center justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  ) : null
)

export const DialogContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={
      "bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg sm:max-w-md mx-2 " +
      "max-h-[90vh] overflow-y-auto " +
      className
    }
    {...props}
  />
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