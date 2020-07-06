import { db } from './config'
import { CategoryProps } from '../types/category'

export const categoryDb = db.ref('categories')

const categories = [{
  "uid": "deportes",
  "title": "Deportes"
}, {
  "uid": "entretenimiento",
  "title": "Entretenimiento"
}, {
  "uid": "general",
  "title": "General"
}, {
  "uid": "moda",
  "title": "Moda"
}, {
  "uid": "juegos",
  "title": "Juegos"
}]

export const createDefaultCategories = async () => {
  categories.map(async (category : CategoryProps) => await createCategory(category))
  return categories
}

export const createCategory = async (category : CategoryProps) => {
  categoryDb.push(category)
}