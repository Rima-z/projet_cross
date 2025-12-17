# Comment ajouter des produits avec des photos

## 📸 Étape 1 : Ajouter les images

1. Place tes images de produits dans le dossier `assets/`
2. Nomme-les de manière cohérente, par exemple :
   - `coffee-1.png`
   - `coffee-2.png`
   - `coffee-3.png`
   - etc.

**Format recommandé :**
- Format : PNG ou JPG
- Taille : 300x300 pixels minimum (carré)
- Poids : < 500 KB par image

## 📝 Étape 2 : Ajouter le produit dans le code

Ouvre le fichier `src/data/products.ts` et ajoute ton produit :

```typescript
{
  id: '7', // ID unique (incrémente le numéro)
  name: 'Nom du produit', // Ex: 'Cappuccino', 'Latte', etc.
  price: 50000, // Prix en centimes (50000 = 500.00 DT)
  image: require('../../assets/coffee-7.png'), // Chemin vers ton image
  rating: 4.8, // Note sur 5 (ex: 4.8)
},
```

**Exemple complet :**

```typescript
export const products: Coffee[] = [
  // ... produits existants ...
  {
    id: '7',
    name: 'Cappuccino Deluxe',
    price: 60000,
    image: require('../../assets/coffee-7.png'),
    rating: 4.9,
  },
  {
    id: '8',
    name: 'Caramel Macchiato',
    price: 55000,
    image: require('../../assets/coffee-8.png'),
    rating: 4.7,
  },
];
```

## ✅ Étape 3 : Vérifier

1. Sauvegarde le fichier `products.ts`
2. Recharge l'application (appuie sur `R` deux fois dans l'émulateur)
3. Ton nouveau produit devrait apparaître dans la liste !

## 💡 Conseils

- **ID unique** : Chaque produit doit avoir un ID différent
- **Nom des images** : Utilise des noms cohérents (coffee-1, coffee-2, etc.)
- **Prix** : Utilise des nombres entiers (50000 = 500.00 DT)
- **Rating** : Entre 0 et 5 (ex: 4.8)

## 🎨 Où trouver des images de café ?

Tu peux utiliser :
- Tes propres photos
- Des images libres de droits (Unsplash, Pexels)
- Des icônes de café

**Important :** Assure-toi d'avoir les droits d'utilisation des images !

