import { UUIDv4 } from '~/interfaces/uuidv4';
import { Element } from "~/interfaces/element"
import { useState } from 'react';
import { ElementCollection } from '~/interfaces/elementCollection';

export type ElementDBHook = {
  elementCollection: ElementCollection,
  addNewElement: (element: Element) => void
  updateElementContent: (info: { id: UUIDv4, title: string }) => void
}

export const useElementDB = (): ElementDBHook => {
  const [elementCollection, setElementCollection] = useState<ElementCollection>({ kv: {}, order: [] });

  return {
    elementCollection,
    addNewElement: (element: Element) => {
      const kv = elementCollection.kv
      kv[element.id] = element
      const order = elementCollection.order
      const newOrder = order.concat(element.id)
      setElementCollection({ kv, order: newOrder })
    },
    updateElementContent: (info: { id: UUIDv4, title: string }) => {
      const kv = elementCollection.kv
      const element = kv[info.id]
      if (element.elementType.type === 'button') {
        kv[info.id] = { ...element, elementType: { ...element.elementType, content: info.title } }
      }
      setElementCollection((previous) => {
        return {
          kv,
          order: previous.order
        }
      })

    }
  }
}