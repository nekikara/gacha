import { PaneID } from './pane'
import { TabID } from './tab'

export type Rank = number

export interface PaneTabRank {
  rank: Rank
  paneId: PaneID
  tabId: TabID
}

export interface PaneTabRanks {
  kv: Record<Rank, PaneTabRank>
  last: Rank
}

export interface PaneTabRankCollection {
  kv: Record<PaneID, PaneTabRanks>
}
