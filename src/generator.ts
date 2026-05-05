export function generateName(
  keywords: string[],
  mode: string
): { name: string; reason: string } | null {
  const filled = keywords.filter((k) => k.trim() !== '')
  if (filled.length === 0 || mode === '') return null
  const shuffled = [...filled].sort(() => Math.random() - 0.5)
  const count = filled.length > 1 && Math.random() > 0.5 ? 2 : 1
  const main = shuffled.slice(0, count).join('')
  const suffixes = ['ぴ', 'ちゃん', 'たん', 'っち']
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  switch (mode) {
    case 'かわいい':{
      return {
        name: main + suffix,
        reason: `「${main}」にかわいい語感の「${suffix}」を授けました`,
      }
    }
    case '厨二':{
      const dark = ['闇', '漆黒の', 'ダーク', '闇に堕ちた'] [Math.floor(Math.random() * 4)]
      const suffix = ['ナイト', 'X', 'ソウル', '・ダーク'] [Math.floor(Math.random() * 4)]
      return {
        name: dark + main + suffix,
        reason: `「${main}」に厨二成分「${dark}」と「${suffix}」を授けました`,
      }
    }
    case 'ギャル': {
      const pattern = [
        `${main}ぽよ`,
        `${main}みん`,
        `${main}たそ`,
        `${main.slice(0, 2)}ちゃん`,
        `${main.slice(0, 2)}っち`,
      ]
      const name = pattern[Math.floor(Math.random() * pattern.length)]
      return {
        name,
        reason: `「${main}」をギャル語でかわいく授けました`,
      }
    }
    case 'ビジネス':{
      const core = filled.slice(0, 2).join('・')
      const biz = ['エバンジェリスト', '戦略担当', 'スペシャリスト', 'ソリューションアーキテクト'][Math.floor(Math.random() * 4)]
      return {
        name: core + biz,
        reason: `「${core}」にそれっぽい肩書き「${biz}」を授けました`,
      }
    }
    case 'アイドルオタク':{
      const pattern = [ `${main}推し`, `${main}担`, `尊い${main}`, `${main}しか勝たん`]
      const name = pattern[Math.floor(Math.random() * pattern.length)]
      return {
        name: name,
        reason: `「${main}」への愛を名前に込めました`,
      }
    }
    default:
      return null
  }
}
