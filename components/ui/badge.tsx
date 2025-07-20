import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ className = "", ...props }: BadgeProps) => (
  <span
    className={
      "inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800 " +
      className
    }
    {...props}
  />
) 