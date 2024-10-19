'use client';

import Head from 'next/head'
import { useState } from 'react';
import CardTemp from './card';

export default function QuizPage() {

  const [toggle,setToggle] = useState(false);
  return (
    <>
      <Head>
        <title>QuizPage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

        <div className='h-[100vh] w-[100vw] flex justify-center ease-linear duration-300 items-center bg-gray-100 dark:bg-slate-900'>
            <CardTemp />
        </div>
    </>
  )
}
