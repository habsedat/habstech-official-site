/**
 * HABS TECHNOLOGIES GROUP
 * Setup Default Images Script
 */

const { writeFile, mkdir } = require('fs/promises');
const { join } = require('path');

// Create a simple placeholder image as base64
const createPlaceholderImage = (width, height, color = '#6c63ff', text = 'HABS') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" 
            font-weight="bold" fill="white" text-anchor="middle" 
            dominant-baseline="middle">${text}</text>
    </svg>
  `;
  return Buffer.from(svg);
};

async function setupDefaultImages() {
  try {
    console.log('Setting up default images...');

    // Create directories
    const categories = ['hero', 'services', 'general', 'team'];
    
    for (const category of categories) {
      const dir = join(process.cwd(), 'public', 'images', category);
      await mkdir(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }

    // Create placeholder images
    const images = [
      { category: 'hero', name: 'hero-placeholder.svg', width: 1920, height: 1080, color: '#1e293b', text: 'HERO' },
      { category: 'services', name: 'service-ai.svg', width: 400, height: 300, color: '#6c63ff', text: 'AI' },
      { category: 'services', name: 'service-web.svg', width: 400, height: 300, color: '#10b981', text: 'WEB' },
      { category: 'services', name: 'service-creative.svg', width: 400, height: 300, color: '#f59e0b', text: 'CREATIVE' },
      { category: 'general', name: 'default-avatar.svg', width: 200, height: 200, color: '#64748b', text: 'AVATAR' },
    ];

    for (const image of images) {
      const filePath = join(process.cwd(), 'public', 'images', image.category, image.name);
      const imageData = createPlaceholderImage(image.width, image.height, image.color, image.text);
      await writeFile(filePath, imageData);
      console.log(`Created image: ${filePath}`);
    }

    console.log('Default images setup complete!');
  } catch (error) {
    console.error('Error setting up default images:', error);
  }
}

setupDefaultImages();
