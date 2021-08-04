import { useState } from 'react'
import { TabID } from '~/interfaces/tab'
import { PaneID } from '~/interfaces/pane'
import { PaneTabRankCollection, Rank } from '~/interfaces/paneTabRank'

export const usePaneTabRankDB = () => {
  const [paneTabRankCollection, setPaneTabRankCollection] =
    useState<PaneTabRankCollection>({ kv: {} })

  return {
    paneTabRankCollection,
    addNewPaneTabRank: (paneId: PaneID, tabId: TabID): Rank => {
      const paneTabRanks = paneTabRankCollection.kv[paneId]
      const newRequired = !paneTabRanks
      const nextRank = newRequired ? 1 : paneTabRanks.last + 1
      const newPaneTabRank = {
        paneId,
        tabId,
        rank: nextRank,
      }
      setPaneTabRankCollection((old: PaneTabRankCollection) => {
        if (newRequired) {
          old.kv[paneId] = {
            kv: {
              [nextRank]: newPaneTabRank,
            },
            last: nextRank,
          }
        } else {
          old.kv[paneId].kv[newPaneTabRank.rank] = newPaneTabRank
          old.kv[paneId].last = nextRank
        }

        return old
      })
      return newPaneTabRank.rank
    },
  }
}
