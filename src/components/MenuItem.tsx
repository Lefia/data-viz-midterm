import clsx from 'clsx'

type MenuItemProps = {
  icon: React.ReactNode
  name: string
  active?: boolean
  onClick?: () => void
}

export default function MenuItem(props: MenuItemProps) {
  const { icon, onClick, active = 'false', name } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <div className={'relative my-4'}>
      <div
        className={clsx(
          'w-16 h-16 rounded-full relative',
          'text-4xl transition-all peer',
          'flex items-center justify-center',
          {
            'bg-teal-600 text-zinc-100 scale-[1.3] my-6 hover:scale-[1.35] hover:bg-teal-500':
              active,
            'bg-zinc-800 text-zinc-100 hover:scale-[1.1] hover:bg-zinc-700':
              !active,
          },
        )}
        onClick={handleClick}
      >
        {icon}
      </div>
      {/* Tooltip */}
      <div
        className={clsx(
          'absolute inset-0 -translate-x-full',
          'flex justify-center items-center',
          'invisible peer-hover:visible',
          {
            'pr-12': active,
            'pr-8': !active,
          }
        )}
      >
        <span
          className={clsx(
            'text-zinc-100 bg-zinc-700 opacity-80',
            'text-md rounded-[4px] px-2',
            'flex flex-row justify-center',
          )}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
