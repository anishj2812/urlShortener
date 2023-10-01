function copyToClipboard() {
    // Select the text element
    var textElement = document.getElementById("short_url");

    // Create a range object and select the text inside the element
    var range = document.createRange();
    range.selectNode(textElement);

    // Select the text inside the range
    window.getSelection().removeAllRanges(); // Clear previous selections
    window.getSelection().addRange(range);

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Deselect the text
    window.getSelection().removeAllRanges();

    // Notify the user that the text has been copied (you can use any notification method here)
    alert("Text has been copied to clipboard: " + textElement.textContent);
}


// Get the form element by its ID
const form = document.getElementById('urlForm');
// Event listener for form submission
if(form)
{
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the form data using FormData object
        const formData = new FormData(form);
        // Convert form data to JSON object
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Log the JSON data (you can send it to an API, process it, etc.)
        console.log('Form Data:', jsonData);
        console.log(jsonData['url'])
        const url=jsonData['url'];
        const encodedUrl = encodeURIComponent(url);
        // const url = encodeURIComponent(document.getElementById("url").value); // Assuming you have an input field with id="url" in your HTML form
        const apiEndpoint = `http://localhost:12377/inserturl/${encodedUrl}`;
        // window.location.href = 'generateURL.html';
        fetch(apiEndpoint, {
        method: 'GET', // You can change the HTTP method if needed (e.g., 'POST')
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })  
        .then(data => {
            // Handle the JSON response data here
            console.log(data['generatedURL']);
            // window.location.href = 'generateURL.html';
            // if (short_url) {
            //     short_url.innerHTML = data['generatedURL'];
            // } else {
            //     console.error('Element with ID "short_url" not found.');
            // }
            window.location.href = `generateURL.html?short_url=${data['generatedURL']}`;
            // window.location.href = 'generateURL.html';
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
        console.log("abcdd")
        // Call a function to handle the data (you can define your own function)
        // handleFormData(jsonData);
    });
}
// Function to handle form data
function handleFormData(data) {
    // Process the data here
    console.log('Handling form data:', data);
}


const shortUrlElement = document.getElementById('short_url');
if(shortUrlElement)
{
    const urlParams = new URLSearchParams(window.location.search);
    const shortUrlParam = urlParams.get('short_url');
    if (shortUrlElement && shortUrlParam) {
        shortUrlElement.innerHTML = shortUrlParam;
    } else {
        console.error('Element with ID "short_url" not found or short_url parameter missing.');
    }
}


