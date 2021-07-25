import { ButtonTag } from './../interfaces/buttonTag';
import { HTMLTag, HTMLTagCollection } from '~/interfaces/htmlTag';
import { useState } from 'react';
import { genUUIDv4 } from "~/utils/uuidGen";
import { Styler } from '~/interfaces/styler';

export type HTMLTagDBHook = {
  htmlTagCollection: HTMLTagCollection,
  addNewHTMLTag: (platform: HTMLTag) => void
  genNewHTMLTag: (tagObj: ButtonTag, styler: Styler) => HTMLTag
}

export const useHTMLTagDB = (): HTMLTagDBHook => {
  const [htmlTagCollection, setHTMLTagCollection] = useState<HTMLTagCollection>({ kv: {}, order: [] });
  return {
    htmlTagCollection,
    addNewHTMLTag: (htmlTag: HTMLTag) => {
      const kv = htmlTagCollection.kv
      kv[htmlTag.id] = htmlTag
      const order = htmlTagCollection.order
      const newOrder = order.concat(htmlTag.id)
      setHTMLTagCollection({ kv, order: newOrder })
    },
    genNewHTMLTag: (tagObj: ButtonTag, styler: Styler): HTMLTag => {
      return {
        id: genUUIDv4(),
        kontaObjectType: 'html_tag',
        name: `HTMLTag${htmlTagCollection.order.length}`,
        tagObj: {
          id: tagObj.id,
          type: tagObj.tagType
        },
        styler: {
          id: styler.id
        }
      }
    }
  }
}