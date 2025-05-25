import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.log(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.log(`Unable to add review: ${e}`);
            return {error: e};
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({_id: new ObjectId(reviewId)});
        } catch (e) {
            console.log(`Unable to get review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review}}
            );

            return updateResponse;
        } catch (e) {
            console.log(`Unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({_id: new ObjectId(reviewId)});
            return deleteResponse;
        } catch (e) {
            console.log(`Unable to delete review: ${e}`);
            return {error: e};
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({movieId: parseInt(movieId)});
            return cursor.toArray();
        } catch (e) {
            console.log(`Unable to get reviews by movieId: ${e}`);
            return {error: e};
        }
    }
}