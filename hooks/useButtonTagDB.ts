import { ButtonTag, ButtonTagCollection } from '~/interfaces/buttonTag'
import { useState } from 'react'
import { genUUIDv4 } from '~/utils/uuidGen'

export type ButtonTagDBHook = {
  buttonTagCollection: ButtonTagCollection
  addNewButtonTag: (platform: ButtonTag) => void
  genNewButtonTag: (content: string) => ButtonTag
}

export const useButtonTagDB = (): ButtonTagDBHook => {
  const [buttonTagCollection, setButtonTagCollection] =
    useState<ButtonTagCollection>({ kv: {}, order: [] })
  return {
    buttonTagCollection,
    addNewButtonTag: (buttonTag: ButtonTag) => {
      const kv = buttonTagCollection.kv
      kv[buttonTag.id] = buttonTag
      const order = buttonTagCollection.order
      const newOrder = order.concat(buttonTag.id)
      setButtonTagCollection({ kv, order: newOrder })
    },
    genNewButtonTag: (content: string): ButtonTag => {
      return {
        id: genUUIDv4(),
        tagType: 'button',
        content: content,
      }
    },
  }
}
