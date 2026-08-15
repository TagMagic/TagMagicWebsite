// Initialize Supabase client
const supabaseUrl = "https://YOUR-SUPABASE-PROJECT.supabase.co";
const supabaseKey = "YOUR-ANON-KEY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Login.js loaded");

    const loginButton = document.getElementById("loginButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    if (!loginButton) {
        console.error("Login button NOT found.");
        return;
    }

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Login button clicked");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Login error:", error.message);
            alert("Login failed: " + error.message);
            return;
        }

        console.log("Login successful:", data);
        window.location.href = "dashboard.html";
    });
});
