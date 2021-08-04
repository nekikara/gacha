import React from 'react'

type Props = {
  onCompile: () => void
}
export const AppHeader: React.VFC<Props> = ({ onCompile }) => {
  const compile = () => {
    onCompile()
  }
  return (
    <>
      <header className="headerFrame">
        <nav className="navFrame">
          <button type="button" onClick={compile}>
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
