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

///////////////////// MISSION VISION STRATEGY //////////////////

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
    // Select all tab elements
    const tabs = document.querySelectorAll(".tab");
    // Select all content elements
    const contentTexts = document.querySelectorAll(".content-text");

    // Loop through each tab and add a click event listener
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            // Add 'active' class to the clicked tab
            tab.classList.add("active");

            // Hide all content sections
            contentTexts.forEach(content => content.style.display = "none");

            // Show the selected content based on the data-content attribute
            const selectedContent = tab.getAttribute("data-content");
            document.getElementById(selectedContent).style.display = "block";
        });
    });

    // Initial setup - Show the first content by default
    tabs[0].classList.add("active"); // Make the first tab active
    contentTexts[0].style.display = "block"; // Show the first content section
});
