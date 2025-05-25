import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id ||{};
            let review = await ReviewsDAO.getReview(id);
            if (!review) {
                res.statuis(404).json({error: "Review not found"});
                return;
            }
            res.json(review);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );

            const { error } = reviewResponse;
            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (reviewResponse.modifiedCount === 0) {
                return res.status(400).json({ error: "Unable to update review" });
            }

            return res.json({ status: "success" });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }


    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({status: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let id = req.params.id;
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if (!reviews) {
                res.statuis(404).json({error: "Reviews not found"});
                return;
            }
            res.json(reviews);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e.message});
        }
    }
}