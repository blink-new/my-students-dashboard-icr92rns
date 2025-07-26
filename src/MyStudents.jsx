import { useState } from "react"
import {
  Users,
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  UserCheck,
  Edit,
  MessageSquare,
  FileText,
  Star,
  Clock,
  Grid3X3,
  List,
} from "lucide-react"
import "./MyStudents.css"

const MyStudents = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Mock data - replace with actual API calls
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

  const students = [
    {
      id: 1,
      name: "John Smith",
      rollNo: "001",
      class: "Class 10-A",
      classId: "class-10a",
      subjects: ["Mathematics", "Physics"],
      subjectIds: ["math", "physics"],
      email: "john.smith@email.com",
      phone: "+1 234-567-8901",
      parent: "Robert Smith",
      parentPhone: "+1 234-567-8902",
      avatar: "JS",
      attendance: 95,
      grade: "A",
      lastSeen: "2024-01-15",
      performance: "excellent",
      assignments: { completed: 18, total: 20 },
      dateOfBirth: "2008-05-15",
      address: "123 Main St, City, State",
    },
    {
      id: 2,
      name: "Emma Johnson",
      rollNo: "002",
      class: "Class 10-A",
      classId: "class-10a",
      subjects: ["Mathematics", "Chemistry"],
      subjectIds: ["math", "chemistry"],
      email: "emma.johnson@email.com",
      phone: "+1 234-567-8903",
      parent: "Sarah Johnson",
      parentPhone: "+1 234-567-8904",
      avatar: "EJ",
      attendance: 92,
      grade: "A-",
      lastSeen: "2024-01-15",
      performance: "good",
      assignments: { completed: 17, total: 20 },
      dateOfBirth: "2008-08-22",
      address: "456 Oak Ave, City, State",
    },
    {
      id: 3,
      name: "Michael Brown",
      rollNo: "003",
      class: "Class 10-B",
      classId: "class-10b",
      subjects: ["Physics", "Chemistry"],
      subjectIds: ["physics", "chemistry"],
      email: "michael.brown@email.com",
      phone: "+1 234-567-8905",
      parent: "David Brown",
      parentPhone: "+1 234-567-8906",
      avatar: "MB",
      attendance: 88,
      grade: "B+",
      lastSeen: "2024-01-14",
      performance: "average",
      assignments: { completed: 15, total: 20 },
      dateOfBirth: "2008-03-10",
      address: "789 Pine St, City, State",
    },
    {
      id: 4,
      name: "Sarah Davis",
      rollNo: "004",
      class: "Class 11-A",
      classId: "class-11a",
      subjects: ["Mathematics", "English"],
      subjectIds: ["math", "english"],
      email: "sarah.davis@email.com",
      phone: "+1 234-567-8907",
      parent: "Lisa Davis",
      parentPhone: "+1 234-567-8908",
      avatar: "SD",
      attendance: 97,
      grade: "A+",
      lastSeen: "2024-01-15",
      performance: "excellent",
      assignments: { completed: 19, total: 20 },
      dateOfBirth: "2007-11-28",
      address: "321 Elm St, City, State",
    },
    {
      id: 5,
      name: "David Wilson",
      rollNo: "005",
      class: "Class 11-B",
      classId: "class-11b",
      subjects: ["Physics", "English"],
      subjectIds: ["physics", "english"],
      email: "david.wilson@email.com",
      phone: "+1 234-567-8909",
      parent: "Mark Wilson",
      parentPhone: "+1 234-567-8910",
      avatar: "DW",
      attendance: 85,
      grade: "B",
      lastSeen: "2024-01-13",
      performance: "needs_improvement",
      assignments: { completed: 14, total: 20 },
      dateOfBirth: "2007-07-05",
      address: "654 Maple Dr, City, State",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      rollNo: "006",
      class: "Class 10-A",
      classId: "class-10a",
      subjects: ["Mathematics", "Physics"],
      subjectIds: ["math", "physics"],
      email: "lisa.anderson@email.com",
      phone: "+1 234-567-8911",
      parent: "Jennifer Anderson",
      parentPhone: "+1 234-567-8912",
      avatar: "LA",
      attendance: 93,
      grade: "A-",
      lastSeen: "2024-01-15",
      performance: "good",
      assignments: { completed: 16, total: 20 },
      dateOfBirth: "2008-12-03",
      address: "987 Cedar Ln, City, State",
    },
  ]

  // Filter students based on search term, class, and subject
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesClass = selectedClass === "" || selectedClass === "all" || student.classId === selectedClass

    const matchesSubject =
      selectedSubject === "" || selectedSubject === "all" || student.subjectIds.includes(selectedSubject)

    return matchesSearch && matchesClass && matchesSubject
  })

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "rollNo":
        return a.rollNo.localeCompare(b.rollNo)
      case "class":
        return a.class.localeCompare(b.class)
      case "attendance":
        return b.attendance - a.attendance
      case "grade":
        return a.grade.localeCompare(b.grade)
      default:
        return 0
    }
  })

  // Get performance color
  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "excellent":
        return "excellent"
      case "good":
        return "good"
      case "average":
        return "average"
      case "needs_improvement":
        return "needs-improvement"
      default:
        return "average"
    }
  }

  // Export students data
  const exportStudents = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Roll No,Name,Class,Email,Phone,Parent,Parent Phone,Attendance,Grade\n" +
      sortedStudents
        .map(
          (student) =>
            `${student.rollNo},${student.name},${student.class},${student.email},${student.phone},${student.parent},${student.parentPhone},${student.attendance}%,${student.grade}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "my_students.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Open student details modal
  const openStudentModal = (student) => {
    setSelectedStudent(student)
    setShowModal(true)
  }

  // Close modal
  const closeModal = () => {
    setShowModal(false)
    setSelectedStudent(null)
  }

  return (
    <div className="my-students">
      {/* Header */}
      <div className="students-header">
        <div className="header-content">
          <div className="header-title">
            <div className="header-icon-wrapper">
              <Users className="header-icon" />
            </div>
            <div className="header-text">
              <h1>My Students</h1>
              <p>Manage and view your students across all classes</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{classes.length - 1}</div>
              <div className="stat-label">Classes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="students-controls">
        <div className="controls-row">
          <div className="search-group">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search students by name, roll no, or email..."
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
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="name">Sort by Name</option>
                <option value="rollNo">Sort by Roll No</option>
                <option value="class">Sort by Class</option>
                <option value="attendance">Sort by Attendance</option>
                <option value="grade">Sort by Grade</option>
              </select>
            </div>
          </div>

          <div className="action-group">
            <button className="view-toggle" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? <List className="btn-icon" /> : <Grid3X3 className="btn-icon" />}
              {viewMode === "grid" ? "List View" : "Grid View"}
            </button>
            <button className="export-btn" onClick={exportStudents}>
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>

        <div className="results-info">
          <span>
            Showing {sortedStudents.length} of {students.length} students
          </span>
        </div>
      </div>

      {/* Students Grid/List */}
      <div className={`students-container ${viewMode}`}>
        {sortedStudents.length > 0 ? (
          <div className={`students-${viewMode}`}>
            {sortedStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <div className="student-avatar">{student.avatar}</div>
                  <div className="student-basic-info">
                    <h3 className="student-name">{student.name}</h3>
                    <p className="student-roll">Roll No: {student.rollNo}</p>
                    <p className="student-class">{student.class}</p>
                  </div>
                  <div className="student-actions">
                    <button className="action-btn" onClick={() => openStudentModal(student)} title="View Details">
                      <Eye className="action-icon" />
                    </button>
                    <button className="action-btn" title="Send Email">
                      <Mail className="action-icon" />
                    </button>
                    <button className="action-btn" title="Send Message">
                      <MessageSquare className="action-icon" />
                    </button>
                  </div>
                </div>

                <div className="student-subjects">
                  <span className="subjects-label">Subjects:</span>
                  <div className="subjects-list">
                    {student.subjects.map((subject, index) => (
                      <span key={index} className="subject-tag">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="student-stats">
                  <div className="stat-item">
                    <UserCheck className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">{student.attendance}%</span>
                      <span className="stat-label">Attendance</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <TrendingUp className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">{student.grade}</span>
                      <span className="stat-label">Grade</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <FileText className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">
                        {student.assignments.completed}/{student.assignments.total}
                      </span>
                      <span className="stat-label">Assignments</span>
                    </div>
                  </div>
                </div>

                <div className="student-footer">
                  <div className={`performance-badge ${getPerformanceColor(student.performance)}`}>
                    <Star className="performance-icon" />
                    {student.performance.replace("_", " ")}
                  </div>
                  <div className="last-seen">
                    <Clock className="time-icon" />
                    Last seen: {new Date(student.lastSeen).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Users className="empty-icon" />
            <h3>No Students Found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-student-info">
                <div className="modal-avatar">{selectedStudent.avatar}</div>
                <div className="modal-student-text">
                  <h2>{selectedStudent.name}</h2>
                  <p>
                    Roll No: {selectedStudent.rollNo} • {selectedStudent.class}
                  </p>
                </div>
              </div>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Mail className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">Email</span>
                      <span className="info-value">{selectedStudent.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Phone className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{selectedStudent.phone}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Users className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">Parent</span>
                      <span className="info-value">{selectedStudent.parent}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Phone className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">Parent Phone</span>
                      <span className="info-value">{selectedStudent.parentPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Academic Information</h3>
                <div className="academic-stats">
                  <div className="academic-stat">
                    <span className="academic-label">Subjects</span>
                    <div className="subjects-list">
                      {selectedStudent.subjects.map((subject, index) => (
                        <span key={index} className="subject-tag">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="academic-stat">
                    <span className="academic-label">Current Grade</span>
                    <span className="academic-value grade">{selectedStudent.grade}</span>
                  </div>
                  <div className="academic-stat">
                    <span className="academic-label">Attendance Rate</span>
                    <span className="academic-value attendance">{selectedStudent.attendance}%</span>
                  </div>
                  <div className="academic-stat">
                    <span className="academic-label">Assignments Completed</span>
                    <span className="academic-value assignments">
                      {selectedStudent.assignments.completed}/{selectedStudent.assignments.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Calendar className="info-icon" />
                    <div className="info-text">
                      <span className="info-label">Date of Birth</span>
                      <span className="info-value">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="info-item full-width">
                    <div className="info-text">
                      <span className="info-label">Address</span>
                      <span className="info-value">{selectedStudent.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>
                Close
              </button>
              <button className="modal-btn primary">
                <Edit className="btn-icon" />
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyStudents