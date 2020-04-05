const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const Employees = require('../employees.model');
const expect = require('chai').expect;

describe('Employees CRUD', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  after(() => {
    mongoose.models = {};
    mongoose.disconnect();
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employees({
        firstName: 'John',
        lastName: 'Doe',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employees({
        firstName: 'Marry',
        lastName: 'Blood',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpTwo.save();
    });

    after(async () => {
      await Employees.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employees.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employees.findOne({ firstName: 'John' });
      const expectedName = 'John';
      expect(employee.firstName).to.be.equal(expectedName);
    });
    it('should return a proper document by "lastName" with "findOne" method', async () => {
      const employee = await Employees.findOne({ lastName: 'Blood' });
      const expectedLastName = 'Blood';
      expect(employee.lastName).to.be.equal(expectedLastName);
    });
    it('should return a proper document by "department" with "findOne" method', async () => {
      const employee = await Employees.findOne({
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      const expectedDepartment = '5e7b44428bc9ac0f58e9d2f4';
      expect(employee.department).to.be.equal(expectedDepartment);
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Employees.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employees({
        firstName: 'Gil',
        lastName: 'Anderson',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await employee.save();
      const savedEmployee = await Employees.findOne({
        firstName: 'Gil',
      });
      expect(savedEmployee).to.not.be.null;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employees({
        firstName: 'John',
        lastName: 'Doe',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employees({
        firstName: 'Marry',
        lastName: 'Blood',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employees.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employees.updateOne(
        { firstName: 'John' },
        { $set: { lastName: 'Nicolson' } },
      );
      const updatedEmployee = await Employees.findOne({
        lastName: 'Nicolson',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employees.findOne({ firstName: 'John' });
      employee.lastName = 'Nicolson';
      await employee.save();

      const updatedEmployee = await Employees.findOne({
        lastName: 'Nicolson',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employees.updateMany({}, { $set: { department: 'Fired' } });
      const employees = await Employees.find({ department: 'Fired' });
      expect(employees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employees({
        firstName: 'John',
        lastName: 'Doe',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employees({
        firstName: 'Marry',
        lastName: 'Blood',
        department: '5e7b44428bc9ac0f58e9d2f4',
      });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employees.deleteOne({ firstName: 'Marry' });
      const removeEmployee = await Employees.findOne({
        firstName: 'Marry',
      });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employees.findOne({ firstName: 'Marry' });
      await employee.remove();
      const removedEmployee = await Employees.findOne({ firstName: 'Marry' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employees.deleteMany();
      const employees = await Employees.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});
