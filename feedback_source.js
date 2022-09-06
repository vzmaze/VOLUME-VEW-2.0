// FEEDBACK
let feedbackSource = [
    {
        img: "./img/feedback/user_icons/sarah_robinson.jpg",
        name: "Sarah Robinson",
        text: "Working with thise guys was an astonishing expirience for me. I was pleased with theyre work."
    },
    {
        img: "./img/feedback/user_icons/nathan_perish.jpg",
        name: "Nathan Perish",
        text: "At first I was not sure about this team but I decided to give them a chance. And they didn’t let me down. Good job, guys.",
    },
    {
        img: "./img/feedback/user_icons/amy_jones.jpg",
        name: "Amy Jones",
        text: "Working with thise guys was an astonishing expirience for me. I was pleased with theyre work.",
    }
];
let template = document.querySelector("#feedback_template").innerHTML;
let output = document.querySelector("#feedbacks_div");
for(let i=0; i<feedbackSource.length; i++){
    const user = feedbackSource[i];
    let feedback = Mustache.render(template, user);
    output.insertAdjacentHTML("beforeend", feedback);
}