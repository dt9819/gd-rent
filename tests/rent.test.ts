import request from 'supertest';
describe('Request OTP Endpoint', () => {
  it("It should send OTP to user' Mobile", async () => {
    const res = await request('http://localhost:3000')
      .post('/api/auth/requestotp')
      .send({
        mobileNumber: '9785468738',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
  });

  it('It should fail on sending wrong OTP', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/auth/checkotp')
      .send({
        mobileNumber: '9785468738',
        password: '123456',
      });
    expect(res.statusCode).toEqual(500);
  });
});
