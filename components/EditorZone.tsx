import React from 'react'
import { HTMLFileCollection } from '~/interfaces/htmlFile'
import { KontaObject } from '~/interfaces/konta'
import { PaneID, PaneObj } from '~/interfaces/pane'
import { PaneTabRankCollection } from '~/interfaces/paneTabRank'
import { PlatformCollection } from '~/interfaces/platform'
import { TabCollection, TabID } from '~/interfaces/tab'
import { EditorEmpty } from './EditorParts/EditorEmpty'
import {
  EditorPaneBox,
  PlatfromToolCreation,
} from './EditorParts/EditorPaneBox'

interface PaneCollectionFroEditorZone {
  kv: Record<PaneID, PaneObj>
  order: PaneID[]
}

type Props = {
  activeKontaObject: KontaObject | null
  paneObjCollection: PaneCollectionFroEditorZone
  paneTabRankCollection: PaneTabRankCollection
  tabCollection: TabCollection
  platformCollection: PlatformCollection
  htmlFileCollection: HTMLFileCollection
  onTabSelect: (tabId: TabID) => void
  onNewPlatformTool: (platformToolCreation: PlatfromToolCreation) => void
}

export const EditorZone: React.VFC<Props> = ({
  activeKontaObject,
  paneObjCollection,
  paneTabRankCollection,
  tabCollection,
  platformCollection,
  htmlFileCollection,
  onTabSelect,
  onNewPlatformTool,
}) => {
  const isEmpty = paneObjCollection.order.length === 0

  const handleTabSelect = (tabId: TabID) => {
    onTabSelect(tabId)
  }

  const handleNewPlatformTool = (
    platformToolCreation: PlatfromToolCreation
  ) => {
    onNewPlatformTool(platformToolCreation)
  }

  return (
    <>
      <div className="editorFrame">
        {isEmpty ? (
          <EditorEmpty />
        ) : (
          <EditorPaneBox
            activeKontaObject={activeKontaObject}
            paneObjCollection={paneObjCollection}
            paneTabRankCollection={paneTabRankCollection}
            platformCollection={platformCollection}
            tabCollection={tabCollection}
            htmlFileCollection={htmlFileCollection}
            onTabSelect={handleTabSelect}
            onNewPlatformTool={handleNewPlatformTool}
          />
        )}
      </div>
      <style jsx>{`
        .editorFrame {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}
