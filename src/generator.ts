function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateName(
  keywords: string[],
  mode: string
): { name: string; reason: string } | null {
  const filled = keywords.filter((k) => k.trim() !== '')
  if (filled.length === 0 || mode === '') return null
  const shuffled = [...filled].sort(() => Math.random() - 0.5)
  const count = Math.floor(Math.random() * filled.length) + 1
  const main = shuffled.slice(0, count).join('')
  const short = main.slice(0, 2)

  switch (mode) {
    case 'かわいい': {
      const pattern = pick([
        () => main + pick(['ぴ', 'ちゃん', 'たん', 'っち']),
        () => short + short,
        () => pick(['ゆめ', 'ふわ', 'ぽわ', 'きら']) + main + 'ちゃん',
      ])
      const name = pattern()
      return {
        name,
        reason: `「${main}」にかわいい魔法をかけました`,
      }
    }
    case '厨二': {
      const pattern = pick([
        () => pick(['闇', '漆黒の', 'ダーク', '闇に堕ちた']) + main + pick(['ナイト', 'X', 'ソウル', '・ダーク']),
        () => pick(['黒炎ノ', '蒼月ノ', '紅牙ノ', '虚無ノ']) + main,
        () => short + pick(['使い', '支配者', 'の末裔', '=ZERO', '・ダークネス']),
      ])
      const name = pattern()
      return {
        name,
        reason: `「${main}」に厨二の闇エネルギーを注入しました`,
      }
    }
    case 'ギャル': {
      const pattern = pick([
        () => main + pick(['ぽよ', 'みん', 'たそ']),
        () => short + pick(['ちゃん', 'っち']),
        () => short + pick(['ちゃみ', 'めろ', 'ぽよ', 'みん']),
      ])
      const name = pattern()
      return {
        name,
        reason: `「${main}」をギャル語でかわいく授けました`,
      }
    }
    case 'ビジネス': {
      const core = filled.slice(0, 2).join('・')
      const pattern = pick([
        () => core + pick(['エバンジェリスト', '戦略担当', 'スペシャリスト', 'ソリューションアーキテクト']),
        () => pick(['シニア', 'チーフ', 'リード', 'エグゼクティブ']) + core + pick(['マネージャー', 'ディレクター', 'オフィサー']),
        () => core + pick(['推進室長', 'DX担当', 'グロースハッカー', 'アドバイザー']),
      ])
      const name = pattern()
      return {
        name,
        reason: `「${core}」にそれっぽい肩書きを授けました`,
      }
    }
    case 'アイドルオタク': {
      const pattern = pick([
        () => main + pick(['推し', '担', 'しか勝たん', 'が全て']),
        () => pick(['尊い', '神', '永遠に']) + main,
        () => main + pick(['ペン', 'オタ', 'のヲタ']) + 'の民',
      ])
      const name = pattern()
      return {
        name,
        reason: `「${main}」への愛を名前に込めました`,
      }
    }
    default:
      return null
  }
}
