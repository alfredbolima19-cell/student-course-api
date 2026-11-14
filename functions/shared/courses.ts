
export const COURSES = [
  {
    id: 1,
    code: "CS 101",
    name: "Introduction to Programming",
    description: "Variables, control flow and functions, taught in Python with weekly lab exercises.",
    credits: 3,
    semester: "1st Semester",
  },
  {
    id: 2,
    code: "IT 210",
    name: "System Integration and Architecture",
    description: "Integration styles, middleware, and designing contracts between independent systems.",
    credits: 3,
    semester: "1st Semester",
  },
  {
    id: 3,
    code: "DB 220",
    name: "Database Systems",
    description: "Relational modelling, SQL querying, and normalisation through third normal form.",
    credits: 3,
    semester: "1st Semester",
  },
  {
    id: 4,
    code: "NET 240",
    name: "Computer Networks",
    description: "The TCP/IP stack, subnetting, and reading real traffic in packet captures.",
    credits: 4,
    semester: "2nd Semester",
  },
  {
    id: 5,
    code: "SE 310",
    name: "Software Engineering",
    description: "Requirements, version control, code review, and shipping in small teams.",
    credits: 3,
    semester: "2nd Semester",
  },
  {
    id: 6,
    code: "SEC 330",
    name: "Information Assurance",
    description: "Threat modelling, access control models, and secure configuration baselines.",
    credits: 3,
    semester: "2nd Semester",
  },
];

export function findCourseById(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id)) return null;
  return COURSES.find((course) => course.id === id) || null;
}

export const COURSE_IDS = COURSES.map((course) => course.id);

