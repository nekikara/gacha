import clsx from 'clsx'
import React from 'react'
import { KontaID } from '~/interfaces/konta'

export type ProjectLayerItem = {
  id: KontaID
  active: boolean
  name: string
  horizontalLevel: number
  children: ProjectLayerItem[]
}

type Props = {
  layer: ProjectLayerItem
  onLayerSelect: (kontaId: KontaID) => void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ProjectLayer: React.VFC<Props> = ({ layer, onLayerSelect }) => {
  const kontaCls = clsx('projectLayerInfo', layer.active && 'active')
  const handleSelect = () => {
    onLayerSelect(layer.id)
  }
  return (
    <>
      <div className="projectLayerFrame">
        <div
          className={kontaCls}
          style={{
            paddingLeft: `${10 * layer.horizontalLevel}px`,
          }}
          onClick={handleSelect}
        >
          {layer.name}
        </div>
      </div>
      <style jsx>{`
        .projectLayerFrame {
          width: 100%;
          color: #bbb;
        }
        .projectLayerFrame:hover {
          background-color: rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }
        .projectLayerInfo {
          padding: 5px 0;
        }
        .projectLayerInfo.active {
          color: rgba(255, 5, 49, 1);
          text-shadow: 0 0 0.2rem rgba(255, 5, 49, 0.5);
        }
      `}</style>
    </>
  )
}
