export const MaxQuestions = () => {
  return (
    <select
      id='question-count'
      className='border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 dark:bg-gray-700'
    >
      <option value='5'>5</option>
      <option value='10'>10</option>
      <option value='15'>15</option>
    </select>
  )
}
