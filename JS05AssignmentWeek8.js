/* 
   Author:  Christian Mena-Osorio
   Subject:  Assignment Week 8
   JS5 Coding Assignment 
*/

/*
  Create a menu app as seen in this week’s video. 
  What you create is up to you as long as it meets the following requirements:
    * Use at least one array.
    * Use at least two classes.
    * Your menu should have the options to create, view, and delete elements.
*/

// create main menu
class MenuItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  display() {
    return `${this.name} - $${this.price.toFixed(2)}`;
  }
}

// create manu category
class MenuCategory {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

//method to add an item
  addItem(name, price) {
    const newItem = new MenuItem(name, price);
    this.items.push(newItem);
    return newItem;
  }

// method to view category
  viewCategory() {
    if (this.items.length === 0) {
      return `${this.name} is empty.`;
    }

    return this.items.map((item, index) => `${index + 1}. ${item.display()}`).join('\n');
  }

// method to delete an item
  deleteItem(index) {
    if (index >= 0 && index < this.items.length) {
      const deletedItem = this.items.splice(index, 1);
      return `${deletedItem[0].name} has been removed from ${this.name}.`;
    } else {
      return `Invalid index. No item deleted from ${this.name}.`;
    }
  }
}

// Menu
class RestaurantMenu {
  constructor(restaurantName) {
    this.restaurantName = restaurantName;
    this.appetizers = new MenuCategory('Appetizers');
    this.drinks = new MenuCategory('Drinks');
    this.salads = new MenuCategory('Salads');
    this.mainDishes = new MenuCategory('Main Dishes');
  }

// method to display restaurant name
  displayRestaurantName() {
    console.log(`Welcome to ${this.restaurantName} Restaurant!`);
  }

  startMenuApp() {
    let userInput;

    do {
      this.displayMenuOptions();
      userInput = prompt('Enter the option number: ');

      switch (userInput) {
        case '1':
          this.addItemToCategory(this.appetizers);
          break;

        case '2':
          this.addItemToCategory(this.drinks);
          break;

        case '3':
          this.addItemToCategory(this.salads);
          break;

        case '4':
          this.addItemToCategory(this.mainDishes);
          break;

        case '5':
          this.viewMenu();
          break;

        case '6':
          this.deleteItem();
          break;

        case '7':
          console.log('Exiting Restaurant Menu App. Goodbye!');
          break;

        default:
          console.log('Invalid option. Please try again.');
      }
    } while (userInput !== '7');
  }

  // method to display options
  displayMenuOptions() {
    console.log('Restaurant Menu Options:');
    console.log('1. Add a new item to Appetizers');
    console.log('2. Add a new item to Drinks');
    console.log('3. Add a new item to Salads');
    console.log('4. Add a new item to Main Dishes');
    console.log('5. View Menu');
    console.log('6. Delete an item');
    console.log('7. Exit');
  }

  // method to add a category item
  addItemToCategory(category) {
    const itemName = prompt(`Enter the name of the item for ${category.name}: `);
    const itemPrice = parseFloat(prompt('Enter the price of the item: '));
    category.addItem(itemName, itemPrice);
  }

  // method to display menu
  viewMenu() {
    console.log('Appetizers:\n', this.appetizers.viewCategory());
    console.log('Drinks:\n', this.drinks.viewCategory());
    console.log('Salads:\n', this.salads.viewCategory());
    console.log('Main Dishes:\n', this.mainDishes.viewCategory());
  }

  // method to delete an item
  deleteItem() {
    const categoryIndex = parseInt(prompt('Enter the category index (1-4): ')) - 1;
    const categoryArray = [this.appetizers, this.drinks, this.salads, this.mainDishes];

    if (categoryIndex >= 0 && categoryIndex < categoryArray.length) {
      const category = categoryArray[categoryIndex];
      const indexToDelete = parseInt(prompt('Enter the index of the item to delete: '));
      console.log(category.deleteItem(indexToDelete - 1));
    } else {
      console.log('Invalid category index.');
    }
  }
}

const restaurantMenu = new RestaurantMenu('My Restaurant');
restaurantMenu.displayRestaurantName();
restaurantMenu.startMenuApp();
