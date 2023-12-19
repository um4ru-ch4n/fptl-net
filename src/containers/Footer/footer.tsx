import React from 'react'

import cls from './footer.module.scss'

export const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={cls.Footer}>
        <h2>This is footer!</h2>
    </div>
  )
}
