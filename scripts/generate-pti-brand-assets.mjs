import fs from 'node:fs/promises';
import sharp from 'sharp';
const palette='gold-website-blue';
if(process.argv.length>2) throw new Error('This candidate has one reviewed palette; no palette argument is accepted.');
const folder='public/lovable-uploads/pti-continuity';
const mark=await fs.readFile(`${folder}/pti-mark-${palette}.svg`);
const iconBuffers=[];
for(const size of [16,32,48,180,192,256,512]){
  const scaled=await sharp(mark,{density:600}).resize({width:Math.round(size*.78)}).png().toBuffer();
  const png=await sharp({create:{width:size,height:size,channels:4,background:'#FFFFFF'}}).composite([{input:scaled,gravity:'centre'}]).png().toBuffer();
  if(size!==48) await fs.writeFile(`public/favicon-${size}.png`,png);
  if(size===180) await fs.writeFile('public/apple-touch-icon.png',png);
  if(size<=48) iconBuffers.push({size,png});
}
const hdr=Buffer.alloc(6+16*iconBuffers.length);hdr.writeUInt16LE(1,2);hdr.writeUInt16LE(iconBuffers.length,4);let offset=hdr.length;
iconBuffers.forEach(({size,png},i)=>{const p=6+16*i;hdr[p]=size;hdr[p+1]=size;hdr.writeUInt16LE(1,p+4);hdr.writeUInt16LE(32,p+6);hdr.writeUInt32LE(png.length,p+8);hdr.writeUInt32LE(offset,p+12);offset+=png.length;});
await fs.writeFile('public/favicon.ico',Buffer.concat([hdr,...iconBuffers.map(x=>x.png)]));
const stacked=await fs.readFile(`${folder}/pti-stacked-${palette}.svg`);
await sharp(stacked,{density:600}).resize({width:1200,height:1153,fit:'contain',background:'#FFFFFF'}).png().toFile(`${folder}/pti-stacked-${palette}.png`);
const ogLogo=await sharp(stacked,{density:600}).resize({width:390,height:390,fit:'inside'}).png().toBuffer();
await sharp({create:{width:1200,height:630,channels:4,background:'#FFFFFF'}}).composite([{input:ogLogo,gravity:'centre'}]).png().toFile('public/opengraph.png');
console.log(`Generated ${palette} web icons, structured logo and open graph image.`);
