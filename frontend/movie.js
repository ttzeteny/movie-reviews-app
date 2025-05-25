const url = new URL(location.href);
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById('section');
const title = document.getElementById('title');

title.innerText = movieTitle;

const formDiv = document.createElement("div");
formDiv.classList.add("review-form");
formDiv.innerHTML = `
        <h3>Add a new review</h3>
        <form onsubmit="event.preventDefault(); saveReview('new_review', 'new_user')">
            <input type="text" id="new_review" placeholder="Write your review..." required>
            <input type="text" id="new_user" placeholder="Your name" required>
            <p><button type="submit" class="button">Save Review</button></p>
        </form>
        <hr style="margin: 2rem 0; border-color: #2a2a2a;">
    `;
section.before(formDiv);

returnReviews(APILINK);

function returnReviews(url) {
    fetch(url + "movie/" + movieId)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            data.forEach(review => {
                const div_card = document.createElement('div');

                div_card.innerHTML = `
                    <div class="reviewRow">
                        <div class="reviewColumn">
                            <div class="reviewCard" id="${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a> <a href="#" onclick="event.preventDefault(); deleteReview('${review._id}')">Delete</a></p>
                            </div>
                        </div>
                    </div>
                `;

                main.appendChild(div_card);
            });
        });
}

function editReview(id, review, user) {

    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">Save</a></p>
    `;

}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": user,
                "review": review,
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            });
    } else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": user,
                "review": review,
                "movieId": movieId
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            })
    }


}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error("Delete failed");
            return res.json();
        })
        .then(() => {
            console.log(`Deleted review ${id}`);
            location.reload();
        })
        .catch(err => console.error("Delete error:", err));
}
