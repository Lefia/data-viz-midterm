import clsx from 'clsx'
import MenuItem from './MenuItem'
import { FaUser } from 'react-icons/fa'
import {
  AiOutlineLineChart,
  AiTwotonePieChart,
  AiOutlineBarChart,
} from 'react-icons/ai'

type MenuProps = {
  tabState: {
    tab: string
    setTab: (tab: string) => void
  }
}

export default function Menu(props: MenuProps) {
  const { tabState } = props
  const handleClick = (tab: string) => {
    tabState.setTab(tab)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleActive = (tab: string) => {
    return tabState.tab === tab
  }
  return (
    <div
      className={clsx(
        'h-screen flex flex-col justify-center items-center',
        'sticky top-0 left-0 translate-x-16',
      )}
    >
      <MenuItem
        icon={<FaUser />}
        name='Profile'
        onClick={() => handleClick('profile')}
        active={handleActive('profile')}
      />
      <MenuItem
        icon={<AiOutlineLineChart />}
        name='Line'
        onClick={() => handleClick('line')}
        active={handleActive('line')}
      />
      <MenuItem
        icon={<AiOutlineBarChart />}
        name='Bar'
        onClick={() => handleClick('bar')}
        active={handleActive('bar')}
      />
      <MenuItem
        icon={<AiTwotonePieChart />}
        name='Pie'
        onClick={() => handleClick('pie')}
        active={handleActive('pie')}
      />
    </div>
  )
}
