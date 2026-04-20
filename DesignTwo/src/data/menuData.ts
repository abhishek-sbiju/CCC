export type DietType = "veg" | "non-veg" | "both";

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  variants?: string;
  tags?: string[];
  dietType?: DietType;
}

export interface MenuSubCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  title: string;
  description?: string;
  subCategories?: MenuSubCategory[];
  items?: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "bar",
    title: "BAR",
    subCategories: [
      {
        name: "Rum",
        items: [
          { name: "Old Monk", price: "₹60", description: "Rum · 30ml" },
          { name: "Bacardi White Rum", price: "₹100", description: "Rum · 30ml" },
          { name: "Bacardi Lemon", price: "₹100", description: "Rum · 30ml" },
        ],
      },
      {
        name: "Vodka",
        items: [
          { name: "Smirnoff Reg", price: "₹100", description: "Vodka · 30ml" },
          { name: "Smirnoff Green Apple", price: "₹120", description: "Vodka · 30ml" },
          { name: "Absolute Vodka", price: "₹200", description: "Vodka · 30ml" },
        ],
      },
      {
        name: "Whiskey",
        items: [
          { name: "Blenders Pride", price: "₹100", description: "Whiskey · 30ml" },
          { name: "VAT 69", price: "₹100", description: "Whiskey · 30ml" },
          { name: "Black & White", price: "₹150", description: "Whiskey · 30ml" },
          { name: "Jim Beam", price: "₹200", description: "Whiskey · 30ml" },
          { name: "100 Pipers 12 Years", price: "₹200", description: "Whiskey · 30ml" },
        ],
      },
      {
        name: "Brandy",
        items: [
          { name: "Morpheus", price: "₹100", description: "Brandy · 30ml" },
        ],
      },
      {
        name: "Tequila / Liqueur",
        items: [
          { name: "Camino", price: "₹250", description: "Tequila · 30ml" },
          { name: "Jägermeister", price: "₹299", description: "Liqueur · 30ml" },
        ],
      },
      {
        name: "Gin",
        items: [
          { name: "Greater Than London Dry Gin", price: "₹100", description: "Gin · 30ml" },
          { name: "Tanqueray", price: "₹199", description: "Gin · 30ml" },
          { name: "Bombay Sapphire", price: "₹250", description: "Gin · 30ml" },
        ],
      },
      {
        name: "Beers",
        items: [
          { name: "Kingfisher Premium", price: "₹100", description: "330 ml" },
          { name: "Kingfisher Strong", price: "₹110", description: "330 ml" },
          { name: "Kingfisher Ultra", price: "₹120", description: "330 ml" },
          { name: "Heineken", price: "₹130", description: "330 ml" },
          { name: "Heineken Silver", price: "₹140", description: "330 ml" },
          { name: "Budweiser", price: "₹130", description: "330 ml" },
        ],
      },
      {
        name: "Draught Beer",
        items: [
          { name: "KF Premium Draught Mug", price: "₹100", description: "330 ml" },
          { name: "KF Ultra Draught Mug", price: "₹120" },
          { name: "KF Premium Draught Pitcher", price: "₹399", description: "1.5 L" },
          { name: "KF Ultra Draught Pitcher", price: "₹499", description: "1.5 L" },
          { name: "KF Premium Draught Tower", price: "₹750", description: "3 L" },
          { name: "KF Ultra Draught Tower", price: "₹899", description: "3 L" },
        ],
      },
      {
        name: "Cocktails",
        items: [
          { name: "Mojito", price: "₹249" },
          { name: "Beer Mojito", price: "₹249" },
          { name: "Shandy", price: "₹189" },
          { name: "Boilermaker", price: "₹299" },
          { name: "Daiquiri", price: "₹299" },
          { name: "Margarita", price: "₹349" },
          { name: "Cosmopolitan", price: "₹299" },
          { name: "Tequila Sunrise", price: "₹349" },
          { name: "Pina Colada", price: "₹299" },
          { name: "Blue Lagoon", price: "₹299" },
          { name: "Long Island Iced Tea", price: "₹499" },
        ],
      },
      {
        name: "Mocktails",
        items: [
          { name: "Virgin Colada", price: "₹249" },
          { name: "Virgin Blue Lagoon", price: "₹199" },
          { name: "Virgin Mojito", price: "₹199" },
          { name: "Sunrise Special", price: "₹199" },
          { name: "Iced Tea Peach", price: "₹199" },
          { name: "Fresh Lime Soda", price: "₹100" },
          { name: "Fresh Lime Water", price: "₹70" },
        ],
      },
      {
        name: "Soft Beverages",
        items: [
          { name: "Pepsi / Coke / Thums Up", price: "₹50" },
          { name: "7UP / Sprite", price: "₹50" },
          { name: "Red Bull", price: "₹160" },
          { name: "Soda", price: "₹20" },
        ],
      },
    ],
  },
  {
    id: "hot-beverages",
    title: "HOT BEVERAGES",
    subCategories: [
      {
        name: "Coffee",
        items: [
          { name: "Espresso", price: "₹89" },
          { name: "Americano", price: "₹129" },
          { name: "Cappuccino", price: "₹179" },
          { name: "Hazelnut Cappuccino", price: "₹229" },
          { name: "Caramel Cappuccino", price: "₹229" },
          { name: "Latte", price: "₹199" },
          { name: "Hazelnut Latte", price: "₹249" },
          { name: "Caramel Latte", price: "₹249" },
          { name: "Hot Mocha", price: "₹199" },
          { name: "Hot Chocolate", price: "₹199" },
        ],
      },
      {
        name: "Tea",
        items: [
          { name: "Ginger Tea", price: "₹89" },
          { name: "Tapri Masala Tea", price: "₹89" },
          { name: "Green Tea", price: "₹149" },
          { name: "Lemon Tea", price: "₹159" },
          { name: "Assam Tea", price: "₹89" },
        ],
      },
    ],
  },
  {
    id: "cold-beverages",
    title: "COLD BEVERAGES",
    subCategories: [
      {
        name: "Cold Coffees",
        items: [
          { name: "Iced Espresso", price: "₹109" },
          { name: "Iced Americano", price: "₹169" },
          { name: "Iced Mocha", price: "₹249" },
          { name: "Iced Latte", price: "₹219" },
          { name: "Iced Vanilla Latte", price: "₹249" },
          { name: "Iced Spanish Latte", price: "₹249" },
          { name: "Iced Biscoff Latte", price: "₹249" },
          { name: "Classic Affogato", price: "₹199" },
          { name: "Vietnamese Coffee", price: "₹229" },
        ],
      },
      {
        name: "Frappes",
        items: [
          { name: "Classic Frappe", price: "₹219" },
          { name: "Caramel Frappe", price: "₹239" },
          { name: "Mocha Frappe", price: "₹239" },
          { name: "Hazelnut Frappe", price: "₹239" },
          { name: "Biscoff Frappe", price: "₹249" },
        ],
      },
      {
        name: "Shakes",
        items: [
          { name: "Chocolate Shake", price: "₹229" },
          { name: "Oreo Shake", price: "₹229" },
          { name: "Brownie Shake", price: "₹249" },
        ],
      },
      {
        name: "Smoothies",
        items: [
          { name: "Berry Blast", price: "₹269" },
          { name: "Tropical Delight", price: "₹269" },
          { name: "Desert Dates", price: "₹269" },
          { name: "Peanut Butter", price: "₹269" },
        ],
      },
    ],
  },
  {
    id: "wraps",
    title: "WRAPS",
    items: [
      { name: "Fiery Chicken Wrap", price: "₹279" },
      { name: "Kolkata Style Egg Wrap", price: "₹249" },
      { name: "Kolkata Style Chicken Wrap", price: "₹299" },
      { name: "Tikka Wrap", price: "₹279", variants: "Paneer / Chicken" },
      { name: "Quesadilla", price: "₹329 / ₹389", variants: "Veg / Chicken" },
      { name: "Mexican Burrito Wrap", price: "₹299 / ₹349", variants: "Veg / Chicken" },
      { name: "Regular Veg Wrap", price: "₹249" },
    ],
  },
  {
    id: "bao-buns",
    title: "BAO BUNS",
    description: "A Bao is a homemade soft steamed bun originating from Asian cuisine.",
    subCategories: [
      {
        name: "Fusion Baos",
        items: [
          { name: "Original Crispy Chicken Bao", price: "₹389", description: "2 pcs", tags: ["popular"] },
          { name: "Cafreal Bao", price: "₹179 / ₹199", variants: "Paneer / Chicken" },
          { name: "Peri Peri Bao", price: "₹179 / ₹199", variants: "Veg / Chicken" },
          { name: "Tandoori Bao", price: "₹179 / ₹199", variants: "Paneer / Chicken" },
          { name: "Butter Masala Bao", price: "₹179 / ₹199", variants: "Paneer / Chicken" },
          { name: "Original Crispy Veg Bao", price: "₹349", description: "2 pcs", tags: ["popular"] },
        ],
      },
      {
        name: "Oriental Baos",
        items: [
          { name: "Teriyaki Bao", price: "₹199", variants: "Paneer / Chicken" },
          { name: "Chilli Basil Bao", price: "₹179 / ₹199", variants: "Veg / Paneer / Chicken" },
          { name: "Hot Garlic Bao", price: "₹179 / ₹199", variants: "Veg / Paneer / Chicken" },
          { name: "Schezwan Bao", price: "₹179 / ₹199", variants: "Veg / Paneer / Chicken" },
          { name: "Manchurian Bao", price: "₹179 / ₹199", variants: "Veg / Paneer / Chicken" },
        ],
      },
    ],
  },
  {
    id: "sandwiches",
    title: "SANDWICHES",
    items: [
      { name: "Classic Club", price: "₹269 / ₹299", variants: "Veg / Chicken" },
      { name: "Tikka Sandwich", price: "₹299", variants: "Paneer / Chicken" },
      { name: "Bombay Masala Sandwich", price: "₹239" },
    ],
  },
  {
    id: "burgers",
    title: "BURGERS",
    items: [
      { name: "Chef's Special Chicken Burger", price: "₹399", tags: ["chef"] },
      { name: "Fiery Chicken Burger", price: "₹399" },
      { name: "Mutton Burger", price: "₹499" },
      { name: "Double Cheese Burger", price: "₹299 / ₹339", variants: "Veg / Chicken" },
    ],
  },
  {
    id: "pizzas",
    title: "PIZZAS",
    items: [
      { name: "Cajun Chicken Pizza", price: "₹499", description: "Cajun chicken, Mexican sauce, roasted garlic, chilli flakes, jalapeños & mushrooms" },
      { name: "Tikka Pizza", price: "₹469", variants: "Paneer / Chicken" },
      { name: "Chettinad Pizza", price: "₹439 / ₹469", variants: "Veg / Chicken" },
      { name: "Italian Margherita", price: "₹419" },
      { name: "Farm Fresh Veg", price: "₹439" },
      { name: "Paneer & Corn", price: "₹469" },
      { name: "Genovese Pizza", price: "₹459", description: "Pesto sauce, olive oil, tomato & fresh basil leaves" },
      { name: "Fungi Boscaiola Pizza", price: "₹479", description: "Mushrooms, thyme, black pepper and cheese sauce" },
    ],
  },
  {
    id: "pasta",
    title: "PASTA",
    description: "Choice of Pasta: Penne / Spaghetti",
    items: [
      { name: "Alfredo", price: "₹329 / ₹379", variants: "Veg / Chicken" },
      { name: "Arrabiata", price: "₹329 / ₹379", variants: "Veg / Chicken" },
      { name: "Creole (Mix Sauce)", price: "₹329 / ₹379", variants: "Veg / Chicken" },
      { name: "Mac n Cheese", price: "₹359 / ₹399", variants: "Veg / Chicken" },
      { name: "Aglio Olio", price: "₹339 / ₹359 / ₹469", variants: "Veg / Chicken / Shrimp" },
      { name: "Creamy Pesto Pasta", price: "₹379 / ₹399", variants: "Veg / Chicken" },
    ],
  },
  {
    id: "appetizers",
    title: "APPETIZERS",
    items: [
      { name: "Chicken Popcorn", price: "₹299" },
      { name: "Chicken Garlic Fingers", price: "₹279" },
      { name: "Fiery Chicken", price: "₹359" },
      { name: "Fish & Chips", price: "₹469", tags: ["seafood"] },
      { name: "Butter Garlic Bell Pepper Prawns", price: "₹469", tags: ["seafood"] },
      { name: "Garlic Bread", price: "₹119" },
      { name: "French Fries", price: "₹199" },
      { name: "Peri Peri Fries", price: "₹239" },
      { name: "Cheesy Garlic Fries", price: "₹269" },
      { name: "Crunchy Nacho Fiesta", price: "₹289" },
    ],
  },
  {
    id: "asian-appetizers",
    title: "ASIAN APPETIZERS",
    items: [
      { name: "Butter Garlic Chicken", price: "₹359" },
      { name: "Spring Rolls", price: "₹239 / ₹279", variants: "Veg / Chicken" },
      { name: "Manchurian Dry", price: "₹289 / ₹339", variants: "Gobi / Paneer / Chicken" },
      { name: "Chilli Dry", price: "₹329 / ₹339", variants: "Mushroom / Paneer / Chicken" },
      { name: "Salt & Pepper", price: "₹289 / ₹339", variants: "Veg / Paneer / Chicken" },
      { name: "Honey Chilli Potatoes", price: "₹269" },
      { name: "Potato Poppers", price: "₹229" },
    ],
  },
  {
    id: "chicken-wings",
    title: "CHICKEN WINGS",
    items: [
      { name: "Chicken Lollypop", price: "₹349" },
      { name: "BBQ Wings", price: "₹349" },
      { name: "Schezwan Wings", price: "₹349" },
      { name: "Hot Garlic Wings", price: "₹349" },
      { name: "Chilli Basil Wings", price: "₹349" },
      { name: "Thai Wings", price: "₹349" },
    ],
  },
  {
    id: "momos",
    title: "MOMOS",
    description: "Available Steamed / Fried / Pan Tossed",
    items: [
      { name: "Chicken Momo", price: "₹199 / ₹219 / ₹229", variants: "Steamed / Fried / Pan Tossed" },
      { name: "Chicken Cheese Momo", price: "₹229", description: "Steamed" },
      { name: "Veg Momo", price: "₹169 / ₹189 / ₹199", variants: "Steamed / Fried / Pan Tossed" },
      { name: "Corn Cheese Momo", price: "₹189", description: "Steamed" },
    ],
  },
  {
    id: "soups",
    title: "SOUPS",
    items: [
      { name: "Cream of Soup", price: "₹189 / ₹229", variants: "Veg / Chicken" },
      { name: "Noodle Soup", price: "₹169 / ₹199", variants: "Veg / Chicken" },
      { name: "Lemon Coriander", price: "₹179 / ₹199", variants: "Veg / Chicken" },
      { name: "Hot & Sour", price: "₹179 / ₹199 / ₹229", variants: "Veg / Chicken / Seafood" },
      { name: "Manchow", price: "₹179 / ₹199", variants: "Veg / Chicken" },
      { name: "Sweet Corn", price: "₹179 / ₹199", variants: "Veg / Chicken" },
      { name: "Roasted Tomato Basil", price: "₹199" },
    ],
  },
  {
    id: "tandoor",
    title: "TANDOOR",
    items: [
      { name: "Chicken Tikka Classic", price: "₹349", description: "6 pcs" },
      { name: "Chicken Hariyali Kebab", price: "₹349", description: "6 pcs" },
      { name: "Murgh Malai Tikka", price: "₹349" },
      { name: "Chicken Seekh Kebab", price: "₹389", description: "2 seekh" },
      { name: "Tandoori Chicken Classic", price: "₹399 / ₹699", variants: "Half / Full" },
      { name: "Tandoori Platter (Non Veg)", price: "₹1,199" },
      { name: "Classic Paneer Tikka", price: "₹349", description: "5 pcs" },
      { name: "Angara Paneer Tikka", price: "₹349" },
      { name: "Malai Paneer Tikka", price: "₹389" },
    ],
  },
  {
    id: "indian-mains",
    title: "INDIAN MAINS",
    items: [
      { name: "Goan King Fish Curry", price: "₹499", tags: ["seafood"] },
      { name: "Goan Prawn Curry", price: "₹429", tags: ["seafood"] },
      { name: "Xacuti", price: "₹319 / ₹379", variants: "Mushroom / Chicken" },
      { name: "Butter Masala", price: "₹379", variants: "Paneer / Chicken" },
      { name: "Cafreal", price: "₹379", variants: "Paneer / Chicken" },
      { name: "Tikka Masala", price: "₹379", variants: "Paneer / Chicken" },
      { name: "Dal Makhani", price: "₹289" },
      { name: "Dal Tadka", price: "₹249" },
      { name: "Steamed Rice", price: "₹159" },
      { name: "Jeera Rice", price: "₹199" },
    ],
  },
  {
    id: "biryani",
    title: "BIRYANI",
    description: "Served with Salad & Raitha",
    items: [
      { name: "Kolkata Style Chicken Biryani", price: "₹259" },
      { name: "Chettinad Chicken Biryani", price: "₹259" },
      { name: "Butter Masala Chicken Biryani", price: "₹259" },
      { name: "Egg Biryani", price: "₹229" },
      { name: "Veg Biryani", price: "₹199" },
      { name: "Paneer Biryani", price: "₹259" },
    ],
  },
  {
    id: "noodles-rice",
    title: "NOODLES & RICE",
    items: [
      { name: "Fried Rice", price: "₹219 / ₹259 / ₹319", variants: "Veg / Chicken / Mix" },
      { name: "Hakka Noodles", price: "₹219 / ₹259 / ₹319", variants: "Veg / Chicken / Mix" },
      { name: "Burnt Garlic Rice", price: "₹239 / ₹269 / ₹329", variants: "Veg / Chicken / Mix" },
      { name: "Burnt Garlic Noodles", price: "₹239 / ₹269 / ₹329", variants: "Veg / Chicken / Mix" },
      { name: "Schezwan Rice", price: "₹239 / ₹269 / ₹329", variants: "Veg / Chicken / Mix" },
      { name: "Schezwan Noodles", price: "₹239 / ₹269 / ₹329", variants: "Veg / Chicken / Mix" },
      { name: "Egg Fried Rice", price: "₹239" },
    ],
  },
  {
    id: "gravies-sauces",
    title: "GRAVIES & SAUCES",
    description: "To go as accompaniment with Rice or Noodles above.",
    items: [
      { name: "Schezwan Sauce", price: "₹219 / ₹259", variants: "Veg / Paneer / Chicken" },
      { name: "Hot Garlic Sauce", price: "₹219 / ₹259", variants: "Veg / Paneer / Chicken" },
      { name: "Thai Red Curry Sauce", price: "₹329 / ₹369", variants: "Veg / Chicken" },
      { name: "Thai Green Curry Sauce", price: "₹329 / ₹369", variants: "Veg / Chicken" },
      { name: "Chilli Basil Sauce", price: "₹219 / ₹259", variants: "Veg / Paneer / Chicken" },
      { name: "Manchurian Sauce", price: "₹219 / ₹259", variants: "Veg / Paneer / Chicken" },
    ],
  },
  {
    id: "conti-meals",
    title: "PRE-PLATED CONTI-MEALS",
    description: "Pre-plated continental meals feature a thoughtfully curated selection of European-inspired dishes.",
    items: [
      { name: "Grilled Fish w Lemon Butter Sauce", price: "₹499", description: "Pan grilled fish in lemon butter sauce with sautéed vegetables and potato wedges", tags: ["seafood"] },
      { name: "Jalapeño Chicken w Creamy Mexican Sauce", price: "₹479", description: "Marinated chicken in Mexican cheese sauce with herb garlic veggies" },
      { name: "Creamy Cajun Chicken", price: "₹479", description: "Pan seared in Cajun sauce with sun-dried tomatoes & baby spinach" },
      { name: "Grilled Chicken w Brown Sauce", price: "₹479", description: "Pan fried in homemade brown sauce with sautéed vegetables" },
      { name: "Mexican Burrito Bowl", price: "₹349 / ₹399", variants: "Veg / Chicken" },
      { name: "Veg Au Gratin", price: "₹349", description: "French dish with mixed vegetables, white sauce and cheese" },
    ],
  },
  {
    id: "sizzlers",
    title: "SIZZLERS",
    items: [
      { name: "Herb Rice & Red Thai Curry", price: "₹419 / ₹449", variants: "Veg / Chicken" },
      { name: "Herb Rice & Green Thai Curry", price: "₹419 / ₹449", variants: "Veg / Chicken" },
      { name: "Hot Garlic Gravy with Noodles/Rice", price: "₹399 / ₹429", variants: "Veg / Chicken" },
      { name: "Manchurian Gravy with Noodles/Rice", price: "₹399 / ₹429", variants: "Veg / Chicken" },
      { name: "Chilli Basil Gravy with Noodles/Rice", price: "₹399 / ₹429", variants: "Veg / Chicken" },
    ],
  },
  {
    id: "bowls",
    title: "BOWLS",
    description: "Each bowl comes with a portion of rice/noodles with the gravy of your choice on the side.",
    items: [
      { name: "Red Thai Curry Bowl", price: "₹379 / ₹409 / ₹439", variants: "Veg / Chicken / Prawn" },
      { name: "Green Thai Curry Bowl", price: "₹379 / ₹409 / ₹439", variants: "Veg / Chicken / Prawn" },
      { name: "Hot Garlic Gravy Bowl", price: "₹349 / ₹379 / ₹409", variants: "Veg / Chicken / Prawn" },
      { name: "Manchurian Gravy Bowl", price: "₹349 / ₹379 / ₹409", variants: "Veg / Chicken / Prawn" },
    ],
  },
  {
    id: "breads",
    title: "BREADS",
    items: [
      { name: "Tandoori Roti", price: "₹19" },
      { name: "Butter Roti", price: "₹29" },
      { name: "Tandoori Naan", price: "₹49" },
      { name: "Butter Naan", price: "₹59" },
      { name: "Butter Garlic Naan", price: "₹79" },
      { name: "Cheese Garlic Naan", price: "₹139" },
      { name: "Cheese Chilli Garlic Naan", price: "₹149" },
      { name: "Tandoori Lachcha Paratha", price: "₹89" },
    ],
  },
  {
    id: "desserts",
    title: "DESSERTS",
    items: [
      { name: "Demo Signature Brownie", price: "₹189" },
      { name: "Sizzling Brownie with Ice Cream", price: "₹269" },
      { name: "Cheesecake Slice", price: "₹149" },
      { name: "Bebinca", price: "₹179 / ₹249", variants: "Regular / With Ice Cream" },
      { name: "Caramel Pudding", price: "₹249" },
      { name: "Pancake", price: "₹199" },
      { name: "Ice Cream", price: "₹129", description: "2 Scoops" },
      { name: "Gulab Jamun", price: "₹169 / ₹219", variants: "Regular / With Ice Cream" },
      { name: "Chocolate Mousse", price: "₹199" },
      { name: "Chocolate Mud Dessert", price: "₹229" },
    ],
  },
  {
    id: "bakery",
    title: "BAKERY PRE-ORDERS",
    description: "Birthday Cakes, Muffins and Donuts — available on pre-order only",
    items: [
      { name: "Black Forest Cake", price: "₹600 / ₹1,100", variants: "Half / Full", tags: ["pre-order"] },
      { name: "White Forest Cake", price: "₹600 / ₹1,100", variants: "Half / Full", tags: ["pre-order"] },
      { name: "Mud Chocolate Cake", price: "₹650 / ₹1,200", variants: "Half / Full", tags: ["pre-order"] },
      { name: "Fresh Fruit Cake", price: "₹800 / ₹1,500", variants: "Half / Full", tags: ["pre-order"] },
      { name: "Blueberry Muffins", price: "₹800", description: "Set of 12", tags: ["pre-order"] },
      { name: "Chocochip Muffins", price: "₹700", description: "Set of 12", tags: ["pre-order"] },
      { name: "Dark Chocolate Donut", price: "₹800", description: "Set of 10", tags: ["pre-order"] },
    ],
  },
];

export const categoryNavItems = menuCategories.map((cat) => ({
  id: cat.id,
  label: cat.title,
}));
