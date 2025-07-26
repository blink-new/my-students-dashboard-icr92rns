import { useState } from "react"
import {
  BarChart3,
  Search,
  Download,
  Plus,
  Edit,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Calendar,
  Filter,
  Eye,
  FileText,
  Award,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import "./Grade.css"

const Grade = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState("")
  const [viewMode, setViewMode] = useState("cards") // cards or table
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [sortBy, setSortBy] = useState("student")

  // Mock data
  const classes = [
    { id: "all", name: "All Classes" },
    { id: "class-10a", name: "Class 10-A" },
    { id: "class-10b", name: "Class 10-B" },
    { id: "class-11a", name: "Class 11-A" },
    { id: "class-11b", name: "Class 11-B" },
  ]

  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "math", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "english", name: "English" },
  ]

  const assignments = [
    { id: "all", name: "All Assignments" },
    { id: "midterm", name: "Midterm Exam" },
    { id: "final", name: "Final Exam" },
    { id: "quiz1", name: "Quiz 1" },
    { id: "project", name: "Class Project" },
  ]

  const grades = [
    {
      id: 1,
      studentId: 1,
      studentName: "John Smith",
      rollNo: "001",
      class: "Class 10-A",
      classId: "class-10a",
      subject: "Mathematics",
      subjectId: "math",
      assignment: "Midterm Exam",
      assignmentId: "midterm",
      grade: "A",
      score: 92,
      maxScore: 100,
      percentage: 92,
      submittedDate: "2024-01-15",
      gradedDate: "2024-01-18",
      feedback: "Excellent work on algebraic equations",
      status: "graded",
    },
    {
      id: 2,
      studentId: 1,
      studentName: "John Smith",
      rollNo: "001",
      class: "Class 10-A",
      classId: "class-10a",
      subject: "Physics",
      subjectId: "physics",
      assignment: "Quiz 1",
      assignmentId: "quiz1",
      grade: "B+",
      score: 87,
      maxScore: 100,
      percentage: 87,
      submittedDate: "2024-01-12",
      gradedDate: "2024-01-14",
      feedback: "Good understanding of mechanics",
      status: "graded",
    },
    {
      id: 3,
      studentId: 2,
      studentName: "Emma Johnson",
      rollNo: "002",
      class: "Class 10-A",
      classId: "class-10a",
      subject: "Mathematics",
      subjectId: "math",
      assignment: "Midterm Exam",
      assignmentId: "midterm",
      grade: "A-",
      score: 89,
      maxScore: 100,
      percentage: 89,
      submittedDate: "2024-01-15",
      gradedDate: "2024-01-18",
      feedback: "Strong performance overall",
      status: "graded",
    },
    {
      id: 4,
      studentId: 3,
      studentName: "Michael Brown",
      rollNo: "003",
      class: "Class 10-B",
      classId: "class-10b",
      subject: "Chemistry",
      subjectId: "chemistry",
      assignment: "Final Exam",
      assignmentId: "final",
      grade: "B",
      score: 82,
      maxScore: 100,
      percentage: 82,
      submittedDate: "2024-01-20",
      gradedDate: "2024-01-22",
      feedback: "Needs improvement in organic chemistry",
      status: "graded",
    },
    {
      id: 5,
      studentId: 4,
      studentName: "Sarah Davis",
      rollNo: "004",
      class: "Class 11-A",
      classId: "class-11a",
      subject: "English",
      subjectId: "english",
      assignment: "Class Project",
      assignmentId: "project",
      grade: "A+",
      score: 98,
      maxScore: 100,
      percentage: 98,
      submittedDate: "2024-01-10",
      gradedDate: "2024-01-15",
      feedback: "Outstanding creative writing",
      status: "graded",
    },
    {
      id: 6,
      studentId: 5,
      studentName: "David Wilson",
      rollNo: "005",
      class: "Class 11-B",
      classId: "class-11b",
      subject: "Physics",
      subjectId: "physics",
      assignment: "Midterm Exam",
      assignmentId: "midterm",
      grade: "C+",
      score: 75,
      maxScore: 100,
      percentage: 75,
      submittedDate: "2024-01-15",
      gradedDate: "",
      feedback: "",
      status: "pending",
    },
  ]

  // Filter grades
  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.rollNo.includes(searchTerm) ||
      grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesClass = selectedClass === "" || selectedClass === "all" || grade.classId === selectedClass
    const matchesSubject = selectedSubject === "" || selectedSubject === "all" || grade.subjectId === selectedSubject
    const matchesAssignment = selectedAssignment === "" || selectedAssignment === "all" || grade.assignmentId === selectedAssignment

    return matchesSearch && matchesClass && matchesSubject && matchesAssignment
  })

  // Sort grades
  const sortedGrades = [...filteredGrades].sort((a, b) => {
    switch (sortBy) {
      case "student":
        return a.studentName.localeCompare(b.studentName)
      case "grade":
        return b.percentage - a.percentage
      case "subject":
        return a.subject.localeCompare(b.subject)
      case "assignment":
        return a.assignment.localeCompare(b.assignment)
      case "date":
        return new Date(b.submittedDate) - new Date(a.submittedDate)
      default:
        return 0
    }
  })

  // Calculate statistics
  const totalGrades = filteredGrades.length
  const gradedCount = filteredGrades.filter(g => g.status === "graded").length
  const pendingCount = filteredGrades.filter(g => g.status === "pending").length
  const averageScore = filteredGrades.length > 0 
    ? Math.round(filteredGrades.reduce((sum, g) => sum + g.percentage, 0) / filteredGrades.length)
    : 0

  // Grade distribution
  const gradeDistribution = {
    "A+": filteredGrades.filter(g => g.percentage >= 97).length,
    "A": filteredGrades.filter(g => g.percentage >= 93 && g.percentage < 97).length,
    "A-": filteredGrades.filter(g => g.percentage >= 90 && g.percentage < 93).length,
    "B+": filteredGrades.filter(g => g.percentage >= 87 && g.percentage < 90).length,
    "B": filteredGrades.filter(g => g.percentage >= 83 && g.percentage < 87).length,
    "B-": filteredGrades.filter(g => g.percentage >= 80 && g.percentage < 83).length,
    "C+": filteredGrades.filter(g => g.percentage >= 77 && g.percentage < 80).length,
    "C": filteredGrades.filter(g => g.percentage >= 73 && g.percentage < 77).length,
    "Below C": filteredGrades.filter(g => g.percentage < 73).length,
  }

  // Get grade color
  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "excellent"
    if (percentage >= 80) return "good"
    if (percentage >= 70) return "average"
    return "needs-improvement"
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="status-icon graded" />
      case "pending":
        return <Clock className="status-icon pending" />
      case "late":
        return <AlertCircle className="status-icon late" />
      default:
        return <XCircle className="status-icon missing" />
    }
  }

  // Export grades
  const exportGrades = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Student,Roll No,Class,Subject,Assignment,Grade,Score,Max Score,Percentage,Status,Submitted Date,Graded Date\n" +
      sortedGrades
        .map(
          (grade) =>
            `${grade.studentName},${grade.rollNo},${grade.class},${grade.subject},${grade.assignment},${grade.grade},${grade.score},${grade.maxScore},${grade.percentage}%,${grade.status},${grade.submittedDate},${grade.gradedDate}`
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "grades_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Open grade modal
  const openGradeModal = (grade) => {
    setSelectedGrade(grade)
    setShowGradeModal(true)
  }

  // Close modal
  const closeModal = () => {
    setShowGradeModal(false)
    setSelectedGrade(null)
  }

  return (
    <div className="grades-page">
      {/* Header */}
      <div className="grades-header">
        <div className="header-content">
          <div className="header-title">
            <BarChart3 className="header-icon" />
            <div>
              <h1>Grade Management</h1>
              <p>Track and manage student grades across all subjects</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon-wrapper excellent">
                <Award className="stat-icon" />
              </div>
              <div className="stat-info">
                <span className="stat-number">{averageScore}%</span>
                <span className="stat-label">Average Score</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper good">
                <Users className="stat-icon" />
              </div>
              <div className="stat-info">
                <span className="stat-number">{totalGrades}</span>
                <span className="stat-label">Total Grades</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper pending">
                <Clock className="stat-icon" />
              </div>
              <div className="stat-info">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="grade-distribution">
        <h3>Grade Distribution</h3>
        <div className="distribution-chart">
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <div key={grade} className="distribution-bar">
              <div className="bar-label">{grade}</div>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: totalGrades > 0 ? `${(count / totalGrades) * 100}%` : '0%',
                    backgroundColor: grade.includes('A') ? '#10b981' : 
                                   grade.includes('B') ? '#3b82f6' : 
                                   grade.includes('C') ? '#f59e0b' : '#ef4444'
                  }}
                ></div>
              </div>
              <div className="bar-count">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grades-controls">
        <div className="controls-row">
          <div className="search-group">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by student name, roll no, or assignment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-item">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="filter-select"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="filter-select"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="filter-select"
              >
                {assignments.map((assignment) => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="student">Sort by Student</option>
                <option value="grade">Sort by Grade</option>
                <option value="subject">Sort by Subject</option>
                <option value="assignment">Sort by Assignment</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>

          <div className="action-group">
            <button 
              className="view-toggle" 
              onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
            >
              {viewMode === "cards" ? "Table View" : "Card View"}
            </button>
            <button className="add-grade-btn">
              <Plus className="btn-icon" />
              Add Grade
            </button>
            <button className="export-btn" onClick={exportGrades}>
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>

        <div className="results-info">
          <span>
            Showing {sortedGrades.length} of {totalGrades} grades
          </span>
        </div>
      </div>

      {/* Grades Content */}
      <div className={`grades-container ${viewMode}`}>
        {sortedGrades.length > 0 ? (
          viewMode === "cards" ? (
            <div className="grades-grid">
              {sortedGrades.map((grade) => (
                <div key={grade.id} className="grade-card">
                  <div className="grade-header">
                    <div className="student-info">
                      <div className="student-avatar">
                        {grade.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="student-details">
                        <h4 className="student-name">{grade.studentName}</h4>
                        <p className="student-roll">Roll No: {grade.rollNo}</p>
                        <p className="student-class">{grade.class}</p>
                      </div>
                    </div>
                    <div className="grade-status">
                      {getStatusIcon(grade.status)}
                    </div>
                  </div>

                  <div className="assignment-info">
                    <div className="assignment-details">
                      <BookOpen className="assignment-icon" />
                      <div>
                        <span className="subject-name">{grade.subject}</span>
                        <span className="assignment-name">{grade.assignment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grade-score">
                    <div className={`grade-display ${getGradeColor(grade.percentage)}`}>
                      <span className="grade-letter">{grade.grade}</span>
                      <span className="grade-percentage">{grade.percentage}%</span>
                    </div>
                    <div className="score-details">
                      <span className="score-fraction">{grade.score}/{grade.maxScore}</span>
                    </div>
                  </div>

                  <div className="grade-progress">
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getGradeColor(grade.percentage)}`}
                        style={{ width: `${grade.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grade-footer">
                    <div className="grade-dates">
                      <Calendar className="date-icon" />
                      <span>Submitted: {new Date(grade.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="grade-actions">
                      <button 
                        className="action-btn"
                        onClick={() => openGradeModal(grade)}
                      >
                        <Eye className="action-icon" />
                      </button>
                      <button className="action-btn">
                        <Edit className="action-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grades-table">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Assignment</th>
                    <th>Grade</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedGrades.map((grade) => (
                    <tr key={grade.id}>
                      <td>
                        <div className="table-student">
                          <div className="table-avatar">
                            {grade.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="table-student-name">{grade.studentName}</div>
                            <div className="table-student-roll">{grade.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      <td>{grade.subject}</td>
                      <td>{grade.assignment}</td>
                      <td>
                        <span className={`table-grade ${getGradeColor(grade.percentage)}`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td>
                        <div className="table-score">
                          <span>{grade.score}/{grade.maxScore}</span>
                          <span className="table-percentage">({grade.percentage}%)</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-status">
                          {getStatusIcon(grade.status)}
                          <span className={`status-text ${grade.status}`}>
                            {grade.status}
                          </span>
                        </div>
                      </td>
                      <td>{new Date(grade.submittedDate).toLocaleDateString()}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="table-action-btn"
                            onClick={() => openGradeModal(grade)}
                          >
                            <Eye className="table-action-icon" />
                          </button>
                          <button className="table-action-btn">
                            <Edit className="table-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="empty-state">
            <BarChart3 className="empty-icon" />
            <h3>No Grades Found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Grade Details Modal */}
      {showGradeModal && selectedGrade && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-grade-info">
                <div className="modal-avatar">
                  {selectedGrade.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2>{selectedGrade.studentName}</h2>
                  <p>{selectedGrade.subject} • {selectedGrade.assignment}</p>
                </div>
              </div>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Grade Details</h3>
                <div className="grade-details-grid">
                  <div className="detail-item">
                    <Target className="detail-icon" />
                    <div>
                      <span className="detail-label">Final Grade</span>
                      <span className={`detail-value grade ${getGradeColor(selectedGrade.percentage)}`}>
                        {selectedGrade.grade}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <BarChart3 className="detail-icon" />
                    <div>
                      <span className="detail-label">Score</span>
                      <span className="detail-value">
                        {selectedGrade.score}/{selectedGrade.maxScore} ({selectedGrade.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <BookOpen className="detail-icon" />
                    <div>
                      <span className="detail-label">Subject</span>
                      <span className="detail-value">{selectedGrade.subject}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FileText className="detail-icon" />
                    <div>
                      <span className="detail-label">Assignment</span>
                      <span className="detail-value">{selectedGrade.assignment}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Timeline</h3>
                <div className="timeline-grid">
                  <div className="timeline-item">
                    <Calendar className="timeline-icon" />
                    <div>
                      <span className="timeline-label">Submitted</span>
                      <span className="timeline-value">
                        {new Date(selectedGrade.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {selectedGrade.gradedDate && (
                    <div className="timeline-item">
                      <CheckCircle className="timeline-icon" />
                      <div>
                        <span className="timeline-label">Graded</span>
                        <span className="timeline-value">
                          {new Date(selectedGrade.gradedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedGrade.feedback && (
                <div className="modal-section">
                  <h3>Feedback</h3>
                  <div className="feedback-content">
                    <p>{selectedGrade.feedback}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>
                Close
              </button>
              <button className="modal-btn primary">
                <Edit className="btn-icon" />
                Edit Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Grade