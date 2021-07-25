import React, { useState } from 'react'
import { ElementType } from '~/components/BoardParts/element'

type Props = {
  current: boolean
  elementType: ElementType
  onFocus: () => void
  onLeave: () => void
  onChange: (title: string) => void
}

export const ElementTypeElement: React.VFC<Props> = ({ current, elementType, onFocus, onLeave, onChange }) => {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (current) return
    onChange(e.currentTarget.innerHTML)
  }

  if (elementType.type === 'div') {
    return <div style={{ width: '100%', height: '100%' }}></div>
  }
  if (elementType.type === 'none') {
    return null
  }
  return (
    <button
      type="button"
      style={{ width: '100%', height: '100%', userSelect: 'none' }}
      contentEditable={editable}
      onDoubleClick={toEditable}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onInput={handleContentChange}
      dangerouslySetInnerHTML={{ __html: elementType.content }}
    >
    </button>
  )
}