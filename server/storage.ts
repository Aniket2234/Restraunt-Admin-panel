// import { users, menuItems, cartItems, type User, type InsertUser, type MenuItem, type CartItem, type InsertCartItem } from "@shared/schema";

// export interface IStorage {
//   getUser(id: number): Promise<User | undefined>;
//   getUserByUsername(username: string): Promise<User | undefined>;
//   createUser(user: InsertUser): Promise<User>;
  
//   getMenuItems(): Promise<MenuItem[]>;
//   getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
//   getMenuItem(id: number): Promise<MenuItem | undefined>;
  
//   getCartItems(): Promise<CartItem[]>;
//   addToCart(item: InsertCartItem): Promise<CartItem>;
//   removeFromCart(id: number): Promise<void>;
//   clearCart(): Promise<void>;
// }

// export class MemStorage implements IStorage {
//   private users: Map<number, User>;
//   private menuItems: Map<number, MenuItem>;
//   private cartItems: Map<number, CartItem>;
//   private currentUserId: number;
//   private currentMenuItemId: number;
//   private currentCartItemId: number;

//   constructor() {
//     this.users = new Map();
//     this.menuItems = new Map();
//     this.cartItems = new Map();
//     this.currentUserId = 1;
//     this.currentMenuItemId = 1;
//     this.currentCartItemId = 1;
    
//     this.initializeMenuItems();
//   }

//   private initializeMenuItems() {
//     const items: Omit<MenuItem, 'id'>[] = [
//       // Starters
//       {
//         name: "Royal Tandoori Platter",
//         description: "Assorted tandoori vegetables with mint chutney and fresh naan",
//         price: 420,
//         category: "starters",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Maharaja Seekh Kebab",
//         description: "Succulent lamb seekh kebabs with royal spices and yogurt sauce",
//         price: 580,
//         category: "starters",
//         isVeg: false,
//         image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Royal Samosa Platter",
//         description: "Crispy samosas with spiced potato filling and tamarind chutney",
//         price: 240,
//         category: "starters",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       // Main Course
//       {
//         name: "Royal Paneer Makhani",
//         description: "Creamy paneer curry with royal spices and fresh cream",
//         price: 480,
//         category: "mains",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Maharaja Biryani",
//         description: "Aromatic basmati rice with tender mutton and royal spices",
//         price: 680,
//         category: "mains",
//         isVeg: false,
//         image: "https://images.unsplash.com/photo-1563379091369-5b8fb7e3c7c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Royal Butter Chicken",
//         description: "Creamy tomato-based chicken curry with rich butter flavor",
//         price: 520,
//         category: "mains",
//         isVeg: false,
//         image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       // Desserts
//       {
//         name: "Royal Gulab Jamun",
//         description: "Soft milk dumplings soaked in rose-cardamom syrup",
//         price: 180,
//         category: "desserts",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Maharaja Kulfi",
//         description: "Traditional frozen dessert with pistachios and cardamom",
//         price: 160,
//         category: "desserts",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       // Drinks
//       {
//         name: "Royal Mango Lassi",
//         description: "Creamy yogurt drink with fresh mango and cardamom",
//         price: 120,
//         category: "drinks",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Royal Masala Chai",
//         description: "Aromatic spiced tea with cardamom, cinnamon, and ginger",
//         price: 80,
//         category: "drinks",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       // Combos
//       {
//         name: "Royal Veg Thali",
//         description: "Complete vegetarian meal with dal, sabzi, rice, roti, and dessert",
//         price: 380,
//         category: "combos",
//         isVeg: true,
//         image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       },
//       {
//         name: "Maharaja Non-Veg Thali",
//         description: "Complete non-vegetarian feast with chicken, mutton, rice, naan, and dessert",
//         price: 650,
//         category: "combos",
//         isVeg: false,
//         image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
//       }
//     ];

//     items.forEach(item => {
//       const menuItem: MenuItem = { ...item, id: this.currentMenuItemId++ };
//       this.menuItems.set(menuItem.id, menuItem);
//     });
//   }

//   async getUser(id: number): Promise<User | undefined> {
//     return this.users.get(id);
//   }

//   async getUserByUsername(username: string): Promise<User | undefined> {
//     return Array.from(this.users.values()).find(
//       (user) => user.username === username,
//     );
//   }

//   async createUser(insertUser: InsertUser): Promise<User> {
//     const id = this.currentUserId++;
//     const user: User = { ...insertUser, id };
//     this.users.set(id, user);
//     return user;
//   }

//   async getMenuItems(): Promise<MenuItem[]> {
//     return Array.from(this.menuItems.values());
//   }

//   async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
//     return Array.from(this.menuItems.values()).filter(item => item.category === category);
//   }

//   async getMenuItem(id: number): Promise<MenuItem | undefined> {
//     return this.menuItems.get(id);
//   }

//   async getCartItems(): Promise<CartItem[]> {
//     return Array.from(this.cartItems.values());
//   }

//   async addToCart(item: InsertCartItem): Promise<CartItem> {
//     const existing = Array.from(this.cartItems.values()).find(
//       cartItem => cartItem.menuItemId === item.menuItemId
//     );

//     if (existing) {
//       existing.quantity += item.quantity || 1;
//       this.cartItems.set(existing.id, existing);
//       return existing;
//     }

//     const cartItem: CartItem = { ...item, quantity: item.quantity || 1, id: this.currentCartItemId++ };
//     this.cartItems.set(cartItem.id, cartItem);
//     return cartItem;
//   }

//   async removeFromCart(id: number): Promise<void> {
//     this.cartItems.delete(id);
//   }

//   async clearCart(): Promise<void> {
//     this.cartItems.clear();
//   }
// }

// export const storage = new MemStorage();
import mongoose from 'mongoose';

// Dynamic MongoDB connections for restaurant-specific databases
const connectionPool = new Map<string, mongoose.Connection>();

export async function connectToRestaurantDatabase(mongoUri: string): Promise<mongoose.Connection> {
  // If connection already exists, return it
  if (connectionPool.has(mongoUri)) {
    const existingConnection = connectionPool.get(mongoUri);
    if (existingConnection && existingConnection.readyState === 1) {
      return existingConnection;
    }
    // Remove stale connection
    connectionPool.delete(mongoUri);
  }

  try {
    console.log(`🔗 Original URI: ${mongoUri.replace(/:[^:]*@/, ':***@')}`);
    
    // Extract database name using the pattern: cluster name = database name (lowercase)
    let databaseName = null;
    
    // Extract cluster name from the URI (e.g., mingsdb from @mingsdb.mmjpnwc.mongodb.net)
    const clusterMatch = mongoUri.match(/@([^.]+)\./);
    if (clusterMatch && clusterMatch[1]) {
      databaseName = clusterMatch[1].toLowerCase(); // Always lowercase as per your tip
      console.log(`📊 Database name extracted from cluster: ${databaseName}`);
    }
    
    // Fallback: Extract from appName parameter and convert to lowercase
    if (!databaseName) {
      const appNameMatch = mongoUri.match(/appName=([^&]+)/);
      if (appNameMatch && appNameMatch[1]) {
        databaseName = appNameMatch[1].toLowerCase();
        console.log(`📊 Database name from appName (lowercase): ${databaseName}`);
      }
    }
    
    // Final fallback
    if (!databaseName) {
      databaseName = 'restaurant';
      console.log(`⚠️ Using fallback database name: ${databaseName}`);
    }
    
    // Create the final URI with database name
    let finalUri = mongoUri;
    if (!mongoUri.includes('/', mongoUri.lastIndexOf('@') + 1) || mongoUri.includes('/?')) {
      // Add database name to URI
      finalUri = mongoUri.replace('?', `/${databaseName}?`);
      console.log(`🔧 Modified URI: ${finalUri.replace(/:[^:]*@/, ':***@')}`);
    }
    
    console.log(`🎯 Target database: ${databaseName}`);
    
    // Create connection with explicit database name
    const connection = await Promise.race([
      mongoose.createConnection(finalUri, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 5,
        minPoolSize: 1,
        dbName: databaseName, // Explicitly set the database name
        bufferCommands: false,
        bufferMaxEntries: 0
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout after 12 seconds")), 12000)
      )
    ]) as mongoose.Connection;
    
    // Store connection for reuse
    connectionPool.set(mongoUri, connection);
    
    console.log(`✅ Connected to cluster: ${mongoUri.split('@')[1]?.split('/')[0] || 'unknown'}`);
    
    // Wait for connection to be fully ready
    if (connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection ready timeout'));
        }, 5001);
        
        connection.once('open', () => {
          clearTimeout(timeout);
          resolve(null);
        });
        
        connection.once('error', (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
    }
    
    // Verify we're connected to the correct database
    const actualDbName = connection.db?.databaseName;
    console.log(`📊 Connected to database: ${actualDbName}`);
    
    // If we're not connected to the expected database, force switch
    if (actualDbName !== databaseName) {
      console.log(`🔄 Switching from "${actualDbName}" to "${databaseName}"`);
      try {
        const targetDb = connection.client.db(databaseName);
        // Replace the connection's database reference
        (connection as any).db = targetDb;
        console.log(`✅ Successfully switched to database: ${databaseName}`);
      } catch (switchError) {
        console.error('❌ Failed to switch database:', switchError);
      }
    }
    
    // Final verification - try to list collections
    try {
      const collections = await connection.db.listCollections().toArray();
      console.log(`🎯 Database "${databaseName}" verified - found ${collections.length} collections:`);
      console.log(`📋 Collections: ${collections.map(c => c.name).join(', ')}`);
      
      if (collections.length === 0) {
        console.warn(`⚠️ No collections found in database "${databaseName}" - this might indicate an issue`);
      }
    } catch (listError) {
      console.error('❌ Could not list collections:', listError);
      throw new Error(`Connected but cannot access database "${databaseName}": ${listError.message}`);
    }
    
    return connection;
  } catch (error) {
    console.error('❌ Failed to connect to restaurant database:', error);
    // Clean up failed connection
    connectionPool.delete(mongoUri);
    throw error;
  }
}

export function closeRestaurantConnection(mongoUri: string) {
  const connection = connectionPool.get(mongoUri);
  if (connection) {
    connection.close();
    connectionPool.delete(mongoUri);
    console.log(`Closed connection to restaurant database: ${mongoUri.split('@')[1]?.split('/')[0] || 'unknown'}`);
  }
}

// Define flexible menu item schema for dynamic connections
export function getMenuItemModel(connection: mongoose.Connection) {
  const menuItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    isVeg: {
      type: Boolean,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }, { 
    strict: false, 
    timestamps: true 
  });

  // Use existing model if already compiled
  if (connection.models['MenuItem']) {
    return connection.models['MenuItem'];
  }
  
  return connection.model('MenuItem', menuItemSchema);
}

// Helper function to ensure we're connected to the right database
async function ensureCorrectDatabase(connection: mongoose.Connection, mongoUri: string) {
  try {
    const currentDbName = connection.db?.databaseName;
    
    // Extract the expected database name from URI (cluster name in lowercase)
    const clusterMatch = mongoUri.match(/@([^.]+)\./);
    const expectedDbName = clusterMatch ? clusterMatch[1].toLowerCase() : null;
    
    console.log(`🔍 Current database: ${currentDbName}, Expected: ${expectedDbName}`);
    
    // If we're not connected to the expected database, switch to it
    if (expectedDbName && currentDbName !== expectedDbName) {
      console.log(`🔄 Switching from "${currentDbName}" to "${expectedDbName}"`);
      try {
        const targetDb = connection.client.db(expectedDbName);
        (connection as any).db = targetDb;
        console.log(`✅ Successfully switched to database: ${expectedDbName}`);
        
        // Verify by listing collections
        const collections = await targetDb.listCollections().toArray();
        console.log(`📋 Found ${collections.length} collections in "${expectedDbName}": ${collections.map(c => c.name).join(', ')}`);
      } catch (switchError) {
        console.error(`❌ Failed to switch to database "${expectedDbName}":`, switchError);
      }
    }
    
    return connection;
  } catch (error) {
    console.error('❌ Error ensuring correct database:', error);
    return connection;
  }
}

// Function to detect and analyze database structure dynamically
export async function analyzeCustomDatabase(connection: mongoose.Connection, mongoUri?: string) {
  try {
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('🔍 Analyzing database structure');
    console.log('📊 Database name:', dbName);
    console.log('🔗 Connection state:', connection.readyState);
    
    if (!dbName) {
      console.error('❌ Cannot determine database name from connection');
      return [];
    }
    
    // Get all collections in the database
    const collections = await connection.db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    if (collections.length === 0) {
      console.log('📭 No collections found in database');
      return [];
    }
    
    // Filter collections dynamically - exclude system collections
    const systemCollectionNames = [
      'admin', 'local', 'config', 'system', 'test', 
      'users', 'sessions', 'accounts', 'tokens'
    ];
    
    const menuCollections = collections.filter(c => 
      // Skip collections that start with system prefixes
      !c.name.startsWith('__') && 
      !c.name.startsWith('system.') &&
      !c.name.startsWith('_') &&
      // Skip known system collections
      !systemCollectionNames.some(sys => 
        c.name.toLowerCase().includes(sys.toLowerCase())
      )
    );
    
    console.log('🎯 Menu collections (all non-system collections):', menuCollections.map(c => c.name));
    
    // Analyze each collection to understand its structure
    for (const collection of menuCollections) {
      console.log(`🔍 Analyzing collection: ${collection.name}`);
      
      try {
        const sampleDoc = await connection.db.collection(collection.name).findOne({});
        const docCount = await connection.db.collection(collection.name).countDocuments();
        
        console.log(`📊 Collection "${collection.name}" has ${docCount} documents`);
        
        if (sampleDoc) {
          console.log(`📄 Sample document structure:`, {
            hasName: !!(sampleDoc.name || sampleDoc.title || sampleDoc.itemName),
            hasPrice: !!(sampleDoc.price || sampleDoc.cost || sampleDoc.amount),
            hasDescription: !!(sampleDoc.description || sampleDoc.desc),
            hasCategory: !!(sampleDoc.category || sampleDoc.type),
            hasImage: !!(sampleDoc.image || sampleDoc.imageUrl || sampleDoc.photo),
            keys: Object.keys(sampleDoc).slice(0, 10) // Show first 10 keys
          });
          
          if ((sampleDoc.name || sampleDoc.title) && (sampleDoc.price || sampleDoc.cost)) {
            console.log(`✅ Collection ${collection.name} appears to contain menu items`);
          } else if (docCount > 0) {
            console.log(`⚠️ Collection ${collection.name} has data but structure is unclear`);
          }
        } else {
          console.log(`📭 Collection ${collection.name} is empty (can be used for new items)`);
        }
      } catch (error) {
        console.error(`❌ Error analyzing collection ${collection.name}:`, error);
      }
    }
    
    console.log('🎯 Final menu-related collections found:', menuCollections.map(c => c.name));
    return menuCollections;
  } catch (error) {
    console.error('❌ Error analyzing database structure:', error);
    return [];
  }
}

// Dynamic category mapping based on collection names
function createDynamicCategoryMapping(collectionNames: string[]) {
  const commonMappings = {
    // Common variations
    'chefspecial': 'Chef Special',
    'chef_special': 'Chef Special',
    'specialties': 'Chef Special',
    'signature': 'Signature Dishes',
    
    'starters': 'Starters',
    'appetizers': 'Starters',
    'apps': 'Starters',
    'chickenstarters': 'Chicken Starters',
    
    'soups': 'Soups',
    'soup': 'Soups',
    
    'maincourse': 'Main Course',
    'main_course': 'Main Course',
    'maindish': 'Main Course',
    'mains': 'Main Course',
    'entrees': 'Main Course',
    
    'ricebiryani': 'Rice & Biryani',
    'rice_biryani': 'Rice & Biryani',
    'rice': 'Rice & Biryani',
    'biryani': 'Rice & Biryani',
    
    'bread': 'Bread',
    'breads': 'Bread',
    'naan': 'Bread',
    'roti': 'Bread',
    
    'desserts': 'Desserts',
    'dessert': 'Desserts',
    'sweets': 'Desserts',
    'sweet': 'Desserts',
    
    'drinks': 'Drinks',
    'beverages': 'Beverages',
    'beverage': 'Beverages',
    'juice': 'Beverages',
    'juices': 'Beverages',
    
    'combos': 'Combos',
    'combo': 'Combos',
    'meals': 'Combos',
    'meal': 'Combos',
    
    // Add more variations as needed
    'noodle': 'Noodles',
    'noodles': 'Noodles',
    'noodlewithgravy': 'Noodles with Gravy',
    'chopsuey': 'Chop Suey',
    'gravies': 'Gravies',
    'gravy': 'Gravies',
    'momos': 'Momos',
    'momo': 'Momos',
    'extra': 'Extras',
    'extras': 'Extras',
    'prawns': 'Prawns',
    'prawn': 'Prawns',
    'prawnsstarters': 'Prawn Starters',
    'potice': 'Potice'
  };
  
  const dynamicMapping = {};
  
  collectionNames.forEach(name => {
    const lowerName = name.toLowerCase();
    if (commonMappings[lowerName]) {
      dynamicMapping[name] = commonMappings[lowerName];
    } else {
      // Create a display-friendly name
      dynamicMapping[name] = name
        .split(/[_-]/) // Split on underscores and hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  });
  
  return dynamicMapping;
}

// Function to fetch menu items from each collection dynamically
export async function fetchMenuItemsFromCustomDB(connection: mongoose.Connection, categoryFilter?: string, mongoUri?: string) {
  try {
    console.log('🔍 Starting to fetch menu items from custom database');
    
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('📊 Database name:', dbName);
    console.log('🎯 Category filter:', categoryFilter || 'ALL');
    
    if (!dbName) {
      console.error('❌ Cannot determine database name from connection');
      return [];
    }
    
    // Get all collections in the database
    const collections = await connection.db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Filter out system collections dynamically
    const systemCollections = ['admin', 'local', 'config', 'system', 'test', 'users', 'sessions', 'accounts', 'tokens'];
    const menuCollections = collections.filter(c => 
      !systemCollections.some(sys => c.name.toLowerCase().includes(sys.toLowerCase())) &&
      !c.name.startsWith('_') &&
      !c.name.startsWith('system.')
    );
    
    console.log('🎯 Menu collections:', menuCollections.map(c => c.name));
    
    if (menuCollections.length === 0) {
      console.log('❌ No menu collections found in custom database');
      return [];
    }
    
    // Create dynamic category mapping
    const categoryMapping = createDynamicCategoryMapping(menuCollections.map(c => c.name));
    console.log('🗺️ Dynamic category mapping:', categoryMapping);
    
    let allMenuItems = [];
    
    // If categoryFilter is provided, find the matching collection
    let collectionsToQuery = menuCollections;
    if (categoryFilter) {
      // Try to find collection by display name or collection name
      collectionsToQuery = menuCollections.filter(c => {
        const displayName = categoryMapping[c.name];
        return displayName?.toLowerCase() === categoryFilter.toLowerCase() || 
               c.name.toLowerCase() === categoryFilter.toLowerCase();
      });
      
      console.log(`🎯 Filtering for category "${categoryFilter}", found collections:`, collectionsToQuery.map(c => c.name));
    }
    
    for (const collection of collectionsToQuery) {
      try {
        console.log(`🔍 Fetching items from collection: ${collection.name}`);
        const items = await connection.db.collection(collection.name).find({}).toArray();
        
        console.log(`📋 Found ${items.length} items in ${collection.name}`);
        
        // Get the display category name
        const displayCategory = categoryMapping[collection.name] || collection.name;
        
        // Transform items to standardized format
        const transformedItems = items.map(item => {
          return {
            _id: item._id,
            name: item.name || item.title || item.itemName || 'Unknown Item',
            description: item.description || item.desc || item.details || '',
            price: item.price || item.cost || item.amount || 0,
            category: displayCategory, // Use dynamic display category
            isVeg: item.isVeg ?? item.veg ?? item.vegetarian ?? true,
            image: item.image || item.imageUrl || item.photo || '',
            restaurantId: item.restaurantId || new mongoose.Types.ObjectId(),
            isAvailable: item.isAvailable ?? item.available ?? item.active ?? true,
            createdAt: item.createdAt || new Date(),
            updatedAt: item.updatedAt || new Date(),
            __v: item.__v ?? 0,
            originalCollection: collection.name,
            originalData: item
          };
        });
        
        allMenuItems = allMenuItems.concat(transformedItems);
        console.log(`📊 Added ${transformedItems.length} items from ${collection.name} with category "${displayCategory}"`);
      } catch (error) {
        console.error(`❌ Error fetching from collection ${collection.name}:`, error);
      }
    }
    
    console.log(`🎯 Total menu items found: ${allMenuItems.length}`);
    return allMenuItems;
  } catch (error) {
    console.error('❌ Error fetching menu items from custom database:', error);
    return [];
  }
}

// Function to extract categories from collection names dynamically
export async function extractCategoriesFromCustomDB(connection: mongoose.Connection, mongoUri?: string) {
  try {
    console.log('🔍 Extracting categories from collection names');
    
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('📊 Database name:', dbName);
    
    if (!dbName) {
      console.error('❌ Cannot determine database name from connection');
      return ['Starters', 'Main Course', 'Desserts', 'Beverages'];
    }
    
    // Get all collections in the database
    const collections = await connection.db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Filter out system collections dynamically
    const systemCollections = ['admin', 'local', 'config', 'system', 'test', 'users', 'sessions', 'accounts', 'tokens'];
    const menuCollections = collections.filter(c => 
      !systemCollections.some(sys => c.name.toLowerCase().includes(sys.toLowerCase())) &&
      !c.name.startsWith('_') &&
      !c.name.startsWith('system.')
    );
    
    console.log('🎯 Menu collections (potential categories):', menuCollections.map(c => c.name));
    
    if (menuCollections.length === 0) {
      console.log('❌ No valid collections found for categories');
      return ['Starters', 'Main Course', 'Desserts', 'Beverages'];
    }
    
    // Create dynamic category mapping
    const categoryMapping = createDynamicCategoryMapping(menuCollections.map(c => c.name));
    
    const categories = menuCollections.map(collection => {
      const displayLabel = categoryMapping[collection.name];
      console.log(`📌 Using collection name as category: "${displayLabel}" (from "${collection.name}")`);
      return displayLabel;
    });
    
    // Remove duplicates and sort
    const uniqueCategories = Array.from(new Set(categories)).sort();
    
    console.log(`✅ Final categories from collection names:`, uniqueCategories);
    
    return uniqueCategories.length > 0 ? uniqueCategories : ['Starters', 'Main Course', 'Desserts', 'Beverages'];
  } catch (error) {
    console.error('❌ Error extracting categories from collection names:', error);
    return ['Starters', 'Main Course', 'Desserts', 'Beverages'];
  }
}

// Function to create a menu item in the custom database dynamically
export async function createMenuItemInCustomDB(connection: mongoose.Connection, menuItemData: any, mongoUri?: string) {
  try {
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('📊 Creating item in database:', dbName);
    
    const menuCollections = await analyzeCustomDatabase(connection, mongoUri);
    
    // Create reverse mapping from display names to collection names
    const collectionNames = menuCollections.map(c => c.name);
    const categoryMapping = createDynamicCategoryMapping(collectionNames);
    
    // Create reverse mapping
    const displayToCollectionMapping = {};
    Object.entries(categoryMapping).forEach(([collection, display]) => {
      displayToCollectionMapping[display] = collection;
    });
    
    let targetCollection = displayToCollectionMapping[menuItemData.category] || 
                          menuItemData.category?.toLowerCase() || 
                          'menuitems';
    
    // Verify the collection exists in the database
    const collectionExists = menuCollections.some(col => col.name === targetCollection);
    if (!collectionExists) {
      console.log(`⚠️  Collection "${targetCollection}" not found, using first available collection`);
      targetCollection = menuCollections.length > 0 ? menuCollections[0].name : 'menuitems';
    }
    
    console.log(`Creating menu item in collection: ${targetCollection}`);
    
    // Get proper display category
    const displayCategory = categoryMapping[targetCollection] || menuItemData.category;
    
    const transformedData = {
      name: menuItemData.name,
      description: menuItemData.description,
      price: menuItemData.price,
      category: displayCategory,
      isVeg: menuItemData.isVeg !== undefined ? menuItemData.isVeg : true, // Use only isVeg field for MongoDB
      image: menuItemData.image,
      restaurantId: menuItemData.restaurantId || new mongoose.Types.ObjectId(),
      isAvailable: menuItemData.isAvailable ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    };
    
    const result = await connection.db.collection(targetCollection).insertOne(transformedData);
    console.log(`Menu item created with ID: ${result.insertedId}`);
    
    return {
      _id: result.insertedId,
      ...transformedData,
      originalCollection: targetCollection
    };
  } catch (error) {
    console.error('Error creating menu item in custom database:', error);
    throw error;
  }
}

// Function to update a menu item in the custom database dynamically
export async function updateMenuItemInCustomDB(connection: mongoose.Connection, itemId: string, updateData: any, mongoUri?: string) {
  try {
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('📊 Updating item in database:', dbName);
    
    const menuCollections = await analyzeCustomDatabase(connection, mongoUri);
    
    // First, find which collection the item is currently in
    let currentCollection = null;
    let currentItem = null;
    
    for (const collection of menuCollections) {
      try {
        const item = await connection.db.collection(collection.name).findOne(
          { _id: new mongoose.Types.ObjectId(itemId) }
        );
        
        if (item) {
          currentCollection = collection.name;
          currentItem = item;
          break;
        }
      } catch (error) {
        console.error(`Error finding item in collection ${collection.name}:`, error);
      }
    }
    
    if (!currentCollection || !currentItem) {
      throw new Error(`Menu item with ID ${itemId} not found in any collection`);
    }
    
    // Create dynamic mappings
    const collectionNames = menuCollections.map(c => c.name);
    const categoryMapping = createDynamicCategoryMapping(collectionNames);
    const displayToCollectionMapping = {};
    Object.entries(categoryMapping).forEach(([collection, display]) => {
      displayToCollectionMapping[display] = collection;
    });
    
    // If category is being changed, move item to the new collection
    if (updateData.category) {
      const newCollectionName = displayToCollectionMapping[updateData.category] || 
                               updateData.category.toLowerCase();
      
      if (newCollectionName !== currentCollection) {
        const newCollectionExists = menuCollections.some(col => col.name === newCollectionName);
      
        if (newCollectionExists) {
          console.log(`🔄 Moving item from "${currentCollection}" to "${newCollectionName}"`);
          
          // Create the item in the new collection with proper field mapping
          const newItemData = {
            ...currentItem,
            ...updateData,
            isVeg: updateData.isVeg !== undefined ? updateData.isVeg : (currentItem.isVeg ?? currentItem.veg ?? true),
            updatedAt: new Date(),
            __v: currentItem.__v || 0
          };
          // Remove old veg field if it exists
          delete newItemData.veg;
          delete newItemData._id; // Remove old ID for new insertion
          
          const insertResult = await connection.db.collection(newCollectionName).insertOne(newItemData);
          
          // Delete from old collection
          await connection.db.collection(currentCollection).deleteOne(
            { _id: new mongoose.Types.ObjectId(itemId) }
          );
          
          console.log(`✅ Menu item moved to collection: ${newCollectionName}`);
          return {
            _id: insertResult.insertedId,
            ...newItemData,
            originalCollection: newCollectionName
          };
        }
      }
    }
    
    // Update in current collection with proper field mapping
    const updateFields = {
      ...updateData,
      updatedAt: new Date()
    };
    
    // Remove old veg field and ensure isVeg is used
    if (updateFields.veg !== undefined) {
      delete updateFields.veg; // Remove old veg field
    }
    
    const result = await connection.db.collection(currentCollection).findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(itemId) },
      { 
        $set: updateFields
      },
      { returnDocument: 'after' }
    );
    
    if (result) {
      console.log(`✅ Menu item updated in collection: ${currentCollection}`);
      return {
        _id: result._id,
        name: result.name || result.title || result.itemName || 'Unknown Item',
        description: result.description || result.desc || result.details || '',
        price: result.price || result.cost || result.amount || 0,
        category: result.category || categoryMapping[currentCollection] || 'Uncategorized',
        isVeg: result.isVeg ?? result.vegetarian ?? result.veg ?? true,
        image: result.image || result.imageUrl || result.photo || '',
        isAvailable: result.isAvailable ?? result.available ?? result.active ?? true,
        originalCollection: currentCollection,
        originalData: result
      };
    }
    
    throw new Error('Menu item not found in any collection');
  } catch (error) {
    console.error('Error updating menu item in custom database:', error);
    throw error;
  }
}

// Function to delete a menu item from the custom database dynamically
export async function deleteMenuItemFromCustomDB(connection: mongoose.Connection, itemId: string, mongoUri?: string) {
  try {
    // Ensure we're connected to the correct database
    if (mongoUri) {
      connection = await ensureCorrectDatabase(connection, mongoUri);
    }
    
    const dbName = connection.db?.databaseName;
    console.log('📊 Deleting item from database:', dbName);
    
    const menuCollections = await analyzeCustomDatabase(connection, mongoUri);
    
    // Try to find and delete the item from all collections
    for (const collection of menuCollections) {
      try {
        const result = await connection.db.collection(collection.name).deleteOne(
          { _id: new mongoose.Types.ObjectId(itemId) }
        );
        
        if (result.deletedCount > 0) {
          console.log(`Menu item deleted from collection: ${collection.name}`);
          return true;
        }
      } catch (error) {
        console.error(`Error deleting from collection ${collection.name}:`, error);
      }
    }
    
    throw new Error('Menu item not found in any collection');
  } catch (error) {
    console.error('Error deleting menu item from custom database:', error);
    throw error;
  }
}