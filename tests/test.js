const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const { Cookie } = require('express-session');

require('dotenv').config();
let token;
/* Connect to the DB before testing */
beforeAll(async () => {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
})

/* Disconnect from the DB after testing */
afterAll(async () => {
    await mongoose.connection.close();
})

/* Test the GET route */
describe('User as Admin', () => {
    beforeAll(async () => {
        const res = await request(app).post('/login').send({
            username: 'admin01',
            password: 'admin01'
        })
        token = res.body.token;
    })

    afterAll(async () => {
        const res = await request(app).get('/logout').set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(302);
    })

    it('Open Dashboard Panel', async () => {
        const res = await request(app).get('/dashboard').set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(200);
    })

    it('Open Change Password', async () => {
        const res = await request(app).get('/changepassworduserpage').set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(200);
    })

    it('Change Password (Fail)', async () => {
        const res = await request(app).post('/changepassworduserpage').send({
            passwordlama: 'admin',
            passwordbaru: 'admin02',
            konfirmasipasswordbaru: 'admin02'
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(400);
    })

    it('Change Password (Fail)', async () => {
        const res = await request(app).post('/changepassworduserpage').send({
            passwordlama: 'admin01',
            passwordbaru: 'admin02',
            konfirmasipasswordbaru: 'admin'
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(400);
    })

    it('Change Password (Fail)', async () => {
        const res = await request(app).post('/changepassworduserpage').send({
            passwordlama: 'admin',
            passwordbaru: 'admin02',
            konfirmasipasswordbaru: 'admin01'
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(400);
    })

    // change the password and then revert the password to the original one
    it('Change Password (Success)', async () => {
        const res = await request(app).post('/changepassworduserpage').send({
            passwordlama: 'admin01',
            passwordbaru: 'admin02',
            konfirmasipasswordbaru: 'admin02'
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(302);
    })

    // revert back to original password
    it('Revert to Original Password', async () => {
        const res = await request(app).post('/changepassworduserpage').send({
            passwordlama: 'admin02',
            passwordbaru: 'admin01',
            konfirmasipasswordbaru: 'admin01'
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(302);
    })

    // open submitted proposal page and expect the data to be there with status "submitted"
    it('Open Submitted Proposal Page', async () => {
        const res = await request(app).get('/submitted').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Submitted Proposal/)
    })

    it('Open Need Approval Page', async () => {
        const res = await request(app).get('/needapproval').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Need Approval/)
    })

    it('Open Approved Proposal Page', async () => {
        const res = await request(app).get('/approved').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Approved Proposal/)
    })

    it('Open Rejected Proposal Page', async () => {
        const res = await request(app).get('/rejected').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Rejected Proposal/)
    })
    it('Open Redesign Proposal Page', async () => {
        const res = await request(app).get('/redesign').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Redesign Proposal/)
    })

    it('Open On Installation Proposal Page', async () => {
        const res = await request(app).get('/installation').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Installation Proposal/)
    })

    it('Open Closed Proposal Page', async () => {
        const res = await request(app).get('/closed').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Closed Proposal/)
    })

    it('Open QE Report Page', async () => {
        const res = await request(app).get('/qereport').set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/Segmen/)
    })

    it('Open QE Report List Page', async () => {
        const res = await request(app).post('/qereportlist').send({
            namaSTO: 'SMT',
            segmen: "ODC",
        }).set('Cookie', [`x-access-token=${token}`]);
        expect(res.text).toMatch(/SMT-02/)
    })




})


describe('User as Proposer', () => {
    beforeAll(async () => {
        const res = await request(app).post('/login').send({
            username: 'proposer01',
            password: 'proposer02'
        })
        token = res.body.token;
    })

    afterAll(async () => {
        const res = await request(app).get('/logout').set('Cookie', [`x-access-token=${token}`]);
        expect(res.status).toBe(302);
    })
    
    let proposalID;

    //make new proposal
    it("Make New Proposal", async () => {
        const res = await request(app).post('/proposal').send({
            namaSTO: 'SMT',
            segmen: 'ODC',
            namaAlpro: 'ODC-SMT-FA',
            jenisQE: 'Perapihan ODC',
            koordinat: '223,123',
            keterangan: 'zzz',
        }).set('Cookie', [`x-access-token=${token}`]).accept('json');
        proposalID = res.body.objectID;
        expect(res.status).toBe(200);
        console.log(proposalID);
    })
})




