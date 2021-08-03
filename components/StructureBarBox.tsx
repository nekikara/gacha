import React, { useEffect, useRef, useState } from 'react'
import { HTMLTagCollection } from '~/interfaces/htmlTag';
import { KontaCollection, KontaID, KontaObject, KontaObjectType } from '~/interfaces/konta';
import { PlatformCollection } from '~/interfaces/platform';
import { UUIDv4 } from '~/interfaces/uuidv4';
import { ResizeEmitter } from './shared/ResizeEmitter';
import { ProjectStructureBox } from './StructureBarParts/ProjectStructureBox';
import { ProjectStructureMenuBox } from './StructureBarParts/ProjectStructureMenuBox';
import { ProjectLayerItem } from './StructureBarParts/ProjectStructureParts/ProjectLayer';


type Props = {
  activeKontaId: KontaID
  kontaCollection: KontaCollection
  platformCollection: PlatformCollection
  htmlTagCollection: HTMLTagCollection
  onWidthChanged: (diff: { x: number, y: number }) => void
  onActiveKontaChange: (kontaId: KontaID) => void
  onPlatformAdd: () => void
}

export const StructureBarBox: React.VFC<Props> = ({
  activeKontaId, kontaCollection, platformCollection, htmlTagCollection, onWidthChanged, onActiveKontaChange,
  onPlatformAdd
}) => {
  const [containerX, setContainerX] = useState<number>(0);
  const [menuPoint, setMenuPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const containerEl = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useState<ProjectLayerItem[]>([])

  useEffect(() => {
    const containerDom = containerEl.current
    if (!!containerDom) {
      const rect = containerDom.getBoundingClientRect()
      setContainerX(rect.left)
    }
  }, [containerEl])

  useEffect(() => {
    function findKontaObject(obj: { id: UUIDv4, type: KontaObjectType }): KontaObject {
      if (obj.type === 'platform') {
        return platformCollection.kv[obj.id]
      } else {
        return htmlTagCollection.kv[obj.id]
      }
    }
    function assembleLayer(kontaId: KontaID): ProjectLayerItem {
      const konta = kontaCollection.records[kontaId]
      const kontaObject = findKontaObject(konta.obj)
      const children = konta.children.map((kontaId: KontaID) => assembleLayer(kontaId))
      return {
        id: kontaId,
        active: kontaId === activeKontaId,
        name: kontaObject.name,
        horizontalLevel: konta.level,
        children
      }
    }
    const layers = kontaCollection.entries.map((kontaId: KontaID) => assembleLayer(kontaId))
    setLayers(() => layers)

  }, [activeKontaId, kontaCollection, platformCollection, htmlTagCollection])

  const handleWidthChange = (diff: { x: number, y: number }) => {
    console.log(diff)
    onWidthChanged(diff)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const containerPoint = e.currentTarget.getBoundingClientRect()
    const clientPoint = { x: e.clientX + 15, y: e.clientY }
    const renderingPoint = { x: clientPoint.x - containerPoint.left, y: clientPoint.y - containerPoint.top }
    setMenuPoint(() => renderingPoint)
    setMenuOpen(() => true)
  }

  const handleNewPlatformAdded = () => {
    onPlatformAdd()
    setMenuOpen(() => false)
  }

  return (
    <>
      <div
        ref={containerEl}
        className="container"
        onContextMenu={handleContextMenu}
      >
        {
          !menuOpen
            ? null
            : (
              <div style={{ position: 'absolute', top: menuPoint.y, left: menuPoint.x }} >
                <ProjectStructureMenuBox onNewPlatformAdd={handleNewPlatformAdded} />
              </div>
            )
        }

        <div className="layer">
          <ProjectStructureBox
            projectLayers={layers}
            onSelectedLayerChange={onActiveKontaChange}
          />
        </div>
        <div className="resizer">
          <ResizeEmitter onBarMove={onWidthChanged} />
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #555;
        }
        .layer {
          height: 100%;
          width: 100%;
        }
        .resizer {
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
        }
      `}</style>
    </>
  )
}