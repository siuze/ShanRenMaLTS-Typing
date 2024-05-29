import { DISMISS_START_CARD_DATE_KEY } from '@/constants'
import { dismissStartCardDateAtom } from '@/store'
import { IS_MAC_OS, recordStarAction } from '@/utils'
import { Transition } from '@headlessui/react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import IconEye from '~icons/heroicons/eye-solid'
import IconStar from '~icons/material-symbols/star'
import IconStarOutline from '~icons/material-symbols/star-outline'
import IconCircleX from '~icons/tabler/circle-x'

export default function StarCard() {
  const [countdown, setCountdown] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const setDismissStartCardDate = useSetAtom(dismissStartCardDateAtom)
  const [isShow, setIsShow] = useState(false)

  useLayoutEffect(() => {
    // 直接使用 jotai 的 dismissStartCardDate 其值先是默认值，然后才是 localStorage 中的值
    const value = window.localStorage.getItem(DISMISS_START_CARD_DATE_KEY) as Date | null
    if (value === null) {
      setIsShow(true)
    }
  }, [])

  const onClickCloseStar = useCallback(() => {
    setIsShow(false)
    setDismissStartCardDate(new Date())
    if (!isCounting) {
      recordStarAction('dismiss')
    }
  }, [setIsShow, setDismissStartCardDate, isCounting])

  const onClickWantStar = useCallback(() => {
    setIsCounting(true)
    setDismissStartCardDate(new Date())
    recordStarAction('star')
  }, [setDismissStartCardDate])

  useEffect(() => {
    let countdownId: number
    if (isCounting && countdown > 0) {
      countdownId = window.setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
    }
    if (countdown === 0) {
      setIsCounting(false)
      setIsShow(false)
    }

    return () => clearInterval(countdownId)
  }, [isCounting, countdown, setIsShow])

  const content = useMemo(() => {
    return (
      <>
        {isCounting ? (
          <div className="mt-6 flex w-full flex-col items-center gap-4">
            <div className="flex max-w-full items-center text-sm">
              <div className="flex h-7 min-w-[12rem] items-center justify-between rounded-full bg-gray-100 pl-5 text-black dark:bg-zinc-900 dark:text-white">
                <div className="flex-0 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{`${
                  location.hostname
                }${location.pathname.replace(/\/$/, '')}`}</div>
                <IconStarOutline className="ml-4 mr-2 h-4 w-4 flex-shrink-0 text-neutral-400" />
              </div>
              <div className="flex flex-shrink-0 items-center">
                <div className="ml-0.5">👈</div>
                <IconStar className="h-4 w-4 text-emerald-600" />
                <div className="ml-1 text-gray-600 dark:text-gray-300">点亮它！</div>
              </div>
            </div>
            <span className="w-full text-center text-gray-600 dark:text-gray-300">
              收藏快捷键<span className="ml-2 text-emerald-600 dark:text-emerald-500">{IS_MAC_OS ? '⌘' : 'Ctrl'} + D</span>
            </span>
          </div>
        ) : (
          <div className="flex pb-0 pt-6">
            <button
              className="rounded-lg bg-emerald-600 px-6 py-2 text-lg text-white transition-colors duration-300 focus:outline-none"
              type="button"
              onClick={onClickWantStar}
              title="我想收藏"
            >
              我想收藏
            </button>
          </div>
        )}
      </>
    )
  }, [isCounting, onClickWantStar])

  return (
    <Transition
      appear
      show={isShow}
      enter="transition ease-out duration-300 transform"
      enterFrom="translate-x-full -translate-y-full"
      enterTo="translate-x-0 translate-y-0"
      leave="transition ease-in duration-500 transform"
      leaveFrom="translate-x-0 translate-y-0"
      leaveTo="translate-x-full -translate-y-full"
      className="fixed inset-0 z-30 hidden h-0 justify-center md:flex"
    >
      <div className="fixed right-1 top-4 flex w-150 flex-col items-center justify-evenly rounded-2xl bg-white p-12 shadow-2xl dark:bg-gray-800">
        <div className="absolute right-3 top-3 flex h-5 items-center">
          {isCounting && (
            <span className="mx-1.5 dark:text-gray-100">
              <span className="text-emerald-600">{countdown}s </span>
              后自动关闭
            </span>
          )}
          <button type="button" onClick={onClickCloseStar} title="关闭提示" aria-label="关闭提示">
            <IconCircleX className="h-8 w-8 text-emerald-400" />
          </button>
        </div>
        <span className="pb-4 text-xl text-gray-600 dark:text-gray-50">坚持练习，提高山人码LTS打字速度。</span>
        <span className="text-l pb-4 text-gray-600 dark:text-gray-50">
          ▶这里是山人码LTS输入方案的配套打字练习区。
          <br />▶
          <strong>
            建议在上部导航栏点击图标 <IconEye style={{ display: 'inline' }}></IconEye> 来手动开启默写模式以加强记忆训练。
          </strong>
          <br />▶<strong>如果打字过程中需要切换设置，建议先点右上角暂停按钮再修改，</strong>
          否则可能会因为网页总是自动聚焦到打字区而出现设置下拉框一闪而过的情况。
          <br />
          ▶目前《通用规范汉字表》的字义解释是直接从原书图片转文字（OCR）来的，尚未校对，还有许多识别错误，请自行辨别。
        </span>
        {/* {content} */}
      </div>
    </Transition>
  )
}
