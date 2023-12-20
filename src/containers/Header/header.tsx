import React from 'react'

import cls from './header.module.scss'

export const Header: React.FC = (): JSX.Element => {
  return (
    <div className={cls.Header}>
        <h1>FPTL NET</h1>
    </div>
  )
}
