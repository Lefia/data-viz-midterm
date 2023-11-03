import clsx from 'clsx'
import { useState } from 'react'
import Menu from './components/Menu'

export default function App() {
  const [tab, setTab] = useState('profile')
  return (
    <div className='bg-zinc-900'>
      {/* Container */}
      <div
        className={clsx(
          'mx-auto max-w-full lg:max-w-4xl',
          'py-16 px-8 h-screen',
          'flex flex-row',
        )}
      >
        <Menu className={clsx('w-16 h-full')} tabState={{tab, setTab}}/>
        <div
          className={clsx('h-full w-full ml-8 rounded-lg', 'bg-zinc-600')}
        ></div>
      </div>
    </div>
  )
}
