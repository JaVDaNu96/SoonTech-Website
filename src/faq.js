document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".specific-service-faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;

            // Toggle visibility
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }

            // Optional: Change question appearance on click
            question.classList.toggle("active");
        });
    });
});