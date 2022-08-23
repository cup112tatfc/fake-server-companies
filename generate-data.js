const { faker } = require("@faker-js/faker");
const fs = require("fs");
faker.locale = "vi";

const randomEmployee = (n) => {
  if (n <= 0) return [];
  const employees = [];

  Array.from(new Array(n)).forEach(() => {
    const employee = {
      id: faker.datatype.uuid(),
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
      address: faker.address.city(),
      phoneNumber: faker.phone.phoneNumber(),
      position: { name: faker.database.engine() },
      startDate: faker.date.birthdate(),
    };
    employees.push(employee);
  });
  return employees;
};
const randomDepartment = (n) => {
  if (n <= 0) return [];
  const departments = [];

  Array.from(new Array(n)).forEach(() => {
    const department = {
      id: faker.datatype.uuid(),
      name: faker.company.bsNoun(),
      number_employees: faker.random.numeric(),
      startDate: faker.date.birthdate(),
      address: faker.address.city(),
      manager: { name: faker.name.fullName() },
    };
    departments.push(department);
  });
  return departments;
};
(() => {
  const employees = randomEmployee(100);
  const departments = randomDepartment(15);
  const db = {
    employees: employees,
    departments: departments,
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("successs");
  });
})();
