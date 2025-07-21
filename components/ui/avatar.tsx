import * as React from "react"

export const Avatar = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"inline-block rounded-full overflow-hidden bg-gray-200 relative " + className} {...props}>
    {children}
  </div>
)

export const AvatarImage = ({ className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [errored, setErrored] = React.useState(false)
  if (!props.src || errored) return null
  return (
    <img
      className={"object-cover w-10 h-10 " + className}
      onError={() => setErrored(true)}
      {...props}
    />
  )
}

export const AvatarFallback = ({ className = "", children }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={"flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 absolute top-0 left-0" + className}>{children}</span>
) 