import { useEffect, useState } from 'react'
import { PlatformCollection } from '~/interfaces/platformCollection';
import { UUIDv4 } from '~/interfaces/uuidv4';
import { ProjectLayerItem } from './ProjectLayer'

type ProjectStructure = ProjectLayerItem[]

export const useProjectStructure = (platformCollection: PlatformCollection): ProjectStructure => {
  const [projectStructure, setProjectStructure] = useState<ProjectLayerItem[]>([]);

  useEffect(() => {
    const structure: ProjectLayerItem[] = platformCollection.order.map((platformOrder: UUIDv4) => {
      const platform = platformCollection.kv[platformOrder]
      return {
        id: platform.id,
        name: platform.name,
        horizontalLevel: 0,
        children: []
      }
    })
    setProjectStructure(structure)
  }, [platformCollection])

  return projectStructure
}