import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        variant === 'primary' && 'bg-primary hover:bg-primary-glow text-white shadow-lg hover:shadow-primary/25',
        variant === 'secondary' && 'bg-surface-light hover:bg-surface-light/80 text-text-main border border-primary/30',
        variant === 'ghost' && 'bg-transparent hover:bg-surface-light/50 text-text-muted hover:text-text-main',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-base',
        size === 'lg' && 'px-8 py-3.5 text-lg',
        props.disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
