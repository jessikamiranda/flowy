import { Input as InputPrimitive } from '@base-ui/react/input'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full min-w-0 rounded-xl border border-input bg-card/70 px-3.5 text-base text-foreground shadow-none transition-[border-color,background-color,box-shadow] outline-none',
        'placeholder:text-muted-foreground/65',
        'focus-visible:border-ring focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring/15',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/10',
        'md:text-sm',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'dark:bg-background/45 dark:focus-visible:bg-background/70',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
