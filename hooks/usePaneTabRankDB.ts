import { useState } from 'react';
import { TabID } from '~/interfaces/tab';
import { PaneID } from '~/interfaces/pane';
import { PaneTabRankCollection, Rank } from '~/interfaces/paneTabRank';

export const usePaneTabRankDB = () => {
  const [paneTabRankCollection, setPaneTabRankCollection] = useState<PaneTabRankCollection>({ kv: {} });

  return {
    paneTabRankCollection,
    addNewPaneTabRank: (paneId: PaneID, tabId: TabID): Rank => {
      const paneTabRank = paneTabRankCollection.kv[paneId]
      const newRequired = !paneTabRank
      const nextRank = newRequired ? 1 : paneTabRank.last + 1
      const newPaneTabRank = {
        paneId,
        tabId,
        rank: nextRank
      }
      setPaneTabRankCollection((old: PaneTabRankCollection) => {
        if (nextRank) {
          old.kv[paneId] = {
            kv: {
              [nextRank]: newPaneTabRank
            },
            last: nextRank
          }
        } else {
          old.kv[paneId].kv[newPaneTabRank.rank] = newPaneTabRank
        }

        return old
      })
      return newPaneTabRank.rank
    },
  }
}