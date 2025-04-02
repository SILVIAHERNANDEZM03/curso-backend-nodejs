const { faker } = require('@faker-js/faker');

class CategoriesService{


  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
      const limit = 20;

      for(let index = 0; index < limit; index++){
        this.categories.push({
          id: faker.string.uuid(),
          name: faker.commerce.department(),
          products: this.generateProducts(5)
        });
      }
  }

  generateProducts(count){
    const products = [];
    for(let i =0; i < count; i++){
      products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
    return products;
  }


  async create(data){
    const newCategory = {
      id: faker.string.uuid(),
      name: data.name,
      products: data.products || []
    };
    this.categories.push(newCategory);
    return newCategory;

  }

  async find(){
    return this.categories;
  }

  async findOne(id){
    return this.categories.find(item => item.id === id);
  }

  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index ===-1){
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];

  }

  async delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index ===-1){
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}
module.exports = CategoriesService;
