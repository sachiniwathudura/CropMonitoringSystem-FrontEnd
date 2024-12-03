$(document).ready(function () {
    $('#form').on('submit', function (event) {
        event.preventDefault();
        userLogin();
    });

    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            window.location.href = "/pages/signup.html";
        });
    }
});

function userLogin() {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const role = $("#role").val().trim();

    if (!email || !password) {
        alert("Email and Password are required!");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/cropMonitor/api/v1/auth/signin",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password,
            role: role,
        }),
        success: function (response) {
            if (response && response.token) { // Directly access the token
                localStorage.setItem("token", response.token);
                alert("Login successful!");
                window.location.href = "/pages/managerDashboard.html";
            } else {
                alert("Invalid server response.");
            }
        },
        error: function (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your email and password.");
        }
    });
}