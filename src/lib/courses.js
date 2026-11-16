// Fictional course catalogue used by the Student Course API prototype.
// No real student data is stored anywhere in this project.

export const courses = [
  {
    id: 1,
    code: "CS 101",
    name: "Introduction to Computing",
    description:
      "How computers store, process and move information, with small hands-on exercises in problem solving.",
  },
  {
    id: 2,
    code: "IT 204",
    name: "Systems Integration Fundamentals",
    description:
      "How separate systems exchange data through APIs, files and message queues, explained with working examples.",
  },
  {
    id: 3,
    code: "IS 310",
    name: "Database Design",
    description:
      "Turning a written scenario into tables, keys and relationships, then querying the result with SQL.",
  },
  {
    id: 4,
    code: "NET 215",
    name: "Introduction to Networking",
    description:
      "Addresses, ports and protocols: how two machines on different networks find each other and agree on the rules.",
  },
  {
    id: 5,
    code: "SEC 320",
    name: "Application Security Basics",
    description:
      "Common weaknesses in web services and the everyday habits that prevent them: validation, least privilege and safe error messages.",
  },
];

// Small helper so a single-course lookup and the in-app preview share one filter.
export function findCourseById(id) {
  return courses.find((course) => course.id === id) || null;
}
