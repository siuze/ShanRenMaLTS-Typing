import { TypingContext } from '../../store'
import { useContext, useEffect, useState } from 'react'

export default function Progress({ className }: { className?: string }) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state } = useContext(TypingContext)!
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const colorSwitcher: { [key: number]: string } = {
    0: 'bg-emerald-200 dark:bg-emerald-300',
    1: 'bg-emerald-300 dark:bg-emerald-400',
    2: 'bg-emerald-400 dark:bg-emerald-500',
  }

  useEffect(() => {
    const newProgress = Math.floor((state.chapterData.index / state.chapterData.words.length) * 100)
    setProgress(newProgress)
    const colorPhase = Math.floor(newProgress / 33.4)
    setPhase(colorPhase)
  }, [state.chapterData.index, state.chapterData.words.length])

  return (
    <div className={`relative w-1/4 pt-4 ${className}`}>
      <div className="flex h-2 overflow-hidden rounded-xl bg-emerald-100 text-xs transition-all duration-300 dark:bg-emerald-200">
        <div
          style={{ width: `${progress}%` }}
          className={`flex flex-col justify-center whitespace-nowrap rounded-xl text-center text-white shadow-none transition-all duration-300 ${
            colorSwitcher[phase] ?? 'bg-emerald-200 dark:bg-emerald-300'
          }`}
        ></div>
      </div>
    </div>
  )
}
