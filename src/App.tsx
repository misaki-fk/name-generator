  import { generateName } from './generator'
  import { useState } from 'react'

  const MODES = ['かわいい', '厨二', 'ギャル', 'ビジネス', 'アイドルオタク']
  function App() {
    const [keywords, setKeywords] = useState(['', '', ''])
    const [mode, setMode] = useState('')
    const [result, setResult] = useState<string | null>(null)

    function handleKeyword(index: number, value: string) {

      const next = [...keywords]
      next[index] = value

      setKeywords(next)
    }

    function handleGenerate() {
      const name = generateName(keywords, mode)
      setResult(name ? name.name : null)
    }

    return (
      <div>
        <h1>名前を授ける</h1>
    
        <input value={keywords[0]} onChange={(e) => handleKeyword(0, e.target.value)} placeholder="キーワード1" />
        <input value={keywords[1]} onChange={(e) => handleKeyword(1, e.target.value)} placeholder="キーワード2" />
        <input value={keywords[2]} onChange={(e) => handleKeyword(2, e.target.value)} placeholder="キーワード3" />
    
        <p>入力中: {keywords.join(', ')}</p>
    
        <div>
          {MODES.map((m) => (
            <button key={m} onClick={() => setMode(m)}>
              {m}
            </button>
          ))}
        </div>
        <p>選択中: {mode}</p>

        <button onClick={handleGenerate}>授ける</button>
        <p>{result}</p> 
      </div>
    )
  }

  export default App