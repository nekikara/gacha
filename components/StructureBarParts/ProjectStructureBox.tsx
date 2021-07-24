import React from 'react'
import { PlatformCollection } from '~/interfaces/platformCollection'
import { ProjectLayerItem } from './ProjectStructureParts/ProjectLayer'
import { ProjectLayerUL } from './ProjectStructureParts/ProjectLayerUL'
import { ProjectLayerLI } from './ProjectStructureParts/ProjectLayerLI'
import { ProjectLayer } from './ProjectStructureParts/ProjectLayer'
import { useProjectStructure } from './ProjectStructureParts/useProjectStructure'

type Props = {
  platformCollection: PlatformCollection
}

export const ProjectStructureBox: React.VFC<Props> = ({ platformCollection }) => {
  const projectStructure = useProjectStructure(platformCollection)

  return (
    <>
      <ProjectLayerUL>
        {projectStructure.map((layer: ProjectLayerItem) => {
          return (
            <ProjectLayerLI key={layer.id}>
              <ProjectLayer layer={layer} />
            </ProjectLayerLI>
          )
        })}
      </ProjectLayerUL>
    </>
  )
}