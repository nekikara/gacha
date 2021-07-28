import React from 'react'
import { ProjectLayerItem } from './ProjectStructureParts/ProjectLayer'
import { ProjectLayerUL } from './ProjectStructureParts/ProjectLayerUL'
import { ProjectLayerLI } from './ProjectStructureParts/ProjectLayerLI'
import { ProjectLayer } from './ProjectStructureParts/ProjectLayer'

type Props = {
  projectLayers: ProjectLayerItem[]
}

export const ProjectStructureBox: React.VFC<Props> = ({ projectLayers }) => {
  if (projectLayers.length < 1) return null
  return (
    <>
      <ProjectLayerUL>
        {projectLayers.map((layer: ProjectLayerItem) => {
          return (
            <ProjectLayerLI key={layer.id}>
              <ProjectLayer layer={layer} />
              <ProjectStructureBox projectLayers={layer.children} />
            </ProjectLayerLI>
          )
        })}
      </ProjectLayerUL>
    </>
  )
}