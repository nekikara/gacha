import React, { useEffect, useRef, useState } from 'react'
import { StructureBarResizer } from '~/components/StructureBarParts/StructureBarResizer'
import { PlatformCollection } from '~/interfaces/platform';
import { ProjectStructureBox } from './StructureBarParts/ProjectStructureBox';


type Props = {
  platformCollection: PlatformCollection
  onWidthChanged: (width: number) => void
}

export const StructureBarBox: React.VFC<Props> = ({ platformCollection, onWidthChanged }) => {
  const [containerX, setContainerX] = useState<number>(0);
  const containerEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!!containerEl.current) {
      const rect = containerEl.current.getBoundingClientRect()
      setContainerX(rect.left)
    }
  }, [containerEl])

  return (
    <>
      <div
        ref={containerEl}
        className="container"
      >
        <div className="layer">
          <ProjectStructureBox platformCollection={platformCollection} />
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