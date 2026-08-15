// Your Supabase project URL + anon key
const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

// Create Supabase client
const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

    // Find Mobirise password field
    const passwordInput = document.getElementById("password");

    if (passwordInput) {
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "showPassword";

        // Create label
        const label = document.createElement("label");
        label.textContent = " Show Password";
        label.style.display = "block";
        label.style.marginTop = "10px";

        // Attach checkbox to label
        label.prepend(checkbox);

        // Insert label AFTER password field
        passwordInput.parentNode.insertBefore(label, passwordInput.nextSibling);

        // Toggle logic
        checkbox.addEventListener("change", () => {
            passwordInput.type = checkbox.checked ? "text" : "password";
        });
    }

    // Login button
    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        console.error("Login button not found!");
        return;
    }

    loginBtn.addEventListener("click", async () => {
        console.log("Login button clicked");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        console.log("Attempting login with:", email);

        const { data, error } = await sb.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Login error:", error);
            alert("Invalid email or password.");
            return;
        }

        console.log("Login successful:", data);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });
});
