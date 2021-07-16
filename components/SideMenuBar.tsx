import React from 'react'
import clsx from 'clsx'

export type SideMenu = 'button'

type Props = {
  mode: SideMenu
  onChange: (mode: SideMenu) => void;
}

export const SideMenuBar: React.VFC<Props> = ({ mode, onChange }) => {
  const bClass = clsx('buttonBtn', mode === 'button' && 'active')

  const handleModeChange = (mode: SideMenu) => {
    return () => {
      onChange(mode)
    }
  }
  return (
    <>
      <div className="menuBarFrame">
        <div className={bClass} onClick={handleModeChange('button')}>
          B
        </div>
      </div>
      <style jsx>{`
        .menuBarFrame {
          background-color: #111;
          width: 100%;
          height: 100%;
          padding: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .buttonBtn {
          width: 35px;
          height: 35px;
          border-radius: 18px;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .buttonBtn {
          background-color: #aaa;
        }
      `}</style>
    </>
  )
}