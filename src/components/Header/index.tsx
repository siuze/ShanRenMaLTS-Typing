import logo from '@/assets/logo.svg'
import type { PropsWithChildren } from 'react'
import type React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="container z-20 mx-auto w-full px-10 py-6">
      <div className="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
        {/* <NavLink
          className="flex items-center text-2xl font-bold text-emerald-500 no-underline hover:no-underline lg:text-4xl"
          to="https://siuze.github.io/ShanRenMaLTS/"
        >
        </NavLink> */}
        <div className="flex items-center text-2xl font-bold text-emerald-500 no-underline hover:no-underline lg:text-3xl">
          <a href="https://siuze.github.io/ShanRenMaLTS/">
            <img src={logo} className="mr-3 h-10 w-10" alt="山人码LTS" />
          </a>

          <h4 style={{ fontSize: 'smaller' }}>
            <a href="https://siuze.github.io/ShanRenMaLTS/">山人码LTS</a>&nbsp;·&nbsp;
            <a href="/">悟道</a>
          </h4>
        </div>
        <nav className="my-card on element flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-white p-4 transition-colors duration-300 dark:bg-gray-800">
          {children}
        </nav>
      </div>
    </header>
  )
}

export default Header
