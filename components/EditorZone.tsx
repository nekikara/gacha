import React from 'react'
import { KontaObject } from '~/interfaces/konta'
import { PaneID, PaneObj } from '~/interfaces/pane'
import { PaneTabRankCollection } from '~/interfaces/paneTabRank'
import { PlatformCollection } from '~/interfaces/platform'
import { Tab, TabCollection } from '~/interfaces/tab'
import { EditorEmpty } from './EditorParts/EditorEmpty'
import { EditorPane } from './EditorParts/EditorPane'

interface PaneCollectionFroEditorZone {
  kv: Record<PaneID, PaneObj>
  order: PaneID[]
}

type Props = {
  width: number
  activeKontaObject: KontaObject | null
  paneObjCollection: PaneCollectionFroEditorZone
  paneTabRankCollection: PaneTabRankCollection
  tabCollection: TabCollection
  platformCollection: PlatformCollection
}

export const EditorZone: React.VFC<Props> = ({
  width, activeKontaObject, paneObjCollection, paneTabRankCollection, tabCollection, platformCollection
}) => {
  const isEmpty = paneObjCollection.order.length === 0

  const genResizeEventHandler = (index: number) => {
    return (info: { x: number, y: number }) => {
      console.log(index, info)
    }
  }

  const renderPanes = () => {
    return paneObjCollection.order.map((paneId: PaneID) => {
      const paneObj = paneObjCollection.kv[paneId]
      const ranks = paneTabRankCollection.kv[paneId]
      const tabs = []
      for (let i = 1; i <= ranks.last; i++) {
        const rank = ranks.kv[i]
        const tab = tabCollection.kv[rank.tabId]
        tabs.push(tab)
      }
      return (
        <div
          key={paneObj.id}
          className="editorPaneFrame"
          style={{
            left: `${paneObj.x}px`,
            width: `${paneObj.w}px`
          }}
        >
          <EditorPane
            info={paneObj}
            onWidthChange={genResizeEventHandler(paneObj.index)}
          >
            {tabs.map((tab: Tab) => {
              let obj = null
              switch (tab.tabObj.type) {
                case 'platform':
                  const x = platformCollection.kv[tab.tabObj.id]
                  obj = { id: tab.id, name: x.name }
                  break;
                default:
                  break;
              }
              return obj?.name
            })}
          </EditorPane>
        </div>
      )
    })
  }

  return (
    <>
      <div className="editorFrame">
        {isEmpty ? <EditorEmpty /> : renderPanes()}
      </div>
      <style jsx>{`
        .editorFrame {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
        }
        .editorPaneFrame {
          position: absolute;
          top: 0;
          height: 100%;
        }
      `}</style>
    </>
  )
}