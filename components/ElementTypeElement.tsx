import React, { useState } from 'react'
import { ElementType } from '~/interfaces/element'

type Props = {
  current: boolean
  elementType: ElementType
  onFocus: () => void
  onLeave: () => void
}

export const ElementTypeElement: React.VFC<Props> = ({ current, elementType, onFocus, onLeave }) => {
  const [editable, setEditable] = useState<boolean>(false)

  const toEditable = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditable(true)
  }

  const handleMouseEnter = () => {
    if (current) return
    onFocus();
  }

  const handleMouseLeave = () => {
    if (current) return
    onLeave();
  }

  if (elementType === 'div') {
    return <div style={{ width: '100%', height: '100%' }}></div>
  }
  return (
    <button
      type="button"
      style={{ width: '100%', height: '100%', userSelect: 'none' }}
      contentEditable={editable}
      onDoubleClick={toEditable}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dangerouslySetInnerHTML={{ __html: elementType.content }}
    >
    </button>
  )
}