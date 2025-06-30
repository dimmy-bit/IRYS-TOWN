const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate each icon size
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, size, size);
  
  // Draw Irys logo (simplified)
  ctx.fillStyle = '#00d4ff';
  const center = size / 2;
  const radius = size * 0.4;
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw 'I' in the center
  ctx.fillStyle = '#1a1a2e';
  const iWidth = size * 0.2;
  const iHeight = size * 0.5;
  ctx.fillRect(center - iWidth/2, center - iHeight/2, iWidth, iHeight);
  
  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
});

console.log('Icons generated successfully!');
