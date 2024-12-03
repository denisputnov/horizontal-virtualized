import {useVirtualizer} from "@tanstack/react-virtual";
import {useRef} from "react";

const ITEMS = Array.from({length: 1000}).map((_, i) => i)

function App() {

  const parentRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: ITEMS.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    horizontal: true
  })

  return (
    <div className="h-screen w-screen bg-slate-800 p-2">
      <div ref={parentRef} className="w-full border-white border border-solid h-40 overflow-x-scroll" >
        <div
          className="relative h-full"
          style={{
            width: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 h-full border-solid border-green-600 border flex items-center justify-center text-white"
              style={{
                width: `${virtualItem.size}px`,
                transform: `translateX(${virtualItem.start}px)`,
              }}
            >
              Item {virtualItem.index}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
