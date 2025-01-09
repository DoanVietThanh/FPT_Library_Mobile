import { View } from 'react-native'
import * as Slot from '@rn-primitives/slot'
import type { SlottableViewProps } from '@rn-primitives/types'
import { TextClassContext } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'web:inline-flex items-center rounded-full border border-border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary web:hover:opacity-80 active:opacity-80',
        secondary: 'border-transparent bg-secondary web:hover:opacity-80 active:opacity-80',
        destructive: 'border-transparent bg-destructive web:hover:opacity-80 active:opacity-80',
        outline: 'text-foreground',
        danger: 'border-transparent bg-danger text-white shadow',
        success: 'border-transparent bg-success text-white shadow',
        info: 'border-transparent bg-info text-white shadow',
        warning: 'border-transparent bg-warning text-black shadow',
        progress: 'border-transparent bg-progress text-white shadow',
        draft: 'border-transparent bg-draft text-white shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const badgeTextVariants = cva('text-xs font-semibold ', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      danger: 'text-white',
      success: 'text-white',
      info: 'text-white',
      warning: 'text-black',
      progress: 'text-white',
      draft: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type BadgeProps = SlottableViewProps & VariantProps<typeof badgeVariants>

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  )
}

export { Badge, badgeTextVariants, badgeVariants }
export type { BadgeProps }
