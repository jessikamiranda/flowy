import { cn } from 'cn'
import * as React from 'react'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content min-h-28 w-full resize-none rounded-xl border border-input bg-card/70 px-3.5 py-3 text-base text-foreground shadow-none transition-[border-color,background-color,box-shadow] outline-none',
        'placeholder:text-muted-foreground/65',
        'focus-visible:border-ring focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring/15',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/10',
        'md:text-sm',
        'dark:bg-background/45 dark:focus-visible:bg-background/70',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
