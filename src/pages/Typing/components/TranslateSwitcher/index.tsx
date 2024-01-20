import { TypingContext, TypingStateActionType } from '../../store'
import { hintSoundsConfigAtom, keySoundsConfigAtom } from '@/store'
import { currentDictInfoAtom, phoneticConfigAtom, pronunciationConfigAtom } from '@/store'
import { Popover, Switch, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import { Fragment, useCallback } from 'react'
import { useContext } from 'react'
import IconLanguage from '~icons/heroicons/language'
import IconSpeakerWave from '~icons/heroicons/speaker-wave-solid'

export default function TranslateSwitcher() {
  const { state, dispatch } = useContext(TypingContext) ?? {}
  const [keySoundsConfig, setKeySoundsConfig] = useAtom(keySoundsConfigAtom)
  const [hintSoundsConfig, setHintSoundsConfig] = useAtom(hintSoundsConfigAtom)
  const [pronunciationConfig, setPronunciationConfig] = useAtom(pronunciationConfigAtom)
  const [phoneticConfig, setPhoneticConfig] = useAtom(phoneticConfigAtom)
  const onChangePronunciationIsOpen = useCallback(
    (value: boolean) => {
      setPronunciationConfig((old) => ({
        ...old,
        isOpen: value,
      }))
    },
    [setPronunciationConfig],
  )
  const onChangeKeySound = useCallback(
    (checked: boolean) => {
      setKeySoundsConfig((old) => ({ ...old, isOpen: checked }))
    },
    [setKeySoundsConfig],
  )
  const onChangePhoneticIsOpen = useCallback(
    (value: boolean) => {
      setPhoneticConfig((old) => ({
        ...old,
        isOpen: value,
      }))
    },
    [setPhoneticConfig],
  )
  const onChangeHintSound = useCallback(
    (checked: boolean) => {
      setHintSoundsConfig((old) => ({ ...old, isOpen: checked }))
    },
    [setHintSoundsConfig],
  )

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center rounded p-[2px] text-lg text-emerald-500 outline-none transition-colors duration-300 ease-in-out hover:bg-emerald-400 hover:text-white  ${
              open ? 'bg-emerald-500 text-white' : ''
            }`}
            onFocus={(e) => {
              e.target.blur()
            }}
            aria-label="拆分和翻译"
            title="拆分和翻译"
          >
            <IconLanguage className="icon" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-2 flex max-w-max -translate-x-1/2 px-4 ">
              <div className="shadow-upper box-border flex w-60 select-none flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 drop-shadow dark:bg-gray-800">
                <div className="flex w-full  flex-col  items-start gap-2 py-0">
                  <span className="text-sm font-normal leading-5 text-gray-900 dark:text-white dark:text-opacity-60">单字拆分</span>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Switch checked={phoneticConfig.isOpen} onChange={onChangePhoneticIsOpen} className="switch-root">
                      <span aria-hidden="true" className="switch-thumb" />
                    </Switch>
                    <span className="text-right text-xs font-normal leading-tight text-gray-600">{`拆分显示已${
                      phoneticConfig.isOpen ? '开启' : '关闭'
                    }`}</span>
                  </div>
                </div>
                <div className="flex w-full  flex-col  items-start gap-2 py-0">
                  <span className="text-sm font-normal leading-5 text-gray-900 dark:text-white dark:text-opacity-60">词条释义</span>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Switch
                      checked={state?.isTransVisible}
                      onChange={() => {
                        if (dispatch) {
                          dispatch({ type: TypingStateActionType.TOGGLE_TRANS_VISIBLE })
                        }
                      }}
                      className="switch-root"
                    >
                      <span aria-hidden="true" className="switch-thumb" />
                    </Switch>
                    <span className="text-right text-xs font-normal leading-tight text-gray-600">{`词条释义已${
                      state?.isTransVisible ? '开启' : '关闭'
                    }`}</span>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
