import { StylerSize, Styler, StylerCollection } from '~/interfaces/styler'
import { useState } from 'react'
import { genUUIDv4 } from '~/utils/uuidGen'

export type StylerDBHook = {
  stylerCollection: StylerCollection
  addNewStyler: (platform: Styler) => void
  genNewStyler: (size: StylerSize) => Styler
}

export const useStylerDB = (): StylerDBHook => {
  const [stylerCollection, setStylerCollection] = useState<StylerCollection>({
    kv: {},
    order: [],
  })
  return {
    stylerCollection,
    addNewStyler: (styler: Styler) => {
      const kv = stylerCollection.kv
      kv[styler.id] = styler
      const order = stylerCollection.order
      const newOrder = order.concat(styler.id)
      setStylerCollection({ kv, order: newOrder })
    },
    genNewStyler: (size: StylerSize): Styler => {
      return {
        id: genUUIDv4(),
        ...size,
      }
    },
  }
}
