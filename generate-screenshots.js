const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Generate main screenshot
function generateScreenshot(filename, width, height, title, description) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add title
  ctx.fillStyle = '#00d4ff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw Irys logo (simplified)
  const centerX = width / 2;
  const centerY = height / 3;
  const logoSize = Math.min(width, height) * 0.2;
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, logoSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw 'I' in the center
  ctx.fillStyle = '#1a1a2e';
  const iWidth = logoSize * 0.5;
  const iHeight = logoSize * 1.2;
  ctx.fillRect(centerX - iWidth/2, centerY - iHeight/2, iWidth, iHeight);
  
  // Add title text
  ctx.fillStyle = '#fff';
  const titleFontSize = Math.min(width, height) * 0.08;
  ctx.font = `bold ${titleFontSize}px 'Arial'`;
  ctx.fillText(title, centerX, centerY + logoSize * 2);
  
  // Add description
  ctx.fillStyle = '#b3e5fc';
  const descFontSize = Math.min(width, height) * 0.04;
  ctx.font = `${descFontSize}px 'Arial'`;
  
  // Split description into multiple lines if needed
  const words = description.split(' ');
  let line = '';
  const lines = [];
  const maxWidth = width * 0.8;
  
  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && line.length > 0) {
      lines.push(line);
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  
  // Draw each line of the description
  const lineHeight = descFontSize * 1.5;
  let y = centerY + logoSize * 2.5;
  
  for (const line of lines) {
    ctx.fillText(line, centerX, y);
    y += lineHeight;
  }
  
  // Save the screenshot
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(screenshotsDir, filename), buffer);
}

// Generate multiple screenshots
generateScreenshot(
  'screenshot1.png', 
  1280, 
  800, 
  'IRYS TOWN', 
  'Explore, Learn, and Build on Irys!'
);

generateScreenshot(
  'screenshot2.png', 
  1280, 
  800, 
  'Level Complete!', 
  'You\'ve unlocked the next level. Keep going!'
);

console.log('Screenshots generated successfully!');
