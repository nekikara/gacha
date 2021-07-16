import React from 'react'

export const AppHeader: React.VFC = () => {
  return (
    <>
      <header className="headerFrame">
        <nav className="navFrame">
          <button type="button">
            Compile
          </button>
        </nav>

      </header>
      <style jsx>{`
        .headerFrame {
          height: 30px;
          padding: 3px;
          background-color: #aaa;
          display: flex;
          align-items: center;
        }
        .navFrame {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
        }
      `}</style>
    </>
  )
}