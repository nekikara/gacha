import React, { useState } from 'react'
import { ElementType } from '~/interfaces/element'

type Props = {
  elementType: ElementType
}

export const ElementTypeElement: React.VFC<Props> = ({ elementType }) => {
  const [editable, setEditable] = useState<boolean>(false)

  const toEditable = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditable(true)
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
    >
      {elementType.content}
    </button>
  )
}