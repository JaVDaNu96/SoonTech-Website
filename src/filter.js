// Get filter elements
const filterTopic = document.getElementById("filter-topic");
const filterDate = document.getElementById("filter-date");
const filterKeywords = document.getElementById("filter-keywords");
const filterComments = document.getElementById("filter-comments");
const blogEntries = document.getElementById("blog-entries").children;

// Add event listeners for filters
filterTopic.addEventListener("change", filterBlogs);
filterDate.addEventListener("input", filterBlogs);
filterKeywords.addEventListener("input", filterBlogs);
filterComments.addEventListener("change", filterBlogs);

function filterBlogs() {
    const selectedTopic = filterTopic.value;
    const selectedDate = filterDate.value;
    const selectedKeywords = filterKeywords.value.toLowerCase();
    const selectedComments = filterComments.value;

    Array.from(blogEntries).forEach(entry => {
        const topic = entry.getAttribute("data-topic");
        const date = entry.getAttribute("data-date");
        const comments = parseInt(entry.getAttribute("data-comments"));
        const title = entry.querySelector("h2").textContent.toLowerCase();
        const description = entry.querySelector("p").textContent.toLowerCase();

        let show = true;

        // Filter by topic
        if (selectedTopic !== "all" && topic !== selectedTopic) {
            show = false;
        }

        // Filter by date
        if (selectedDate && date < selectedDate) {
            show = false;
        }

        // Filter by keywords
        if (selectedKeywords && !(title.includes(selectedKeywords) || description.includes(selectedKeywords))) {
            show = false;
        }

        // Filter by number of comments
        if (selectedComments !== "all") {
            if (selectedComments === "0-10" && comments > 10) show = false;
            if (selectedComments === "11-50" && (comments < 11 || comments > 50)) show = false;
            if (selectedComments === "50+" && comments < 50) show = false;
        }

        // Show or hide the entry
        entry.style.display = show ? "block" : "none";
    });
}
