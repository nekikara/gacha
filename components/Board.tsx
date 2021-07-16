import React from 'react'
import { SideMenu } from '~/components/SideMenuBar'

type Props = {
  mode: SideMenu
}

export const Board: React.VFC<Props> = ({ mode }) => {
  return (
    <>
      <div className="boardFrame">
      </div>
      <style jsx>{`
        .boardFrame {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid #111;
        }
      `}</style>
    </>
  )
}