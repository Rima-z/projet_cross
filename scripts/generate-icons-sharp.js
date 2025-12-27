const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceIcon = path.join(__dirname, '..', 'assets', 'appicon.png');

// Tailles Android
const androidSizes = {
  'mipmap-mdpi': { icon: 48, round: 48 },
  'mipmap-hdpi': { icon: 72, round: 72 },
  'mipmap-xhdpi': { icon: 96, round: 96 },
  'mipmap-xxhdpi': { icon: 144, round: 144 },
  'mipmap-xxxhdpi': { icon: 192, round: 192 },
};

// Tailles iOS
const iosSizes = [
  { name: 'AppIcon-20x20@2x.png', size: 40 },
  { name: 'AppIcon-20x20@3x.png', size: 60 },
  { name: 'AppIcon-29x29@2x.png', size: 58 },
  { name: 'AppIcon-29x29@3x.png', size: 87 },
  { name: 'AppIcon-40x40@2x.png', size: 80 },
  { name: 'AppIcon-40x40@3x.png', size: 120 },
  { name: 'AppIcon-60x60@2x.png', size: 120 },
  { name: 'AppIcon-60x60@3x.png', size: 180 },
  { name: 'AppIcon-1024x1024.png', size: 1024 },
];

async function generateAndroidIcons() {
  console.log('📦 Génération des icônes Android...');
  
  for (const [folder, sizes] of Object.entries(androidSizes)) {
    const destDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', folder);
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Générer ic_launcher.png
    await sharp(sourceIcon)
      .resize(sizes.icon, sizes.icon, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(destDir, 'ic_launcher.png'));
    
    // Générer ic_launcher_round.png (même taille pour l'instant)
    await sharp(sourceIcon)
      .resize(sizes.round, sizes.round, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(destDir, 'ic_launcher_round.png'));
    
    console.log(`   ✅ ${folder}: ${sizes.icon}x${sizes.icon}`);
  }
}

async function generateIosIcons() {
  console.log('🍎 Génération des icônes iOS...');
  
  const iosDestDir = path.join(__dirname, '..', 'ios', 'CoffeeShopApp', 'Images.xcassets', 'AppIcon.appiconset');
  
  if (!fs.existsSync(iosDestDir)) {
    fs.mkdirSync(iosDestDir, { recursive: true });
  }
  
  for (const { name, size } of iosSizes) {
    await sharp(sourceIcon)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(iosDestDir, name));
    
    console.log(`   ✅ ${name}: ${size}x${size}`);
  }
  
  // Mettre à jour Contents.json
  const contentsJson = {
    images: [
      { idiom: 'iphone', scale: '2x', size: '20x20', filename: 'AppIcon-20x20@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '20x20', filename: 'AppIcon-20x20@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '29x29', filename: 'AppIcon-29x29@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '29x29', filename: 'AppIcon-29x29@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '40x40', filename: 'AppIcon-40x40@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '40x40', filename: 'AppIcon-40x40@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '60x60', filename: 'AppIcon-60x60@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '60x60', filename: 'AppIcon-60x60@3x.png' },
      { idiom: 'ios-marketing', scale: '1x', size: '1024x1024', filename: 'AppIcon-1024x1024.png' },
    ],
    info: {
      author: 'xcode',
      version: 1,
    },
  };
  
  fs.writeFileSync(
    path.join(iosDestDir, 'Contents.json'),
    JSON.stringify(contentsJson, null, 2)
  );
  
  console.log('   ✅ Contents.json mis à jour');
}

async function main() {
  if (!fs.existsSync(sourceIcon)) {
    console.error('❌ Erreur: appicon.png introuvable dans assets/');
    process.exit(1);
  }
  
  try {
    await generateAndroidIcons();
    await generateIosIcons();
    console.log('\n✅ Toutes les icônes ont été générées avec succès!');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Android: npm run android (ou rebuild depuis Android Studio)');
    console.log('2. iOS: Nettoyez le build dans Xcode (Product > Clean Build Folder) puis npm run ios');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.message.includes('sharp')) {
      console.error('\n💡 Solution: Installez sharp avec: npm install --save-dev sharp');
    }
    process.exit(1);
  }
}

main();

