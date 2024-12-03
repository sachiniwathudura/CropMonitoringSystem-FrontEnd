$(document).ready(function() {
    // Attach the form submission handler
    $('#signupForm').on('submit', function(event) {
        event.preventDefault();
        userRegistration();
    });
});

// Function to handle user registration
function userRegistration() {
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    const role = $('#role').val().trim(); // Get role value

    // Validate inputs
    if (!email || !password || !role) {
        alert('Please fill in all fields.');
        return;
    }

    // AJAX request to register the user
    $.ajax({
        url: "http://localhost:8080/cropMonitor/api/v1/auth/signup",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password,
            role: role
        }),
        success: function(response) {
            alert('Signup successful!');
            console.log(response);

            // Save JWT token in localStorage
            localStorage.setItem("token", response.token);

            $("#message").text("Registration successful!")
                .removeClass("text-danger").addClass("text-success");

            $('#signupForm')[0].reset();
        },
        error: function(error) {
            console.log(error);
            $("#message").text("Registration failed!")
                .removeClass("text-success").addClass("text-danger");
        }
    });
}