import { useEffect, useRef } from "react"
import Tetris from "./tetris"
import { SQUARE_SIZE } from "./tetris/objects/square"

const TICK = 250
const tetris = new Tetris()

export default function App() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current == null) throw new Error('Cadê o canvas ???')

    tetris.init(ref.current)
    const interval = setInterval(() => {
      tetris.update()
      tetris.render()
    }, TICK)

    return () => clearInterval(interval)
  }, [])

  return <canvas width={10 * SQUARE_SIZE} height={20 * SQUARE_SIZE} ref={ref} />
}
