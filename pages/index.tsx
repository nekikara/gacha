import React, { useState } from 'react'
import Head from 'next/head'
import { AppHeader } from '~/components/AppHeader'
import { SideMenu, SideMenuBar } from '~/components/SideMenuBar'
import { Board } from '~/components/Board'
import { Element } from '~/interfaces/element'

export default function Index() {
  const [mode, setMode] = useState<SideMenu>('button')
  const [elements, setElements] = useState<Element[]>([])

  const addNewElement = (elm: Element) => {
    const n  = [...elements, elm]
    setElements(n);
  }


  return (
    <>
      <div className="container">
        <Head>
          <title>Gacha</title>
          <meta name="description" content="gacha app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppHeader />
        <main className="main">
          <section className="menu">
            <SideMenuBar mode={mode} onChange={setMode} />
          </section>
          <section className="content">
            <Board mode={mode} elements={elements} onNewElement={addNewElement} />
          </section>
        </main>

      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          height: 100vh;
        }
        .main {
          display: flex;
          flex-direction: row;
        }
        .menu {
          width: 50px;
          height: calc(100vh - 30px);
        }
        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px;
        }
      `}</style>
    </>
  )
}
