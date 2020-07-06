import React, { useState, useEffect } from 'react'
import { categoryDb, createDefaultCategories, createCategory } from '../firebase/category'
import { CategoryProps, CategoryContextProps, initialCategory } from '../types/category'

const CategoryContext = React.createContext<CategoryContextProps>(initialCategory)

function CategoryProvider ({ children } : any) {
  const [categories, setCategories] = useState<CategoryProps[]>([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      categoryDb.on('value', (snapshot : any) => {
        const getCategories = snapshot.val()
        const categoriesList : CategoryProps[] = []

        for (let category in getCategories){
          categoriesList.push({
            uid: getCategories[category].uid,
            title: getCategories[category].title
          });
        }

        setCategories(categoriesList)

        // Create categories if needed
        if (categoriesList.length === 0) {
          createDefaultCategories()
        }
      }) 
    }
    
    fetchCategories()
  }, [])

  const addCategory = async (category: CategoryProps) => await createCategory(category)
  return <CategoryContext.Provider value={{ categories, addCategory }} children={children} />
}

function useCategory() {
  const context = React.useContext(CategoryContext)
  if (context === undefined) {
    throw new Error(`useCategory must be used within a CategoryProvider`)
  }
  return context
}

export { CategoryProvider, useCategory }
