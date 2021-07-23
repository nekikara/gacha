import React, { useState } from 'react'
import Head from 'next/head'
import { AppHeader } from '~/components/AppHeader'
import { SideMenu, SideMenuBar } from '~/components/SideMenuBar'
import { Board } from '~/components/Board'
import { useElementDB } from '~/hooks/useElementDB'
import { UUIDv4 } from '~/interfaces/element'
import { StrutureBarBox } from '~/components/StructureBarBox'
import { useLayoutSize } from '~/hooks/useLayoutSize'

export default function Index() {
  const [mode, setMode] = useState<SideMenu>('button')
  const { elementCollection, addNewElement, updateElementContent } = useElementDB();
  const layoutSize = useLayoutSize()

  const handleCompile = async () => {
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elementCollection })
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

  const handleElementContentChange = (info: { id: UUIDv4, title: string }) => {
    updateElementContent(info)
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
          <section className="structureBar">
            <StrutureBarBox onWidthChanged={layoutSize.changeStructureBarWidth} />
          </section>
          <section className="content">
            <Board
              mode={mode}
              elementCollection={elementCollection}
              onNewElement={addNewElement}
              onElementContentChanged={handleElementContentChange}
            />
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
        .structureBar {
          height: calc(100vh - 30px);
          width: ${layoutSize.structureBarWidth}px;
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
