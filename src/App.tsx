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
          'mx-auto max-w-full lg:max-w-6xl',
          'md:px-16 px-4 min-h-screen',
          'flex md:flex-row flex-col',
        )}
      >
        <Menu tabState={{tab, setTab}}/>
        <Content tabState={{tab, setTab}}/>
      </div>
    </div>
  )
}
