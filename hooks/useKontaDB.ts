import { useState } from 'react';
import { Konta, KontaObject, KontaCollection } from '~/interfaces/konta';
import { genUUIDv4 } from '~/utils/uuidGen';

export const useKontaDB = () => {
  const [kontaCollection, setKontaCollection] = useState<KontaCollection>({ records: {}, entries: [] });

  return {
    kontaCollection,
    addNewKonta: (konta: Konta) => {
      const records = kontaCollection.records
      records[konta.id] = konta
      const entries = kontaCollection.entries
      const newEntries = entries.concat(konta.id)
      setKontaCollection({ records, entries: newEntries })
    },
    genNewKonta: (kontaObj: KontaObject): Konta => {
      return {
        id: genUUIDv4(),
        obj: {
          id: kontaObj.id,
          type: kontaObj.kontaObjectType
        },
        parent: null,
        children: []
      }
    }
  }
}