/**
 * Data Management for EduStream
 */
const DataStore = (() => {
    const STORAGE_KEY = 'eduStreamData_v2';

    let data = {
        users: [],
        students: [],
        courses: [],
        enrollments: [],
        attendance: [],
        results: []
    };

    const init = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            data = JSON.parse(saved);
        } else {
            // Seed Admin
            data.users.push({
                name: 'System Admin',
                username: 'admin',
                password: '123',
                role: 'Admin'
            });

            // Seed some courses
            data.courses.push(
                { code: 'CS101', name: 'Computer Science 101', credits: 4 },
                { code: 'MTH202', name: 'Advanced Mathematics', credits: 3 },
                { code: 'ENG105', name: 'Business Communication', credits: 2 }
            );

            // Seed some students
            data.students.push(
                { regNo: 'S101', name: 'John Doe', dept: 'CS', year: '1st Year' },
                { regNo: 'S102', name: 'Jane Smith', dept: 'IT', year: '2nd Year' }
            );

            // Seed demo student user
            data.users.push({
                name: 'John Doe',
                username: 'john',
                password: '123',
                role: 'Student',
                regNo: 'S101'
            });

            save();
        }
    };

    const save = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    // Users
    const getUsers = () => data.users;
    const addUser = (user) => {
        if (data.users.some(u => u.username === user.username)) return false;
        data.users.push(user);
        save();
        return true;
    };

    // Students
    const getStudents = () => data.students;
    const addStudent = (student) => {
        if (data.students.some(s => s.regNo === student.regNo)) return false;
        data.students.push(student);
        save();
        return true;
    };
    const deleteStudent = (regNo) => {
        data.students = data.students.filter(s => s.regNo !== regNo);
        data.enrollments = data.enrollments.filter(e => e.studentRegNo !== regNo);
        data.attendance = data.attendance.filter(a => a.studentRegNo !== regNo);
        data.results = data.results.filter(r => r.studentRegNo !== regNo);
        save();
    };

    // Courses
    const getCourses = () => data.courses;
    const addCourse = (course) => {
        if (data.courses.some(c => c.code === course.code)) return false;
        data.courses.push(course);
        save();
        return true;
    };
    const deleteCourse = (code) => {
        data.courses = data.courses.filter(c => c.code !== code);
        data.enrollments = data.enrollments.filter(e => e.courseCode !== code);
        save();
    };

    // Enrollments
    const getEnrollments = () => data.enrollments;
    const addEnrollment = (enroll) => {
        if (data.enrollments.some(e => e.studentRegNo === enroll.studentRegNo && e.courseCode === enroll.courseCode)) return false;
        data.enrollments.push(enroll);
        save();
        return true;
    };

    // Attendance
    const getAttendance = () => data.attendance;
    const addAttendance = (record) => {
        data.attendance.push(record);
        save();
    };

    // Results
    const getResults = () => data.results;
    const addResult = (result) => {
        const idx = data.results.findIndex(r => r.studentRegNo === result.studentRegNo && r.courseCode === result.courseCode);
        if (idx > -1) data.results[idx] = result;
        else data.results.push(result);
        save();
    };

    init();

    return {
        getUsers, addUser,
        getStudents, addStudent, deleteStudent,
        getCourses, addCourse, deleteCourse,
        getEnrollments, addEnrollment,
        getAttendance, addAttendance,
        getResults, addResult
    };
})();
