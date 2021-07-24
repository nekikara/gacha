import { Platform } from "~/interfaces/platform"
import { useState } from 'react';
import { PlatformCollection } from '~/interfaces/platformCollection';
import { genUUIDv4 } from "~/utils/uuidGen";

export type PlatformDBHook = {
  platformCollection: PlatformCollection,
  addNewPlatform: (platform: Platform) => void
  genNewPlatform: () => Platform
}

export const usePlatformDB = (): PlatformDBHook => {
  const [platformCollection, setPlatformCollection] = useState<PlatformCollection>({ kv: {}, order: [] });

  return {
    platformCollection,
    addNewPlatform: (platform: Platform) => {
      const kv = platformCollection.kv
      kv[platform.id] = platform
      const order = platformCollection.order
      const newOrder = order.concat(platform.id)
      setPlatformCollection({ kv, order: newOrder })
    },
    genNewPlatform: (): Platform => {
      return {
        id: genUUIDv4(),
        name: `Platform${platformCollection.order.length}`
      }
    }
  }
}