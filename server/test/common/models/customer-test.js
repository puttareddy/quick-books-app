'use strict';

const expect = require('chai').expect;
const app = require('../../../server/server');
const customer = app.models.Customer;

describe('with a known postal code', () => {
  let data;

  before((done) => {
    customer.byId('A0A0A1', (err, responseData) => {
      data = responseData.data;
      done();
    });
  });

  it('should set postal code', () => {
    expect(data.postalCode).to.eql('A0A0A1');
  });

  it('should set retirementSavings', () => {
    expect(data.retirementSavings).to.eql('Non-CMA, Newfoundland and Labrador');
  });

  it('should set educationSavings', () => {
    expect(data.educationSavings).to.eql('Newfoundland and Labrador');
  });

  it('should set healthExpenses', () => {
    expect(data.healthExpenses).to.eql('Non-CMA, Newfoundland and Labrador');
  });

  it('should set retirementExpenses', () => {
    expect(data.retirementExpenses).to.eql('Newfoundland and Labrador');
  });

  it('should set housingCosts', () => {
    expect(data.housingCosts).to.eql('A0A');
  });
});
