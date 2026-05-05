import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') ?? '名前を授ける'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #ffffff, #e0f2fe)',
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: '#94a3b8',
            marginBottom: 24,
          }}
        >
          名前を授ける
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#f59e0b',
            marginBottom: 16,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#7dd3fc',
          }}
        >
          あなたに"もう一つの名前"を。
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
