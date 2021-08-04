import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

export const ProjectLayerUL: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <ul className="projectLayerULFrame">{children}</ul>
      <style jsx>{`
        .projectLayerULFrame {
          height: 100%;
          width: 100%;
          list-style: none;
          padding: 0;
        }
      `}</style>
    </>
  )
}
