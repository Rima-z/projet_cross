const fs = require('fs');
const path = require('path');

// Configuration des tailles nécessaires
const androidSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

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

console.log('📱 Génération des icônes pour React Native');
console.log('⚠️  Ce script copie appicon.png aux bons emplacements');
console.log('⚠️  Pour de meilleurs résultats, utilisez un outil comme:');
console.log('   - https://www.appicon.co/');
console.log('   - https://icon.kitchen/');
console.log('   - npm install -g app-icon');
console.log('\n💡 Pour un redimensionnement automatique, installez sharp:');
console.log('   npm install --save-dev sharp');
console.log('   puis modifiez ce script pour utiliser sharp\n');

const sourceIcon = path.join(__dirname, '..', 'assets', 'appicon.png');

if (!fs.existsSync(sourceIcon)) {
  console.error('❌ Erreur: appicon.png introuvable dans assets/');
  process.exit(1);
}

// Copier pour Android (vous devrez redimensionner manuellement ou utiliser sharp)
console.log('\n📦 Android:');
Object.entries(androidSizes).forEach(([folder, size]) => {
  const destDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', folder);
  const destFile = path.join(destDir, 'ic_launcher.png');
  const destRoundFile = path.join(destDir, 'ic_launcher_round.png');
  
  if (fs.existsSync(destDir)) {
    console.log(`   ${folder}: ic_launcher.png et ic_launcher_round.png (${size}x${size})`);
    console.log(`   ⚠️  Remplacez manuellement les fichiers dans ${folder}`);
  }
});

// Copier pour iOS (vous devrez redimensionner manuellement ou utiliser sharp)
console.log('\n🍎 iOS:');
const iosDestDir = path.join(__dirname, '..', 'ios', 'CoffeeShopApp', 'Images.xcassets', 'AppIcon.appiconset');
iosSizes.forEach(({ name, size }) => {
  console.log(`   ${name} (${size}x${size})`);
  console.log(`   ⚠️  Placez cette taille dans ${iosDestDir}`);
});

console.log('\n✅ Instructions:');
console.log('1. Utilisez un outil en ligne (appicon.co, icon.kitchen) avec appicon.png');
console.log('2. Ou installez sharp et utilisez le script amélioré');
console.log('3. Redimensionnez appicon.png aux tailles listées ci-dessus');
console.log('4. Copiez les fichiers aux emplacements Android et iOS indiqués');

