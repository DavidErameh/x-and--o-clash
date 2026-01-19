import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'X&O Clash - Play Tic-Tac-Toe on Whop';
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF5500',
          border: '20px solid #FF5500',
          fontFamily: 'sans-serif',
          fontWeight: 900,
        }}
      >
          X&O CLASH
      </div>
    ),
    {
      ...size,
    }
  );
}
