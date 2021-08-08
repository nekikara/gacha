import { useState } from 'react'
import { genUUIDv4 } from '~/utils/uuidGen'
import { HTMLFile, HTMLFileCollection } from '~/interfaces/htmlFile'
import { Position } from '~/interfaces/position'

export type HTMLFileDBHook = {
  htmlFileCollection: HTMLFileCollection
  addNewHTMLFile: (file: HTMLFile) => void
  genNewHTMLFile: (position: Position) => HTMLFile
}

export const useHTMLFileDB = (): HTMLFileDBHook => {
  const [htmlFileCollection, setHTMLFileCollection] =
    useState<HTMLFileCollection>({ kv: {}, order: [] })
  return {
    htmlFileCollection,
    addNewHTMLFile: (htmlFile: HTMLFile) => {
      const kv = htmlFileCollection.kv
      kv[htmlFile.id] = htmlFile
      const order = htmlFileCollection.order
      const newOrder = order.concat(htmlFile.id)
      setHTMLFileCollection({ kv, order: newOrder })
    },
    genNewHTMLFile: (position: Position): HTMLFile => {
      return {
        id: genUUIDv4(),
        kontaObjectType: 'html_file',
        name: `HTMLFile${htmlFileCollection.order.length + 1}`,
        position,
      }
    },
  }
}
