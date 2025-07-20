import * as React from "react"

export const Avatar = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"inline-block rounded-full overflow-hidden bg-gray-200 " + className} {...props} />
)

export const AvatarImage = ({ className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={"object-cover w-10 h-10 " + className} {...props} />
)

export const AvatarFallback = ({ className = "", children }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={"flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 " + className}>{children}</span>
) 