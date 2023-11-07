import clsx from 'clsx'
import { FaGithub } from 'react-icons/fa'

export default function Profile() {
  return (
    <div className={'w-full h-ful'}>
      <h1
        className={clsx(
          'text-white text-4xl font-bold',
          'flex flex-row justify-center',
        )}
      >
        Profile
      </h1>
      <div className='mt-20 flex flex-col justify-center items-center'>
        <img
          src={`${import.meta.env.BASE_URL}image/avatar.jpg`}
          className={'w-48 h-48 rounded-full'}
        />
        <span className={'text-white text-2xl font-medium mt-4'}>曾翊承</span>
        <span className={'text-zinc-300 text-md font-semibold mt-2'}>
          111502041
        </span>
        <a className={'text-white text-2xl mt-4'} href='https://github.com/Lefia/data-viz-midterm'>
          <FaGithub />
        </a>
      </div>
    </div>
  )
}
