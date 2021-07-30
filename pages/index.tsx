import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { AppHeader } from '~/components/AppHeader'
import { SideMenu, SideMenuBar } from '~/components/SideMenuBar'
import { Board } from '~/components/Board'
import { UUIDv4 } from '~/interfaces/uuidv4'
import { StructureBarBox } from '~/components/StructureBarBox'
import { useLayoutSize } from '~/hooks/useLayoutSize'
import { usePlatformDB } from '~/hooks/usePlatformDB'
import { useHTMLTagDB } from '~/hooks/useHTMLTagDB'
import { useKontaDB } from '~/hooks/useKontaDB'
import { Element, ElementCollection } from '~/components/BoardParts/element'
import { useButtonTagDB } from '~/hooks/useButtonTagDB'
import { StylerSize } from '~/interfaces/styler'
import { useStylerDB } from '~/hooks/useStylerDB'
import { EditorZone } from '~/components/EditorZone'
import { useActiveKontaHistoryDB } from '~/hooks/useActiveKontaHistoryDB '
import { KontaID, KontaObject } from '~/interfaces/konta'

export default function Index() {
  const [mode, setMode] = useState<SideMenu>('button')
  const [activeKontaObject, setKontaObject] = useState<KontaObject | null>(null)
  const stylerDB = useStylerDB()
  const buttonTagDB = useButtonTagDB()
  const htmlTagDB = useHTMLTagDB()
  const platformDB = usePlatformDB()
  const kontaDB = useKontaDB()
  const activeKontaHistoryDB = useActiveKontaHistoryDB()
  const layoutSize = useLayoutSize()
  const elementCollection = useMemo(() => {
    const htmlTagC = htmlTagDB.htmlTagCollection
    const elms = htmlTagC.order.reduce((acc: ElementCollection, uuid: UUIDv4) => {
      const htmlTag = htmlTagC.kv[uuid]
      const buttonTag = buttonTagDB.buttonTagCollection.kv[htmlTag.tagObj.id]
      const styler = stylerDB.stylerCollection.kv[htmlTag.styler.id]
      acc.kv[uuid] = {
        id: uuid,
        elementType: { type: buttonTag.tagType, content: buttonTag.content },
        styleInfo: {
          position: styler.position,
          width: styler.width,
          height: styler.height
        }
      }
      acc.order.push(uuid)
      return acc
    }, { kv: {}, order: [] })
    return elms as ElementCollection

  }, [htmlTagDB, buttonTagDB, stylerDB])

  useEffect(() => {
    const newPlatform = platformDB.genNewPlatform();
    platformDB.addNewPlatform(newPlatform)
    const newKonta = kontaDB.genNewKonta(newPlatform, 0)
    kontaDB.addNewKonta(newKonta, null)
    activeKontaHistoryDB.addNew(newKonta.id)
  }, [])

  useEffect(() => {
    const konta = kontaDB.findKontaById(activeKontaHistoryDB.latest)
    let kontaObj: KontaObject | null = null;
    switch (konta?.obj.type) {
      case 'platform':
        kontaObj = platformDB.platformCollection.kv[konta.obj.id]
        break;
      case 'html_tag':
        kontaObj = htmlTagDB.htmlTagCollection.kv[konta.obj.id]
        break;
    }
    setKontaObject(() => kontaObj)
  }, [kontaDB, activeKontaHistoryDB.latest, platformDB.platformCollection.kv, htmlTagDB.htmlTagCollection.kv])

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

  const handleNewElement = (elm: Element) => {
    if (elm.elementType.type === 'button') {
      const buttonTag = buttonTagDB.genNewButtonTag(elm.elementType.content)
      buttonTagDB.addNewButtonTag(buttonTag)
      const stylerSize: StylerSize = {
        position: elm.styleInfo.position,
        height: elm.styleInfo.height,
        width: elm.styleInfo.width,
      }
      const styler = stylerDB.genNewStyler(stylerSize)
      stylerDB.addNewStyler(styler)
      const htmlTag = htmlTagDB.genNewHTMLTag(buttonTag, styler)
      htmlTagDB.addNewHTMLTag(htmlTag)
      const platformId = platformDB.platformCollection.order[0]
      const platform = platformDB.platformCollection.kv[platformId]
      const parentKonta = kontaDB.findKonta({ kontaObjectId: platform.id, kontaObjectType: 'platform' })
      const newKonta = kontaDB.genNewKonta(htmlTag, Number(parentKonta?.level) + 1)
      kontaDB.addNewKonta(newKonta, parentKonta)
    }
  }
  const handleElementContentChange = (info: { id: UUIDv4, title: string }) => {
    console.log('update element', info)
  }
  const handleActiveKontaChange = (kontaId: KontaID) => {
    activeKontaHistoryDB.addNew(kontaId)
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
          <section
            className="structureBar"
            style={{ width: `${layoutSize.structureBarWidth}px` }}
          >
            <StructureBarBox
              activeKontaId={activeKontaHistoryDB.latest}
              kontaCollection={kontaDB.kontaCollection}
              platformCollection={platformDB.platformCollection}
              htmlTagCollection={htmlTagDB.htmlTagCollection}
              onWidthChanged={layoutSize.changeStructureBarWidth}
              onActiveKontaChange={handleActiveKontaChange}
            />
          </section>
          <section className="content">
            <EditorZone activeKontaObject={activeKontaObject} />
            {/* <Board
              mode={mode}
              elementCollection={elementCollection}
              onNewElement={handleNewElement}
              onElementContentChanged={handleElementContentChange}
            /> */}
          </section>
        </main>

      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          height: 100vh;
          max-height: 100vh;
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
        }
        .content {
          flex: 1;
        }
      `}</style>
    </>
  )
}
