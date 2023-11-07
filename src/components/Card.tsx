import clsx from 'clsx'

type CardProps = {
  title: string
  titleColor: string
  cardColor: string
  children: React.ReactNode
  horizontal?: boolean
}

export default function Card(props: CardProps) {
  const { title, titleColor, cardColor, children, horizontal } = props
  return (
    <div
      className={clsx(cardColor, 'w-full rounded-lg mt-4 p-4', {
        'flex flex-row items-center': horizontal,
      })}
    >
      <span className={clsx(titleColor, 'text-lg font-semibold')}>{title}</span>
      <div className={clsx('pl-4', {'mt-2': !horizontal})}>{children}</div>
    </div>
  )
}
