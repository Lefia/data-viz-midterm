import clsx from 'clsx'
import { useState } from 'react'
import Menu from '@components/Menu'
import Content from '@components/Content'

export default function App() {
  const [tab, setTab] = useState('profile')
  return (
    <div className='bg-zinc-900'>
      {/* Container */}
      <div
        className={clsx(
          'mx-auto max-w-full lg:max-w-5xl',
          'px-8 h-screen',
          'flex flex-row items-center',
        )}
      >
        <Menu className={clsx('w-16 h-full')} tabState={{tab, setTab}}/>
        <Content className={clsx('w-full h-full')} />
      </div>
    </div>
  )
}
