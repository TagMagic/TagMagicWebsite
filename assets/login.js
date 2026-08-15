// Your Supabase project URL + anon key
const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

// Create Supabase client
const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // ADD SHOW PASSWORD CHECKBOX
    // -------------------------------
    const passwordInput = document.getElementById("password");

    if (passwordInput) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "showPassword";

        const label = document.createElement("label");
        label.textContent = " Show Password";
        label.style.display = "block";
        label.style.marginTop = "10px";

        label.prepend(checkbox);

        // Insert checkbox AFTER password field
        passwordInput.parentNode.insertBefore(label, passwordInput.nextSibling);

        // Toggle logic
        checkbox.addEventListener("change", () => {
            passwordInput.type = checkbox.checked ? "text" : "password";
        });
    }

    // -------------------------------
    // UNIVERSAL LOGIN BUTTON HANDLER
    // -------------------------------
    const loginElements = Array.from(document.querySelectorAll("*"))
        .filter(el => el.textContent.trim().toLowerCase() === "login");

    if (loginElements.length === 0) {
        console.error("No login element found on page.");
        return;
    }

    loginElements.forEach(el => {
        el.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const email = document.getElementById("email")?.value.trim();
            const password = document.getElementById("password")?.value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            const { data, error } = await sb.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                alert("Invalid email or password.");
                return;
            }

            window.location.href = "dashboard.html";
        });
    });

});
