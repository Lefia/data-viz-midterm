import clsx from 'clsx'
import MenuItem from './MenuItem'
import { FaUser } from 'react-icons/fa'
import {
  AiOutlineDotChart,
  AiTwotonePieChart,
  AiOutlineBarChart,
} from 'react-icons/ai'

type MenuProps = {
  className?: string
  tabState: {
    tab: string
    setTab: (tab: string) => void
  }
}

export default function Menu(props: MenuProps) {
  const { className, tabState } = props
  const handleClick = (tab: string) => {
    tabState.setTab(tab)
  }
  const handleActive = (tab: string) => {
    return tabState.tab === tab
  }
  return (
    <div
      className={clsx(className, 'flex flex-col justify-center items-center')}
    >
      <MenuItem
        icon={<FaUser />}
        name='Profile'
        onClick={() => handleClick('profile')}
        active={handleActive('profile')}
      />
      <MenuItem
        icon={<AiOutlineDotChart />}
        name='Line'
        onClick={() => handleClick('line-and-scatter')}
        active={handleActive('line-and-scatter')}
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
