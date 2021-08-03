import React from 'react'

type Props = {
  onNewPlatformAdd: () => void
}

export const ProjectStructureMenuBox: React.VFC<Props> = ({ onNewPlatformAdd }) => {
  const handleMenuSelected = () => {
    onNewPlatformAdd()
  }
  return (
    <>
      <ul className="menuContainer">
        <li className="menuItem">
          <div onClick={handleMenuSelected}>
            Add Platform
          </div>
        </li>
      </ul>
      <style jsx>{`
        .menuContainer {
          width: 100%;
          height: 100%;
          background-color: #555;
          padding: 0;
          list-style: none;
        }
        .menuItem {
          border: 1px solid #222;
          border-radius: 2px;
          padding: 10px;
          width: 120px;
        }
        .menuItem:hover {
          cursor: pointer;
          background-color: #111;
          color: #aaa;
        }
      `}</style>
    </>
  )
}