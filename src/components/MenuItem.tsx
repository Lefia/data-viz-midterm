import clsx from 'clsx'

type MenuItemProps = {
  icon: React.ReactNode,
  active?: boolean,
  onClick?: () => void,
}

export default function MenuItem(props: MenuItemProps) {
  const { icon, onClick, active = 'false' } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <div
      className={clsx(
        'w-16 h-16 rounded-full',
        'text-4xl my-4',
        'flex items-center justify-center',
        'transition-all',
        {
          'bg-teal-600 text-zinc-100 scale-[1.3] my-6 hover:scale-[1.5]': active,
          'bg-zinc-800 text-zinc-100 hover:scale-[1.2]': !active,
        }
      )}
      onClick={handleClick}
    >
      {icon}
    </div>
  )
}
