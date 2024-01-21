import InfoPanel from '@/components/InfoPanel'
import { useCallback, useState } from 'react'
import IconBook2 from '~icons/tabler/book-2'

export default function DictRequest() {
  const [showPanel, setShowPanel] = useState(false)

  const onOpenPanel = useCallback(() => {
    setShowPanel(true)
  }, [])

  const onClosePanel = useCallback(() => {
    setShowPanel(false)
  }, [])

  return (
    <>
      {showPanel && (
        <InfoPanel
          openState={showPanel}
          title="申请词典"
          icon={IconBook2}
          buttonClassName="bg-emerald-500 hover:bg-emerald-400"
          iconClassName="text-emerald-500 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500"
          onClose={onClosePanel}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            请阅读{' '}
            <strong>
              <a className="text-emerald-400" href="https://siuze.github.io/ShanRenMaLTS/blog/group" target="_blank" rel="noreferrer">
                该页面
              </a>
            </strong>{' '}
            以添加用户社群或在项目讨论区进行反馈。
          </p>
          <br />
        </InfoPanel>
      )}
      <button className="cursor-pointer pr-6 text-sm text-emerald-500" onClick={onOpenPanel}>
        没有找到想要的词典？
      </button>
    </>
  )
}
