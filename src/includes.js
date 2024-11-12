// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);

// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);

// ABOUT US //
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
