import { useState, useEffect } from 'preact/hooks'

export default function ThemeToggle() {
  const isDark = false

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  return (
    <button className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
      {isDark ? '🌞' : '🌙'}
    </button>
  )
}
