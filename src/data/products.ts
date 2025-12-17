import { Coffee } from '../components/CoffeeCard';

// Placeholder pour les images (remplacez par de vraies images plus tard)
const coffeeImagePlaceholder = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' };

// Catégories disponibles
export type Category = 'coffee' | 'crepe' | 'omelette' | 'boisson';

// Liste des produits avec leurs images et catégories
export const products: Coffee[] = [
  {
    id: '1',
    name: 'Direct',
    price: 5000,
    image: require('../../assets/direct.jpg'),
    rating: 4.8,
    category: 'coffee',
  },
  {
    id: '2',
    name: 'Latte',
    price: 7000,
    image: require('../../assets/lattee.jpg'),
    rating: 4.6,
    category: 'coffee',
  },
  {
    id: '3',
    name: 'Espresso',
    price: 2500,
    image: require('../../assets/express.jpg'),
    rating: 4.7,
    category: 'coffee',
  },
  {
    id: '4',
    name: 'Iced coffee',
    price: 8000,
    image: require('../../assets/icedcoffee.jpg'),
    rating: 4.5,
    category: 'coffee',
  },
  {
    id: '5',
    name: 'Chocolat chaud',
    price: 5500,
    image: require('../../assets/chocolat.jpg'),
    rating: 4.9,
    category: 'coffee',
  },
  // Produits Crêpes - Ajoutez vos images dans assets/
  {
    id: '6',
    name: 'Crêpe au Nutella',
    price: 12000,
    image: require('../../assets/crepec.jpg'),
    rating: 4.8,
    category: 'crepe',
  },
  {
    id: '7',
    name: 'Crêpe Bananes',
    price: 10000,
    image: require('../../assets/crepeb.jpg'),
    rating: 4.6,
    category: 'crepe',
  },
  {
    id: '8',
    name: 'Crêpe Fruits rouges',
    price: 11000,
    image: require('../../assets/crepefr.jpg'),
    rating: 4.7,
    category: 'crepe',
  },
  {
    id: '9',
    name: 'Crêpe Faires',
    price: 11000,
    image: require('../../assets/crepef.jpg'),
    rating: 4.7,
    category: 'crepe',
  },
  // Produits Omelettes - Ajoutez vos images dans assets/
  {
    id: '10',
    name: 'Omelette Nature',
    price: 8000,
    image: require('../../assets/oml.jpg'),
    rating: 4.5,
    category: 'omelette',
  },
  {
    id: '11',
    name: 'Omelette Thailandaise',
    price: 12000,
    image: require('../../assets/omlt.jpg'),
    rating: 4.7,
    category: 'omelette',
  },
  {
    id: '12',
    name: 'Omelette aux Epinards',
    price: 10000,
    image: require('../../assets/omle.jpg'),
    rating: 4.6,
    category: 'omelette',
  },
  {
    id: '13',
    name: 'Omelette Occidentale',
    price: 15000,
    image: require('../../assets/omlv.jpg'),
    rating: 4.6,
    category: 'omelette',
  },
  // Produits boisson 
  {
    id: '14',
    name: 'Eau 1.5L',
    price: 2500,
    image: require('../../assets/eau.jpg'),
    rating: 4.5,
    category: 'boisson',
  },
  {
    id: '15',
    name: 'Viva',
    price: 3000,
    image: require('../../assets/viva.jpg'),
    rating: 4.7,
    category: 'boisson',
  },
  {
    id: '16',
    name: 'Shark',
    price: 10000,
    image: require('../../assets/shark.jpg'),
    rating: 4.6,
    category: 'boisson',
  },
  {
    id: '17',
    name: 'Eau Gazéifiée',
    price: 15000,
    image: require('../../assets/gaz.png'),
    rating: 3.5,
    category: 'boisson',
  },
];

// Fonction pour ajouter un nouveau produit
export const addProduct = (product: Coffee) => {
  products.push(product);
};

// Fonction pour obtenir un produit par ID
export const getProductById = (id: string): Coffee | undefined => {
  return products.find(p => p.id === id);
};

// Fonction pour obtenir tous les produits
export const getAllProducts = (): Coffee[] => {
  return products;
};

// Fonction pour obtenir les produits par catégorie
export const getProductsByCategory = (category: Category): Coffee[] => {
  return products.filter(p => p.category === category);
};

// Fonction pour obtenir toutes les catégories
export const getAllCategories = (): Category[] => {
  return ['coffee', 'crepe', 'omelette', 'boisson'];
};

