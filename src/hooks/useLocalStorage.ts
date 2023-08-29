import { useState } from 'react'

type ValueSetter<T> = (value: T) => void

export function useLocalStorage<T>(key: string, initialValue: T): [T, ValueSetter<T>] {
	const storedValue = localStorage.getItem(key)
	const initial = storedValue ? JSON.parse(storedValue) : initialValue

	const [value, setValue] = useState<T>(initial)

	const updateValue: ValueSetter<T> = (newValue) => {
		setValue(newValue)
		localStorage.setItem(key, JSON.stringify(newValue))
	}

	return [value, updateValue]
}
