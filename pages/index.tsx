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
    const n = [...elements, elm]
    setElements(n);
  }

  const handleCompile = async () => {
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elements })
      })
      const json = await response.json()

      const elem = document.createElement('a');
      elem.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(json.html)}`);
      elem.setAttribute('download', 'index.html');
      elem.style.display = 'none';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    } catch (error) {
      console.error(error);
      alert('Error')
    }
  }

  return (
    <>
      <div className="container">
        <Head>
          <title>Gacha</title>
          <meta name="description" content="gacha app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppHeader onCompile={handleCompile} />
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
