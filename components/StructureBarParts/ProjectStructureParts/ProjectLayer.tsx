import React from 'react'
import { UUIDv4 } from '~/interfaces/uuidv4'

export type ProjectLayerItem = {
  id: UUIDv4
  name: string,
  horizontalLevel: number
  children: ProjectLayerItem[]
}

type Props = {
  layer: ProjectLayerItem
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ProjectLayer: React.VFC<Props> = ({ layer }) => {
  return (
    <>
      <div className="projectLayerFrame">
        <div
          className="projectLayerInfo"
          style={{
            paddingLeft: `${10 * layer.horizontalLevel}px`
          }}
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
          background-color: rgba(255, 255, 255, 0.5);
        }
        .projectLayerInfo {
          padding: 5px 0;
        }
      `}</style>
    </>
  )
}