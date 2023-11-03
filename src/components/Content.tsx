import clsx from 'clsx'
import Line from '@components/Line'

type ContentProps = {
  className?: string
}

export default function Content(props: ContentProps) {
  const { className } = props
  return (
    <div className={clsx(className, 'flex flex-col justify-center')}>
      <div className={'ml-8 rounded-lg bg-zinc-600 h-[650px]'}>
        <Line />
      </div>
    </div>
  )
}
