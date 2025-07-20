import * as React from "react"

export const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"bg-white rounded-lg shadow " + className} {...props} />
)

export const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"p-4 border-b " + className} {...props} />
)

export const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"p-4 " + className} {...props} />
) 