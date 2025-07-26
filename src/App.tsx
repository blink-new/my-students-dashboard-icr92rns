import { useState } from 'react'
import MyStudents from './MyStudents'
import Grade from './Grade'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('students')

  return (
    <div className="App">
      <nav style={{ 
        padding: '1rem 2rem', 
        background: 'white', 
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '0',
        display: 'flex',
        gap: '1rem'
      }}>
        <button 
          onClick={() => setCurrentPage('students')}
          style={{
            padding: '0.5rem 1rem',
            border: currentPage === 'students' ? '2px solid #6366f1' : '2px solid #e2e8f0',
            borderRadius: '0.5rem',
            background: currentPage === 'students' ? '#f0f4ff' : 'white',
            color: currentPage === 'students' ? '#6366f1' : '#64748b',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Students
        </button>
        <button 
          onClick={() => setCurrentPage('grades')}
          style={{
            padding: '0.5rem 1rem',
            border: currentPage === 'grades' ? '2px solid #6366f1' : '2px solid #e2e8f0',
            borderRadius: '0.5rem',
            background: currentPage === 'grades' ? '#f0f4ff' : 'white',
            color: currentPage === 'grades' ? '#6366f1' : '#64748b',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Grades
        </button>
      </nav>
      
      {currentPage === 'students' ? <MyStudents /> : <Grade />}
    </div>
  )
}

export default App