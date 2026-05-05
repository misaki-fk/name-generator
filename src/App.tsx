  import { generateName } from './generator'
  import { useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'

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
      <div className="relative min-h-screen bg-gradient-to-b from-white via-sky-50 to-sky-100 text-gray-800 flex flex-col items-center py-16 px-4 overflow-hidden">

        {/* 背景の雲 */}
        {[
          { top: '5%',  left: '-5%',  w: 320, delay: 0 },
          { top: '12%', left: '60%',  w: 260, delay: 1 },
          { top: '35%', left: '-8%',  w: 200, delay: 2 },
          { top: '55%', left: '70%',  w: 280, delay: 0.5 },
          { top: '75%', left: '10%',  w: 240, delay: 1.5 },
          { top: '85%', left: '55%',  w: 300, delay: 1 },
        ].map((cloud, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-200 opacity-70 blur-3xl pointer-events-none"
            style={{ top: cloud.top, left: cloud.left, width: cloud.w, height: cloud.w * 0.5 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: cloud.delay, ease: 'easeInOut' }}
          />
        ))}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent tracking-widest"
          style={{ fontFamily: "'Zen Antique', serif", filter: 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.7))' }}>
          名前を授ける
        </motion.h1>
        <div className="text-sky-400 mb-2">あなたに"もう一つの名前"を。</div>

        <div className="text-gray-400 text-sm mb-8">好きなものや自分の特徴を入力してください</div>
        <div className="flex flex-col md:flex-row gap-3 w-full max-w-lg px-4">
          {keywords.map((kw, i) => (
            <input
              key={i}
              value={kw}
              onChange={(e) => handleKeyword(i, e.target.value)}
              placeholder={`キーワード${i + 1}`}
              className="w-full bg-white border border-sky-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-300 text-center"
            />
          ))}
        </div>
        <div className="text-gray-400 text-xs mt-2 mb-8">※ キーワード1は必須、2・3は任意です</div>

        <div className="text-gray-400 text-sm mb-6">好きなもモードを選んでください</div>

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
        
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl text-yellow-400 mb-3"
        >
          ⇩
        </motion.div>

        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 text-indigo-950 px-10 py-3 rounded-full font-bold text-lg transition-colors mb-10 shadow-lg shadow-yellow-400/30"
        >
          授ける
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center"
              onClick={() => setResult(null)}
            >
              <motion.div
                key={result.name}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative bg-white rounded-3xl px-8 md:px-12 py-10 text-center w-full max-w-sm mx-4"
                style={{ boxShadow: '0 0 40px rgba(253, 224, 71, 0.5)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setResult(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 text-lg"
                >
                  ✕
                </button>
                <div
                  className="text-4xl bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-12 mt-10"
                  style={{ fontFamily: "'Zen Antique', serif", filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))' }}
                >
                  {result.name}
                </div>
                <div className="text-gray-400 text-sm mb-6">{result.reason}</div>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`私の新しい名前は「${result.name}」\n#名前を授ける\nhttps://name-generator-iota-wine.vercel.app`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Xでシェア
                  </a>
                  <button
                    onClick={handleGenerate}
                    className="text-sky-400 text-sm hover:text-sky-500 transition-colors"
                  >
                    もう一度名前をもらう
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  export default App