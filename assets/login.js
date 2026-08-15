// Your Supabase project URL + anon key
const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

// Create Supabase client
const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {

    // Find ANY element that contains the word "Login"
    const loginElements = Array.from(document.querySelectorAll("*"))
        .filter(el => el.textContent.trim().toLowerCase() === "login");

    if (loginElements.length === 0) {
        console.error("No login element found on page.");
        return;
    }

    // Attach login handler to ALL matching elements
    loginElements.forEach(el => {
        el.addEventListener("click", async (event) => {
            event.preventDefault(); // stop Mobirise navigation
            event.stopPropagation(); // stop Mobirise form behavior

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
