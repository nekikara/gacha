import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { AppHeader } from '~/components/AppHeader'
import { SideMenu, SideMenuBar } from '~/components/SideMenuBar'
import { UUIDv4 } from '~/interfaces/uuidv4'
import { StructureBarBox } from '~/components/StructureBarBox'
import { useLayoutSize } from '~/hooks/useLayoutSize'
import { usePlatformDB } from '~/hooks/usePlatformDB'
import { useHTMLTagDB } from '~/hooks/useHTMLTagDB'
import { useKontaDB } from '~/hooks/useKontaDB'
import { ElementCollection } from '~/components/BoardParts/element'
import { useButtonTagDB } from '~/hooks/useButtonTagDB'
import { useStylerDB } from '~/hooks/useStylerDB'
import { EditorZone } from '~/components/EditorZone'
import { useActiveKontaHistoryDB } from '~/hooks/useActiveKontaHistoryDB '
import { KontaID, KontaObject } from '~/interfaces/konta'
import { useTabDB } from '~/hooks/useTabDB'
import { usePaneTabRankDB } from '~/hooks/usePaneTabRankDB'
import { TabID } from '~/interfaces/tab'
import { PlatfromToolCreation } from '~/components/EditorParts/EditorPaneBox'
import { useHTMLFileDB } from '~/hooks/useHTMLFileDB'

export default function Index() {
  const [mode, setMode] = useState<SideMenu>('button')
  const [activeKontaObject, setKontaObject] = useState<KontaObject | null>(null)
  // DB
  const stylerDB = useStylerDB()
  const buttonTagDB = useButtonTagDB()
  const htmlTagDB = useHTMLTagDB()
  const platformDB = usePlatformDB()
  const kontaDB = useKontaDB()
  const activeKontaHistoryDB = useActiveKontaHistoryDB()
  const layoutSize = useLayoutSize()
  const tabDB = useTabDB()
  const paneTabRankDB = usePaneTabRankDB()
  const htmlFileDB = useHTMLFileDB()

  const elementCollection = useMemo(() => {
    const htmlTagC = htmlTagDB.htmlTagCollection
    const elms = htmlTagC.order.reduce(
      (acc: ElementCollection, uuid: UUIDv4) => {
        const htmlTag = htmlTagC.kv[uuid]
        const buttonTag = buttonTagDB.buttonTagCollection.kv[htmlTag.tagObj.id]
        const styler = stylerDB.stylerCollection.kv[htmlTag.styler.id]
        acc.kv[uuid] = {
          id: uuid,
          elementType: { type: buttonTag.tagType, content: buttonTag.content },
          styleInfo: {
            position: styler.position,
            width: styler.width,
            height: styler.height,
          },
        }
        acc.order.push(uuid)
        return acc
      },
      { kv: {}, order: [] }
    )
    return elms as ElementCollection
  }, [htmlTagDB, buttonTagDB, stylerDB])

  const addNewPlatform = () => {
    const newPlatform = platformDB.genNewPlatform()
    platformDB.addNewPlatform(newPlatform)
    const newKonta = kontaDB.genNewKonta(newPlatform, 0)
    kontaDB.addNewKonta(newKonta, null)
  }

  useEffect(() => {
    const kontaCollection = kontaDB.kontaCollection
    if (kontaCollection.entries.length === 0) {
      addNewPlatform()
    }
  }, [])

  useEffect(() => {
    const konta = kontaDB.findKontaById(activeKontaHistoryDB.latest)
    let kontaObj: KontaObject | null = null
    switch (konta?.obj.type) {
      case 'platform':
        kontaObj = platformDB.platformCollection.kv[konta.obj.id]
        break
      case 'html_file':
        kontaObj = htmlFileDB.htmlFileCollection.kv[konta.obj.id]
        break
      case 'html_tag':
        kontaObj = htmlTagDB.htmlTagCollection.kv[konta.obj.id]
        break
    }
    setKontaObject(() => kontaObj)
  }, [
    kontaDB,
    activeKontaHistoryDB.latest,
    platformDB.platformCollection.kv,
    htmlTagDB.htmlTagCollection.kv,
    htmlFileDB.htmlFileCollection.kv,
  ])

  const handleCompile = async () => {
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ elementCollection }),
      })
      const json = await response.json()

      const elem = document.createElement('a')
      elem.setAttribute(
        'href',
        `data:text/plain;charset=utf-8,${encodeURIComponent(json.html)}`
      )
      elem.setAttribute('download', 'index.html')
      elem.style.display = 'none'
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    } catch (error) {
      console.error(error)
      alert('Error')
    }
  }

  const handleActiveKontaChange = (kontaId: KontaID) => {
    activeKontaHistoryDB.addNew(kontaId)
    const kontaObj = kontaDB.findKontaById(kontaId)
    switch (kontaObj?.obj.type) {
      case 'platform':
      case 'html_file':
        const objType = kontaObj!.obj!.type
        const paneId = layoutSize.addNewPaneIfFirst()
        const alreadyTab = tabDB.hasAlready(kontaId, {
          type: objType,
          id: kontaObj!.obj.id,
        })
        if (!alreadyTab) {
          const tabId = tabDB.addNewTab(kontaId, {
            type: objType,
            id: kontaObj!.obj.id,
          })
          paneTabRankDB.addNewPaneTabRank(paneId, tabId)
        }
        break
      default:
        console.log('not found')
    }
  }

  const handleTabSelect = (tabId: TabID) => {
    const tab = tabDB.findById(tabId)
    if (tab) {
      handleActiveKontaChange(tab.kontaId)
    }
  }

  const handleNewPlatform = () => {
    addNewPlatform()
  }

  const handleNewPlatformTool = (
    platformToolCreation: PlatfromToolCreation
  ) => {
    const parentKonta = kontaDB.findKonta(
      platformToolCreation.kontaObjectIdentity
    )
    const htmlFile =
      platformToolCreation.menuId === 1
        ? htmlFileDB.genNewHTMLFile(platformToolCreation.position)
        : null
    if (parentKonta && htmlFile) {
      const newKonta = kontaDB.genNewKonta(htmlFile, parentKonta?.level + 1)
      htmlFileDB.addNewHTMLFile(htmlFile)
      kontaDB.addNewKonta(newKonta, parentKonta)
    } else {
      throw new Error('Cannot new platform tool')
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
        <main ref={layoutSize.appContainerEl} className="main">
          <section
            className="menu"
            style={{ width: `${layoutSize.layoutWidth.teamBox}px` }}
          >
            <SideMenuBar mode={mode} onChange={setMode} />
          </section>
          <section
            className="structureBar"
            style={{ width: `${layoutSize.layoutWidth.structureBox}px` }}
          >
            <StructureBarBox
              activeKontaId={activeKontaHistoryDB.latest}
              kontaCollection={kontaDB.kontaCollection}
              platformCollection={platformDB.platformCollection}
              htmlTagCollection={htmlTagDB.htmlTagCollection}
              htmlFileCollection={htmlFileDB.htmlFileCollection}
              onWidthChanged={layoutSize.changeStructureBarWidth}
              onActiveKontaChange={handleActiveKontaChange}
              onPlatformAdd={handleNewPlatform}
            />
          </section>
          <section className="content">
            <EditorZone
              activeKontaObject={activeKontaObject}
              paneObjCollection={layoutSize.layoutWidth.paneObjCollection}
              paneTabRankCollection={paneTabRankDB.paneTabRankCollection}
              tabCollection={tabDB.tabCollection}
              platformCollection={platformDB.platformCollection}
              htmlFileCollection={htmlFileDB.htmlFileCollection}
              onTabSelect={handleTabSelect}
              onNewPlatformTool={handleNewPlatformTool}
            />
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
          overflow: hidden;
        }
        .menu {
          height: calc(100vh - 30px);
        }
        .structureBar {
          height: calc(100vh - 30px);
          z-index: 10;
        }
        .content {
          flex: 1;
          z-index: 1;
        }
      `}</style>
    </>
  )
}
