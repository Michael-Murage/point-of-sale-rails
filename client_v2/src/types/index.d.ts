export interface Supplier {
  id: number,
  image?: string,
  location: string,
  name: string,
  schedule: string,
}

export interface Category {
  id: number,
  name: string
}

export interface Product {
  cost: number,
  desription: string,
  id: number,
  image: string | null,
  name: string,
  no_to_sell?: number,
  price: number,
  quantity: number,
  supplier: Supplier[],
  category: Category
}

export interface User {
  id: number,
  name: string,
}
