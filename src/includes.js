// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);

// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);

// ABOUT US //
// Select all tabs and content elements
const tabs = document.querySelectorAll(".tab");
const contentTexts = document.querySelectorAll(".content-text");

// Function to handle tab click
function handleTabClick(event) {
    const selectedContent = event.currentTarget.getAttribute("data-content");

    // Remove active state from all tabs and contents
    tabs.forEach(tab => tab.classList.remove("selected"));
    contentTexts.forEach(content => content.classList.remove("active"));

    // Add active state to the clicked tab and corresponding content
    event.currentTarget.classList.add("selected");
    document.getElementById(selectedContent).classList.add("active");
}

// Add event listeners to each tab
tabs.forEach(tab => {
    tab.addEventListener("click", handleTabClick);

    // Append the tab indicator to each tab
    const indicator = document.createElement("div");
    indicator.classList.add("tab-indicator");
    tab.appendChild(indicator);
});

// Initially show the first tab content (optional)
tabs[0].classList.add("selected");
document.getElementById("mission").classList.add("active");
