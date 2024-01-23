import { CHAPTER_LENGTH } from '@/constants'
import { currentChapterAtom, currentDictInfoAtom, reviewModeInfoAtom } from '@/store'
import type { Word, WordWithIndex } from '@/typings/index'
import { wordListFetcher } from '@/utils/wordListFetcher'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'

export type UseWordListResult = {
  words: WordWithIndex[]
  isLoading: boolean
  error: Error | undefined
}

/**
 * Use word lists from the current selected dictionary.
 */
export function useWordList(): UseWordListResult {
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)
  const { isReviewMode, reviewRecord } = useAtomValue(reviewModeInfoAtom)

  // Reset current chapter to 0, when currentChapter is greater than chapterCount.
  if (currentChapter >= currentDictInfo.chapterCount) {
    setCurrentChapter(0)
  }

  const isFirstChapter = !isReviewMode && currentDictInfo.id === 'ShanRenMaLTS001' && currentChapter === 0
  const { data: wordList, error, isLoading } = useSWR(currentDictInfo.url, wordListFetcher)

  const words: WordWithIndex[] = useMemo(() => {
    let newWords: Word[]
    if (isFirstChapter) {
      newWords = firstChapter
    } else if (isReviewMode) {
      newWords = reviewRecord?.words ?? []
    } else if (wordList && 'chapterId' in wordList[0]) {
      newWords = []
      for (const word of wordList) {
        if ('chapterId' in word && word.chapterId === currentChapter) {
          newWords.push(word)
        }
      }
    } else if (wordList) {
      newWords = wordList.slice(currentChapter * CHAPTER_LENGTH, (currentChapter + 1) * CHAPTER_LENGTH)
    } else {
      newWords = []
    }

    // 记录原始 index, 并对 word.trans 做兜底处理
    return newWords.map((word, index) => {
      let trans: string[]
      if (Array.isArray(word.trans)) {
        trans = word.trans.filter((item) => typeof item === 'string')
      } else if (word.trans === null || word.trans === undefined || typeof word.trans === 'object') {
        trans = []
      } else {
        trans = [String(word.trans)]
      }
      return {
        ...word,
        index,
        trans,
      }
    })
  }, [isFirstChapter, isReviewMode, wordList, reviewRecord?.words, currentChapter])

  return { words, isLoading, error }
}

const firstChapter = [
  {
    name: 'Hi',
    trans: ['一', ' yī 1画 一部0001 数字；专一或单一。'],
    split: '一',
    notation: '一',
    pronunciation: '一',
  },
  {
    name: 'Zyi',
    trans: ['乙', ' yǐ 1画 一部 0002 天干之一，常用来表示顺序或等级的 第二位。'],
    split: '乙',
    notation: '乙',
    pronunciation: '以',
  },
  {
    name: 'Ve',
    trans: ['二', ' èr 2画 一部 0003 数字；副的或次要的；不专一。'],
    split: '二',
    notation: '二',
    pronunciation: '二',
  },
  {
    name: 'Ci',
    trans: ['十', ' shí 2画 十部 0004 数字；指完满到了极点。'],
    split: '十',
    notation: '十',
    pronunciation: '时',
  },
  {
    name: 'Hd',
    trans: [
      '丁',
      ' dīng、zhēng 2画 一部 0005 ①dīng天干之一；成年男子；（肉、蔬 菜等切成的）小方块。②zhēng用于丁丁 zhēngzhēng，拟声词，模拟砍树、弹奏等的 声音。',
    ],
    split: '丁',
    notation: '丁',
    pronunciation: '丁',
  },
  {
    name: 'Tc',
    trans: [
      '厂',
      ' （廠） ān、chǎng 2画 厂部 0006 ①厂ān圆顶的草屋（多用于 人名）。②厂（廠）chǎng指工厂；指有宽 敞的地面，可以存货并进行贸易的场所。',
    ],
    split: '厂',
    notation: '厂',
    pronunciation: '厂',
  },
  {
    name: 'Hz',
    trans: ['七', ' qī 2画 一部 0007 数字；祭祀的名称。'],
    split: '七',
    notation: '七',
    pronunciation: '七',
  },
  {
    name: 'Qbu',
    trans: ['卜', ' （蔔） bo、bǔ 2画 卜部 0008①卜（蔔）bo用于萝卜luóbo， 草本植物，常见蔬菜。②卜bǔ预测吉凶； 推测。'],
    split: '卜',
    notation: '卜',
    pronunciation: '啵、补',
  },
  {
    name: 'Vb',
    trans: ['八', ' bā 2画 八部 0009 数字；表示多数或多次。'],
    split: '八',
    notation: '八',
    pronunciation: '八',
  },
  {
    name: 'Rn',
    trans: ['人', ' rén 2画 人部 0010 指由类人猿进化而来，能制造并使用 工具进行劳动的高等动物；指人手或人才。'],
    split: '人',
    notation: '人',
    pronunciation: '人',
  },
  {
    name: 'Ru',
    trans: ['入', ' rù 2画 人部 0011 进（跟“出”相对）；参加（某种组织 等）。'],
    split: '入',
    notation: '入',
    pronunciation: '入',
  },
  {
    name: 'Rer',
    trans: ['儿', ' （兒） ér 2画 儿部 0012 小孩儿；青年人（多指男青年）；词的后缀，合成儿化音节。'],
    split: '儿',
    notation: '儿',
    pronunciation: '而',
  },
  {
    name: 'Ubi',
    trans: ['匕', ' bǐ 2画 匕部 0013 用于匕首bǐshǒu，短剑之类的兵器。'],
    split: '匕',
    notation: '匕',
    pronunciation: '比',
  },
  {
    name: 'Pp',
    trans: ['几', ' （幾） jī、jǐ 2画 几部 0014 ①几jī矮小的桌子；副词，将近。②几（幾）jǐ询问数目；表示二到九之间的不定的数目。'],
    split: '几',
    notation: '几',
    pronunciation: '机、己',
  },
  {
    name: 'Pj',
    trans: ['九', ' jiǔ 2画 ／部 0015数字；表示多数或多次；时令名。'],
    split: '九',
    notation: '九',
    pronunciation: '九',
  },
  {
    name: 'ZHiv',
    trans: ['刁', ' diāo 2画 一部 0016 奸猾；奸诈。'],
    split: '㇀',
    notation: '刁',
    pronunciation: '雕',
  },
  {
    name: 'Le',
    trans: [
      '了',
      ' （瞭） le、liǎo 2画 一部0017 ①了le助词，用在动词或形容词后，表示动作或变化已经完成。②了（瞭）liǎo完结；很清楚地知道。也作姓氏。【提示】“瞭”读 liào时，不简化作“了”，如“瞭望”“瞭哨”，参见129页“瞭”。',
    ],
    split: '了',
    notation: '了',
    pronunciation: '了、蓼',
  },
  {
    name: 'Jd',
    trans: ['刀', ' dāo 2画 刀部 0018 古代兵器；泛指切、割、削、刺的工具。'],
    split: '刀',
    notation: '刀',
    pronunciation: '刀',
  },
  {
    name: 'Fi',
    trans: ['力', ' lì 2画 力部 0019  力气。'],
    split: '力',
    notation: '力',
    pronunciation: '力',
  },
  {
    name: 'Zn',
    trans: ['乃', ' ［廼迺］ nǎi 2画 一部 0020你、你的；副词，表示肯定。【提示】“迺”可用于姓氏人名、地名，参见242页“迺”。'],
    split: '乃',
    notation: '乃',
    pronunciation: '乃',
  },
]
