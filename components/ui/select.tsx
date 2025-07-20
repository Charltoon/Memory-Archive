import * as React from "react"

export const Select = ({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode }) => (
  <select className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={value} onChange={e => onValueChange(e.target.value)}>
    {children}
  </select>
)

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectValue = () => null
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
) 