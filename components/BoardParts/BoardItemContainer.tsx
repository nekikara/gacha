import React from 'react'


type Props = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const BoardItemContainer: React.VFC<Props> = ({ style, children }) => {
  return (
    <>
      <div className="container" style={style}>
        {children}
      </div>
    </>
  )
}