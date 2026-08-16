const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("signup-btn");

    if (!btn) return;

    btn.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        const { error } = await sb.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name || "" }
            }
        });

        if (error) {
            alert("Signup failed: " + error.message);
            return;
        }

        const { error: loginError } = await sb.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) {
            alert("Login failed after signup.");
            return;
        }

        window.location.href = "dashboard.html";
    });
});
