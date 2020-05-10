const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("Get /apps", () => {
    it.skip('should return an array of games', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect("Content-type", /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const app = res.body[0];
            expect(app).to.include.any.keys(
              "App",
              "Category",
              "Rating",
              "Genres",
              "Cancel"
            );
        });
    });
    it.skip('should be 400 if sort is incorrect', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'WRONG' })
        .expect(400, 'Sort must be one of rating or app');
    })
        it.skip("should be 400 if genres is incorrect", () => {
          return supertest(app)
            .get("/apps")
            .query({ genres: "WRONG" })
            .expect(
              400,
              "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card"
            );
        });

    it('should sort by app title', () => {
        return supertest(app)
          .get("/apps")
          .query({ sort: "app" })
          .expect(200)
          .expect("Content-Type", /json/)
          .then((res) => {
           expect(res.body).to.be.an("array");
           let sorted = true;

           let i = 0;
           // iterate once less than the length of the array
           // because we're comparing 2 items in the array at a time
           while (i < res.body.length - 1) {
             // compare app at `i` with next app at `i + 1`
             const appAtIndex = res.body[i];
             const appAtIndexPlus1 = res.body[i + 1];
             // if the next app is less than the app at i,
             if (appAtIndexPlus1.App < appAtIndex.App) {
               // the app were not sorted correctly
               console.log(appAtIndexPlus1.App);
               console.log(appAtIndex.App);
               sorted = false;
               break; // exit the loop
             }
             i++;
           }
           expect(sorted).to.be.true;
        })
    })
})


// how do you check to make sure that at least the specified keys exist 
// as part of all the keys