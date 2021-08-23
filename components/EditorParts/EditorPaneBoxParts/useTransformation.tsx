import { useEffect, useRef } from 'react'
import { Position } from '~/interfaces/position'

export const useTransformation = () => {
  const boardRef = useRef<HTMLDivElement | null>(null)
  const canvasInnerRef = useRef<HTMLDivElement | null>(null)
  const screenBaseRef = useRef<HTMLDivElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let screenWidth = 360
    let scale = 1.0
    let sumScale = 1.0
    const scaleBy = 1.05
    const minScale = 0.05
    const maxScale = 64
    const canvasInnerScrollPosition: Position = { x: 100000, y: 100000 }
    const translate = { x: 0, y: 0 }
    const oldTopLeft = { x: 0, y: 0 }

    const board = boardRef.current
    const screenBase = screenBaseRef.current
    const screen = screenRef.current

    function transformScreenBase() {
      if (screenBase) {
        const transformStr = `matrix(
          ${sumScale}, 0, 0, ${sumScale},
          ${translate.x}, ${translate.y}
        )`
        screenBase.style.transform = `${transformStr}`
      }
    }

    function calcScale(
      currentSum: number,
      deltaY: number
    ): { newScale: number; scaleCandidate: number } {
      if (currentSum === minScale && deltaY > 0) {
        return { newScale: 1.0, scaleCandidate: minScale }
      }
      if (currentSum === maxScale && deltaY < 0) {
        return { newScale: 1.0, scaleCandidate: maxScale }
      }
      const newScale = deltaY < 0 ? 1 * scaleBy : 1 / scaleBy
      const scaleCandidate = sumScale * newScale
      if (scaleCandidate < minScale || scaleCandidate > maxScale) {
        let rate = 1
        let candidate = 1
        if (scaleCandidate < minScale) {
          rate = minScale / sumScale
          candidate = minScale
        }
        if (scaleCandidate > maxScale) {
          rate = maxScale / sumScale
          candidate = maxScale
        }
        return { newScale: rate, scaleCandidate: candidate }
      } else {
        return { newScale, scaleCandidate }
      }
    }

    if (screen) {
      board!.scrollTo(canvasInnerScrollPosition.x, canvasInnerScrollPosition.y)
      const { width, height } = board!.getBoundingClientRect()
      const initialX = width / 2 - screenWidth / 2
      const initialY = height / 2 - screen!.getBoundingClientRect().height / 2
      translate.x = oldTopLeft.x = initialX
      translate.y = oldTopLeft.y = initialY

      board!.addEventListener(
        'wheel',
        function (ev: WheelEvent) {
          ev.preventDefault()
          if (ev.ctrlKey) {
            if (!!ev.deltaY) {
              const { newScale, scaleCandidate } = calcScale(
                sumScale,
                ev.deltaY
              )
              scale = newScale
              sumScale = scaleCandidate

              const screenRect = screen!.getBoundingClientRect()
              const screenOrigin = { x: screenRect.x, y: screenRect.y }
              const point = { x: ev.clientX, y: ev.clientY }
              const diff = {
                x: point.x - screenOrigin.x,
                y: point.y - screenOrigin.y,
              }
              const delta = { x: diff.x * (scale - 1), y: diff.y * (scale - 1) }

              const newSceenOrigin = {
                x: oldTopLeft.x - delta.x,
                y: oldTopLeft.y - delta.y,
              }

              oldTopLeft.x = translate.x = newSceenOrigin.x
              oldTopLeft.y = translate.y = newSceenOrigin.y

              transformScreenBase()
            }
          } else {
            canvasInnerScrollPosition.x += ev.deltaX
            canvasInnerScrollPosition.y += ev.deltaY
            board!.scrollTo(
              canvasInnerScrollPosition.x,
              canvasInnerScrollPosition.y
            )
          }
        },
        { passive: false }
      )
    }

    if (screen) {
      screen.style.width = `${screenWidth}px`
      transformScreenBase()
    }
  }, [screenRef])

  return {
    boardRef,
    canvasInnerRef,
    screenBaseRef,
    screenRef,
  }
}
