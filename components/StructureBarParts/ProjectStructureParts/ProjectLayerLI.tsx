import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>

export const ProjectLayerLI: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <li className="projectLayerLIFrame">
        {children}
      </li>
      <style jsx>{`
        .projectLayerLIFrame {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}