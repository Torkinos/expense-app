import moment from 'moment'
import { Category } from 'src/interfaces/category.interface'
import { Transaction } from 'src/interfaces/transaction.interface'
import { generateId } from 'src/utils/generateId'
import { getRandomFloat } from 'src/utils/getRandomFloat'
import { setCategoriesToLocalStorage } from './localStorage/categories'
import {
    getTransactionsFromLocalStorage,
    setTransactionsToLocalStorage,
} from './localStorage/transactions'
import { getRandomElementFromArray } from './utils/getRandomElementFromArray'

const generateCategories = (): Record<string, Category> => {
    const categoryNames = ['Salary', 'Gifts', 'Food', 'Going out', 'Traveling']
    const categories: Record<string, Category> = {}

    for (let i = 0; i < categoryNames.length; i++) {
        const category: Category = {
            id: generateId(),
            label: categoryNames[i],
        }
        categories[category.id] = category
    }
    return categories
}

const generateMockTransactions = (categories: Category[]): Transaction[] => {
    const transactions: Transaction[] = []
    let initialDate = moment()

    for (let i = 0; i < 100; i++) {
        const date = initialDate.subtract(
            Math.floor(Math.random() * 24),
            'hours'
        )

        initialDate = date

        const amount: number = getRandomFloat(-2000, 2000)
        const category: Category =
            getRandomElementFromArray<Category>(categories)

        const transaction = {
            amount,
            categoryId: category.id,
            date: date.toDate(),
            id: generateId(),
            label:
                amount > 0 ? `Sell ${category.label}` : `Buy ${category.label}`,
        }

        transactions.push(transaction)
    }
    return transactions
}

export const initiateLocalStorageData = () => {
    const localStorageTransactions = getTransactionsFromLocalStorage()

    if (localStorageTransactions.length === 0) {
        const categories: Record<string, Category> = generateCategories()
        const transactions: Transaction[] = generateMockTransactions(
            Object.values(categories)
        )

        setTransactionsToLocalStorage(transactions)
        setCategoriesToLocalStorage(categories)
    }
}
