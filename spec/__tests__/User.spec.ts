// import supertest from 'supertest';
import request from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import app from '@server';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import enpoints from '../configs/enpoints';

const endpoint = enpoints.user;

describe('Users Routes', () => {

  // let agent: SuperTest<Test>;

  // beforeAll((done) => {
  //   agent = supertest.agent(app);
  //   done();
  // });

  describe(`"GET:${endpoint}"`, () => {

    it(`should return a JSON object with all the users and a status code of "${OK}" if the request was successful.`, (done) => {
      // agent
      request(app)
        .get(endpoint)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err: Error, res: Response) => {
          pErr(err);
          // if (err) return done();
          console.log('oi', res.body, err)
          expect(res.body.rows).toBeTruthy();
          expect(res.body.rows[0].first_name).toEqual('Claudio');
          expect(res.body.rows[0].last_name).toEqual('Ferraz');
          expect(res.body.rows[0].login).toEqual('clauid.ferraz');
          done();
        });
    });
  });

});