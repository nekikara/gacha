import { KontaID } from '../interfaces/konta';
import { useState } from 'react';
import { genUUIDv4 } from '~/utils/uuidGen';
import { TabID, TabCollection, TabObject } from '~/interfaces/tab';

export const useTabDB = () => {
  const [tabCollection, setTabCollection] = useState<TabCollection>({ kv: {} });

  return {
    tabCollection,
    hasAlready: (kontaId: KontaID, tabObj: TabObject): boolean => {
      let tab = null
      for (let key in tabCollection.kv) {
        const t = tabCollection.kv[key]
        if (t.kontaId === kontaId && t.tabObj.id === tabObj.id && t.tabObj.type === tabObj.type) {
          tab = t
          break
        }
      }
      return !!tab
    },
    addNewTab: (kontaId: KontaID, tabObj: TabObject): TabID => {
      const newTab = {
        id: genUUIDv4(),
        kontaId,
        tabObj
      }
      setTabCollection((old: TabCollection) => {
        old.kv[newTab.id] = newTab
        return old
      })
      return newTab.id
    },
  }
}