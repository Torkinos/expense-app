import { setItemToLocalStorage } from 'src/localStorage/utils/setItemToLocalStorage'
import { getItemFromLocalStorage } from 'src/localStorage/utils/getItemFromLocalStorage'
import { Category } from 'src/interfaces/category.interface'
import { LocalStorageKeys } from 'src/enums/localStorageKeys.enum'

export const getCategoriesFromLocalStorage = (): Category[] => {
    return (
        getItemFromLocalStorage<Category[]>(LocalStorageKeys.CATEGORIES) || []
    )
}

export const setCategoriesToLocalStorage = (
    categories: Record<string, Category>
): void => {
    setItemToLocalStorage(LocalStorageKeys.CATEGORIES, categories)
}
