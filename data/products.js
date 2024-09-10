import { dollarFormat } from "../quickActions/dollarFormat.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(details) {
    this.id = details.id;
    this.image = details.image;
    this.name = details.name;
    this.rating = details.rating;
    this.priceCents = details.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${dollarFormat(this.priceCents)}`;
  }

  showExtraInfo() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(details) {
    super(details);
    this.sizeChartLink = details.sizeChartLink; 
  }

  showExtraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }

}

class Appliance extends Product {

  instructionsLink;
  warrantyLink;

  constructor(details) {

    super(details);

    this.instructionsLink = details.instructionsLink;

    this.warrantyLink = details.warrantyLink;
  }

  showExtraInfo() {
    return `
    <a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

let products = [];

async function fetchBackend() {

  try {
    const fetchData = await fetch('https://supersimplebackend.dev/products');

    console.log(fetchData)

    const data = await fetchData.json();

    products = data.map(product => {
      if (product.type === 'clothing') return new Clothing(product);
      else if (product.type === 'appliance') return new Appliance(product);
      else return new Product(product);
    });
  } catch(error) {
    throw (error);
  }
  
}

export {products, Product, Clothing, Appliance, fetchBackend}