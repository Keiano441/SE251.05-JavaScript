// JavaScript Document

window.onload = function () {
    var btn = document.getElementById("submit-btn");
    if (btn) {
        btn.onclick = validateForm;
    }
};

function validateForm() {
    // Grab inputs
    var fNameInput   = document.getElementById("first-name");
    var lNameInput   = document.getElementById("last-name");
    var emailInput   = document.getElementById("email");
    var email2Input  = document.getElementById("email-confirm");
    var phoneInput   = document.getElementById("phone");

    var fName = fNameInput.value.trim();
    var lName = lNameInput.value.trim();
    var email = emailInput.value.trim();
    var email2 = email2Input.value.trim();
    var phone = phoneInput.value.trim();

    // RegEx patterns
    var namePattern  = /^[A-Za-z-]+$/;          // letters and dashes only, no underscores
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\d{10}$/;              // exactly 10 digits

    var isValid = true;

    // Helper functions
    function setError(labelId, spanId, message) {
        var label = document.getElementById(labelId);
        var span  = document.getElementById(spanId);

        if (label) {
            label.className = "error";
        }
        if (span) {
            span.className = "error";
            span.innerHTML = "* " + message;
        }
        isValid = false;
    }

    function clearError(labelId, spanId) {
        var label = document.getElementById(labelId);
        var span  = document.getElementById(spanId);

        if (label) {
            label.className = "normal";
        }
        if (span) {
            span.className = "";
            span.innerHTML = "";
        }
    }

    // ---- First Name ----
    if (fName === "") {
        setError("label-fn", "fn-error", "Please input a first name.");
    } else if (!namePattern.test(fName)) {
        setError(
            "label-fn",
            "fn-error",
            "Your name must not include special characters or underscores."
        );
    } else {
        clearError("label-fn", "fn-error");
    }

    // ---- Last Name ----
    if (lName === "") {
        setError("label-ln", "ln-error", "Please input a last name.");
    } else if (!namePattern.test(lName)) {
        setError(
            "label-ln",
            "ln-error",
            "Your name must not include special characters or underscores."
        );
    } else {
        clearError("label-ln", "ln-error");
    }

    // ---- Email ----
    if (email === "") {
        setError("label-email", "email-error", "Please input an email address.");
    } else if (!emailPattern.test(email)) {
        setError("label-email", "email-error", "Please input a valid email address.");
    } else {
        clearError("label-email", "email-error");
    }

    // ---- Email Confirm ----
    if (email2 === "") {
        setError(
            "label-email-confirm",
            "email-confirm-error",
            "Please confirm your email address."
        );
    } else if (!emailPattern.test(email2)) {
        setError(
            "label-email-confirm",
            "email-confirm-error",
            "Please input a valid email address."
        );
    } else {
        clearError("label-email-confirm", "email-confirm-error");
    }

    // ---- Email match check (only if both look valid so far) ----
    if (
        email !== "" &&
        email2 !== "" &&
        emailPattern.test(email) &&
        emailPattern.test(email2) &&
        email !== email2
    ) {
        setError(
            "label-email",
            "email-error",
            "Email and confirmation must match."
        );
        setError(
            "label-email-confirm",
            "email-confirm-error",
            "Email and confirmation must match."
        );
    }

    // ---- Phone ----
    if (phone === "") {
        setError("label-phone", "phone-error", "Please input a phone number.");
    } else if (!phonePattern.test(phone)) {
        setError(
            "label-phone",
            "phone-error",
            "Phone number must be 10 digits in the format xxxxxxxxxx."
        );
    } else {
        clearError("label-phone", "phone-error");
    }

    // If anything failed, stop here
    if (!isValid) {
        return false;
    }

    // ---- All good: build object ----
    var person = {
        fname: fName,
        lname: lName,
        email: email,
        phone: phone
    };

    // Format phone with dashes using substring
    var formattedPhone =
        person.phone.substring(0, 3) + "-" +
        person.phone.substring(3, 6) + "-" +
        person.phone.substring(6);

    // Write confirmation text
    var infoP = document.getElementById("info");
    infoP.innerHTML =
        "Thank you, " + person.fname + " " + person.lname + "!<br><br>" +
        "Email: " + person.email + "<br>" +
        "Phone: " + formattedPhone;

    // Hide form show confirmation
    document.getElementById("form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";

    return false;
}
