import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './containers/Header/header';
import { Main } from './containers/Main/main';

import cls from './App.module.scss'

type AppProps = object;

export const App: React.FC<AppProps> = (): JSX.Element => {
  return (
    <div className={cls.App}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}