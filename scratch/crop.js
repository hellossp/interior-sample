const fs = require('fs');
const JimpModule = require('jimp');
const Jimp = JimpModule.Jimp || JimpModule;

// Helper to find tight bounds of the dark button in a search area
function getTightBounds(img, startX, startY, searchW, searchH) {
  let minX = startX + searchW;
  let maxX = startX;
  let minY = startY + searchH;
  let maxY = startY;

  const w = img.bitmap.width;

  for (let y = startY; y < startY + searchH; y++) {
    for (let x = startX; x < startX + searchW; x++) {
      const idx = (y * w + x) * 4;
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx+1];
      const b = img.bitmap.data[idx+2];
      const a = img.bitmap.data[idx+3];
      
      // Check for opaque dark wood / gold button pixel
      if (r < 185 && g < 155 && b < 125 && a > 200) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // If no dark pixels found, fallback to search box
  if (minX > maxX) {
    console.log(`Warning: No opaque dark pixels found in search area starting at ${startX}, ${startY}`);
    return { x: startX, y: startY, width: searchW, height: searchH };
  }

  // Add padding for drop shadows / highlights
  const pad = 20;
  const x = Math.max(startX, minX - pad);
  const y = Math.max(startY, minY - pad);
  const width = Math.min(startX + searchW - x, (maxX - minX) + 2 * pad);
  const height = Math.min(startY + searchH - y, (maxY - minY) + 2 * pad);

  return { x, y, width, height };
}

async function main() {
  const srcPath = 's:/interior-sample/sample-interior/public/Untitled design (49).png';
  if (!fs.existsSync(srcPath)) {
    console.error("Source file not found at " + srcPath);
    process.exit(1);
  }

  console.log("Loading image (32MB, 8600x4800)...");
  const img = await Jimp.read(srcPath);
  console.log("Loaded image successfully.");

  // Updated coordinates for search ranges
  const targets = [
    {
      name: 'consultation-btn-preview.png',
      startX: 1000, startY: 1000, searchW: 6600, searchH: 2300,
      widthTarget: 400
    },
    {
      name: 'consultation-btn-idle.png',
      startX: 200, startY: 3400, searchW: 2800, searchH: 600,
      widthTarget: 300
    },
    {
      name: 'consultation-btn-hover.png',
      startX: 3000, startY: 3400, searchW: 2800, searchH: 600,
      widthTarget: 300
    },
    {
      name: 'consultation-btn-active.png',
      startX: 5800, startY: 3400, searchW: 2700, searchH: 600,
      widthTarget: 300
    }
  ];

  for (const t of targets) {
    console.log(`Locating tight bounds for: ${t.name}...`);
    const bounds = getTightBounds(img, t.startX, t.startY, t.searchW, t.searchH);
    console.log(`Bounds: X:${bounds.x}, Y:${bounds.y}, W:${bounds.width}, H:${bounds.height}`);

    let cropped;
    try {
      cropped = img.clone().crop({ x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
    } catch (e) {
      try {
        cropped = img.clone().crop({ x: bounds.x, y: bounds.y, w: bounds.width, h: bounds.height });
      } catch (ee) {
        cropped = img.clone().crop(bounds.x, bounds.y, bounds.width, bounds.height);
      }
    }

    console.log(`Resizing to web-optimized width: ${t.widthTarget}px...`);
    if (typeof cropped.resize === 'function') {
      try {
        cropped.resize({ w: t.widthTarget });
      } catch (e) {
        try {
          cropped.resize({ width: t.widthTarget });
        } catch (ee) {
          cropped.resize(t.widthTarget, Jimp.AUTO || -1);
        }
      }
    }

    const destPath = `s:/interior-sample/sample-interior/public/${t.name}`;
    console.log(`Saving to: ${destPath}`);
    if (typeof cropped.writeAsync === 'function') {
      await cropped.writeAsync(destPath);
    } else {
      await cropped.write(destPath);
    }
    console.log(`Saved ${t.name} successfully!`);
  }

  console.log("All button states cropped and optimized successfully!");
}

main().catch(console.error);
