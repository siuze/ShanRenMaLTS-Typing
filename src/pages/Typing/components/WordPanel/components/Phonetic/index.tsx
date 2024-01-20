import { isTextSelectableAtom, phoneticConfigAtom, wordDictationConfigAtom } from '@/store'
import type { Word, WordWithIndex } from '@/typings'
import { useAtomValue } from 'jotai'

export type PhoneticProps = {
  word: WordWithIndex | Word
}

function Phonetic({ word }: PhoneticProps) {
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const wordDictationConfig = useAtomValue(wordDictationConfigAtom)
  return (
    <div
      className={`space-x-5 text-center text-sm font-normal text-gray-600 transition-colors duration-300 dark:text-gray-400 ${
        isTextSelectable && 'select-text'
      }`}
    >
      {phoneticConfig.type === 'us' && word.usphone && word.usphone.length > 1 && <span>{`AmE: [${word.usphone}]`}</span>}
      {phoneticConfig.type === 'uk' && word.ukphone && word.ukphone.length > 1 && <span>{`BrE: [${word.ukphone}]`}</span>}
      {(!wordDictationConfig.isOpen || (wordDictationConfig.type != 'hideSplit' && wordDictationConfig.type != 'hideAll')) &&
        phoneticConfig.type === 'zh' &&
        word.split &&
        word.split.length > 0 && <span>{`〔${word.split}〕`}</span>}
    </div>
  )
}

export default Phonetic
