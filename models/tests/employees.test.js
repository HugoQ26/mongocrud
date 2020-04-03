const Employee = require('../employees.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employees', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "firstName", "lastName", or "department" arg', () => {
    const cases = [
      {},
      { firstName: 'first name', department: 'It' },
      { firstName: 'first name', lastName: 'lastName' },
      { lastName: 'lastName', department: 'It' },
    ];
    for (let employee of cases) {
      const empl = new Employee(employee);

      empl.validate(err => expect(err.errors).to.exist);
    }
  });

  it('should throw an error if "firstName", "lastName", or "department" is not a string', () => {
    const cases = [
      { firstName: {}, lastName: 'lastName', department: 'It' },
      { firstName: [], lastName: 'lastName', department: 'It' },
      { firstName: 'firstName', lastName: {}, department: 'It' },
      { firstName: 'firstName', lastName: [], department: 'It' },
      { firstName: 'firstName', lastName: 'lastName', department: {} },
      { firstName: 'firstName', lastName: 'lastName', department: [] },
    ];
    for (let employee of cases) {
      const empl = new Employee(employee);

      empl.validate(err => expect(err.errors).to.exist);
    }
  });

  it('should not throw an error if "employee" is okay', () => {
    const empl = new Employee({
      firstName: 'firstName',
      lastName: 'lastName',
      department: 'It',
    });

    empl.validate(err => expect(err).to.not.exist);
  });
});
