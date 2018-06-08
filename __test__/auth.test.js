'use strict';


const app = require('../auth-server/src/app.js');
const superagent = require('superagent');

describe('api/v1/signup', () => {

  const PORT = 8888;
  beforeAll(() => {
    app.start(PORT);
  });
  afterAll(() => app.stop());

  it('Throws a 400 error on a bad model', () => {
    return superagent.post('http://localhost:8888/signup')
      .send({
        username: 'Username',
        password: 'unknown',
      })
      .then(Promise.reject)
      .catch(response => {
        console.log('hello: ', response.status);
        expect(response.status).toEqual(400);
      });
  });

});