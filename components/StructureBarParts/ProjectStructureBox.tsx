import React from 'react'
import { ProjectLayerItem } from './ProjectStructureParts/ProjectLayer'
import { ProjectLayerUL } from './ProjectStructureParts/ProjectLayerUL'
import { ProjectLayerLI } from './ProjectStructureParts/ProjectLayerLI'
import { ProjectLayer } from './ProjectStructureParts/ProjectLayer'
import { KontaID } from '~/interfaces/konta'

type Props = {
  projectLayers: ProjectLayerItem[]
  onSelectedLayerChange: (kontaId: KontaID) => void
}

export const ProjectStructureBox: React.VFC<Props> = ({ projectLayers, onSelectedLayerChange }) => {
  if (projectLayers.length < 1) return null
  return (
    <>
      <ProjectLayerUL>
        {projectLayers.map((layer: ProjectLayerItem) => {
          return (
            <ProjectLayerLI key={layer.id}>
              <ProjectLayer
                layer={layer}
                onLayerSelect={onSelectedLayerChange}
              />
              <ProjectStructureBox
                projectLayers={layer.children}
                onSelectedLayerChange={onSelectedLayerChange}
              />
            </ProjectLayerLI>
          )
        })}
      </ProjectLayerUL>
    </>
  )
}