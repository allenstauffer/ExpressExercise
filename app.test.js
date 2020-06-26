// describe('loading express', function () {
//   afterEach(function () {
//     server.close();
//   });
//   it('responds to /', function testSlash(done) {
//   request(server)
//     .get('/')
//     .expect(200, done);
//   });
//   it('404 everything else', function testPath(done) {
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
// });

var expectedStudents = [{id:1,name: "Bruce Banner", grades:[1,2,3,4]},{id:2,name: "Clinton Barton", grades:[5,6,7,8]},{id:3,name: "Steve Rogers", grades:[9,10,11,12]},{id:4,name: "Thor Odinson", grades:[13,14,15,16]},{id:5,name: "Tony Stark", grades:[17,18,19,20]}]

var request = require('supertest');
var app = require('./app');

describe('Sample Test', () => {
  afterEach(() => {
    app.close();
  });
    
    it('students return', async () => {
      var test = await request(app).get('/student');
      expect(test.body).toEqual(expectedStudents)
    })

    it('returns student by id error if no id', async () => {
      var test = await request(app).get('/student/10');
      expect(test.text).toEqual("No Student Found")
    })


    it('returns student by id', async () => {
      var test = await request(app).get('/student/1');
      expect(test.body).toEqual(expectedStudents[0])
    })

    it('returns grades by id error if no id', async () => {
      var test = await request(app).get('/grades/10');
      expect(test.text).toEqual("No Student Found")
    })


    it('returns grades by student id', async () => {
      var test = await request(app).get('/grades/1');
      expect(test.body).toEqual(expectedStudents[0].grades)
    })

    it('Set Grade no username or grade', async () => {
      var test = await request(app).post('/grades');
      expect(test.text).toEqual("No Student Id or Grade Sent")
    })

    it('Set Grade no username or grade', async () => {
      var test = await request(app).post('/grades?studentId=1');
      expect(test.text).toEqual("No Grade Sent")
    })

    it('Set Grade no username or grade', async () => {
      var test = await request(app).post('/grades?grade=1');
      expect(test.text).toEqual("No Student Id Sent")
    })

    it('Set Grade', async () => {
      var test = await request(app).post('/grades?studentId=1&grade=1').expect(200);
      expect(test.text).toEqual("Success")
      
    })
    
    it('Register no username or grade', async () => {
      var test = await request(app).post('/register');
      expect(test.text).toEqual("No Username and Email Sent")
    })

    it('Register no username', async () => {
      var test = await request(app).post('/register?username=fakename');
      expect(test.text).toEqual("No Email Sent")
    })

    it('Register no grade', async () => {
      var test = await request(app).post('/register?email=fakeemail@email.com');
      expect(test.text).toEqual("No Username Sent")
    })

    it('Register', async () => {
      var test = await request(app).post('/register?username=fakename&email=fakeemail@email.com').expect(200);
      expect(test.text).toEqual("Success")
      
    })

  })