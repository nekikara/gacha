import { KontaID, KontaObjectIdentity } from './../interfaces/konta'
import { useState } from 'react'
import { Konta, KontaObject, KontaCollection } from '~/interfaces/konta'
import { genUUIDv4 } from '~/utils/uuidGen'

export const useKontaDB = () => {
  const [kontaCollection, setKontaCollection] = useState<KontaCollection>({
    records: {},
    entries: [],
  })

  return {
    kontaCollection,
    addNewKonta: (konta: Konta, parentKonta: Konta | null) => {
      const records = kontaCollection.records
      if (!!parentKonta) {
        records[parentKonta.id].children = records[
          parentKonta.id
        ].children.concat(konta.id)
      }
      records[konta.id] = konta
      const entries = kontaCollection.entries
      const newEntries = konta.level === 0 ? entries.concat(konta.id) : entries
      setKontaCollection(() => ({ records, entries: newEntries }))
    },
    findKontaById: (kontaId: KontaID): Konta | null => {
      return kontaCollection.records[kontaId]
    },
    findKonta: (info: KontaObjectIdentity): Konta | null => {
      let konta = null
      for (let x in kontaCollection.records) {
        const k = kontaCollection.records[x] as Konta
        if (k.obj.id === info.id && k.obj.type === info.type) {
          konta = k
          break
        }
      }
      return konta
    },
    genNewKonta: (kontaObj: KontaObject, level: number): Konta => {
      return {
        id: genUUIDv4(),
        level,
        obj: {
          id: kontaObj.id,
          type: kontaObj.kontaObjectType,
        },
        parent: null,
        children: [],
      }
    },
  }
}
