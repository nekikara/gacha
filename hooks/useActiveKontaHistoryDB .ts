import { KontaID } from './../interfaces/konta';
import { ActiveKontaHistory } from '../interfaces/konta';
import { useState } from 'react';

export const useActiveKontaHistoryDB = () => {
  const [activeKontaHistory, setActiveKontaHistory] = useState<ActiveKontaHistory>({ list: [], len: 0 });

  return {
    latest: activeKontaHistory.list[activeKontaHistory.len - 1],
    addNew: (kontaId: KontaID) => {
      const { list, len } = activeKontaHistory
      const newHistory = list.concat(kontaId)
      setActiveKontaHistory(() => ({ list: newHistory, len: len + 1 }))
    },
  }
}