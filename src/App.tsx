  import { generateName } from './generator'
  import { useState } from 'react'

  const MODES = ['かわいい', '厨二', 'ギャル', 'ビジネス', 'アイドルオタク']

  const MODE_COLORS: Record<string, { selected: string; unselected: string }> = {
    'かわいい':       { selected: 'bg-pink-400 border-pink-400 text-white',       unselected: 'border-pink-300 text-pink-400 hover:border-pink-400' },
    '厨二':           { selected: 'bg-gray-900 border-gray-900 text-white',       unselected: 'border-gray-400 text-gray-600 hover:border-gray-900' },
    'ギャル':         { selected: 'bg-fuchsia-500 border-fuchsia-500 text-white', unselected: 'border-fuchsia-300 text-fuchsia-500 hover:border-fuchsia-500' },
    'ビジネス':       { selected: 'bg-blue-800 border-blue-800 text-white',        unselected: 'border-blue-300 text-blue-800 hover:border-blue-800' },
    'アイドルオタク': { selected: 'bg-teal-500 border-teal-500 text-white',        unselected: 'border-teal-300 text-teal-500 hover:border-teal-500' },
  }

  function App() {
    const [keywords, setKeywords] = useState(['', '', ''])
    const [mode, setMode] = useState('')
    const [result, setResult] = useState<{ name: string; reason: string } | null>(null)

    function handleKeyword(index: number, value: string) {
      const next = [...keywords]
      next[index] = value
      setKeywords(next)
    }

    function handleGenerate() {
      const name = generateName(keywords, mode)
      setResult(name)
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-100 text-gray-800 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-2">名前を授ける</h1>
        <p className="text-gray-400 mb-10">あなたに"もう一つの名前"を。</p>

        <div className="text-gray-500 text-sm mb-6">好きなものや自分の特徴を入力してください</div>
      <div className="flex gap-3 mb-8">
          {keywords.map((kw, i) => (
            <input
              key={i}
              value={kw}
              onChange={(e) => handleKeyword(i, e.target.value)}
              placeholder={i === 0 ? 'キーワード（必須）' : `キーワード${i + 1}（任意）`}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-400"
            />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                mode === m
                  ? MODE_COLORS[m].selected
                  : MODE_COLORS[m].unselected
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="bg-sky-400 hover:bg-sky-300 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors mb-10"
        >
          授ける
        </button>

        {result && (
          <div className="bg-white border border-sky-300 rounded-2xl px-8 py-6 text-center max-w-sm shadow-sm">
            <p className="text-2xl font-bold text-sky-500 mb-3">{result.name}</p>
            <p className="text-gray-400 text-sm">{result.reason}</p>
          </div>
        )}
      </div>
    )
  }

  export default App