import React from 'react'
import { KontaObject } from '~/interfaces/konta'
import { PaneID, PaneObjCollection } from '~/interfaces/pane'
import { PaneTabRankCollection } from '~/interfaces/paneTabRank'
import { PlatformCollection } from '~/interfaces/platform'
import { TabCollection, TabID } from '~/interfaces/tab'
import { EditorPane } from './EditorPaneBoxParts/EditorPane'
import { EditorTabBox } from './EditorPaneBoxParts/EditorTabBox'

interface Props {
  activeKontaObject: KontaObject | null
  paneObjCollection: PaneObjCollection
  paneTabRankCollection: PaneTabRankCollection
  tabCollection: TabCollection
  platformCollection: PlatformCollection
  onTabSelect: (tabId: TabID) => void
}

export const EditorPaneBox: React.VFC<Props> = ({
  activeKontaObject,
  paneObjCollection,
  paneTabRankCollection,
  platformCollection,
  tabCollection,
  onTabSelect,
}) => {
  const genResizeEventHandler = (index: number) => {
    return (info: { x: number; y: number }) => {
      console.log(index, info)
    }
  }

  const handleTabSelect = (tabId: TabID) => {
    onTabSelect(tabId)
  }
  return (
    <>
      {paneObjCollection.order.map((paneId: PaneID) => {
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
            className="editorPaneFrameInZone"
            style={{
              left: `${paneObj.x}px`,
              width: `${paneObj.w}px`,
            }}
          >
            <EditorPane
              info={paneObj}
              onWidthChange={genResizeEventHandler(paneObj.index)}
            >
              <EditorTabBox
                activeKontaObject={activeKontaObject}
                tabs={tabs}
                platformCollection={platformCollection}
                onTabSelect={handleTabSelect}
              />
            </EditorPane>
          </div>
        )
      })}
      <style jsx>{`
        .editorPaneFrameInZone {
          position: absolute;
          top: 0;
          height: 100%;
        }
      `}</style>
    </>
  )
}
