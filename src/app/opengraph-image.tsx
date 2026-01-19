import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'X&O Clash - The Ultimate Tic-Tac-Toe App';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #FF5500, #FFaa00)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span>X</span>
          <span style={{ margin: '0 20px', color: '#FFF' }}>&</span>
          <span>O</span>
        </div>
        <div style={{ fontSize: 64, marginTop: 20, fontWeight: 'normal' }}>
          CLASH
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
