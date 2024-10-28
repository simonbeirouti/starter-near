import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const nftBasePath = path.join(process.cwd(), 'public', 'nft');
  
  try {
    const layerFolders = fs.readdirSync(nftBasePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({
        name: dirent.name,
        images: fs.readdirSync(path.join(nftBasePath, dirent.name))
          .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
          .map(file => `/nft/${dirent.name}/${file}`)
      }));

    return NextResponse.json(layerFolders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read NFT layers' }, { status: 500 });
  }
}