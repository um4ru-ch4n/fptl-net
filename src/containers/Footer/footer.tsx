import React from 'react'

import cls from './footer.module.scss'

export const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={cls.Footer}>
      <p>Группа: А-13м-22</p>
      <p>Студент: Олейников А.П.</p>
    </div>
  )
}
