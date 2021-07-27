import React, { useEffect, useRef, useState } from 'react'
import { StructureBarResizer } from '~/components/StructureBarParts/StructureBarResizer'
import { HTMLTagCollection } from '~/interfaces/htmlTag';
import { KontaCollection, KontaObject, KontaObjectType } from '~/interfaces/konta';
import { PlatformCollection } from '~/interfaces/platform';
import { UUIDv4 } from '~/interfaces/uuidv4';
import { ProjectStructureBox } from './StructureBarParts/ProjectStructureBox';
import { ProjectLayerItem } from './StructureBarParts/ProjectStructureParts/ProjectLayer';


type Props = {
  kontaCollection: KontaCollection
  platformCollection: PlatformCollection
  htmlTagCollection: HTMLTagCollection
  onWidthChanged: (width: number) => void
}

export const StructureBarBox: React.VFC<Props> = ({ kontaCollection, platformCollection, htmlTagCollection, onWidthChanged }) => {
  const [containerX, setContainerX] = useState<number>(0);
  const containerEl = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useState<ProjectLayerItem[]>([])

  useEffect(() => {
    if (!!containerEl.current) {
      const rect = containerEl.current.getBoundingClientRect()
      setContainerX(rect.left)
    }
  }, [containerEl])

  useEffect(() => {
    function findKontaObject(obj: {id: UUIDv4, type: KontaObjectType}): KontaObject {
      if (obj.type === 'platform') {
        return platformCollection.kv[obj.id]
      } else {
        return htmlTagCollection.kv[obj.id]
      }
    }
    function assembleLayer(kontaId: UUIDv4): ProjectLayerItem {
      const konta = kontaCollection.records[kontaId]
      const kontaObject = findKontaObject(konta.obj)
      const children = konta.children.map((kontaId: UUIDv4) => assembleLayer(kontaId))
      return {
        id: kontaId,
        name: kontaObject.name,
        horizontalLevel: konta.level,
        children
      }
    }
    const layers = kontaCollection.entries.map((kontaId: UUIDv4) => assembleLayer(kontaId))
    setLayers(() => layers)

  }, [kontaCollection, platformCollection, htmlTagCollection])

  return (
    <>
      <div
        ref={containerEl}
        className="container"
      >
        <div className="layer">
          <ProjectStructureBox projectLayers={layers} />
        </div>
        <div className="resizer">
          <StructureBarResizer
            originX={containerX}
            onWidthChanged={onWidthChanged}
          />
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