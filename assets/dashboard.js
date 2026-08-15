// Your Supabase project URL + anon key
const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

// Create a Supabase client for the dashboard page
const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

// Run when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Check if the user is logged in
        const { data, error } = await sb.auth.getUser();

        // If Supabase throws an error OR no user exists → stay on dashboard WITHOUT redirect loop
        if (error || !data.user) {
            console.warn("No user session found. Showing dashboard without redirect.");
            return; // IMPORTANT: DO NOT REDIRECT — prevents flashing loop
        }

        // If user exists, display dashboard data
        console.log("Logged in user:", data.user);

        // Fill dashboard fields
        const apiKeyEl = document.getElementById("apiKey");
        const planEl = document.getElementById("plan");
        const usageEl = document.getElementById("usage");

        if (apiKeyEl) apiKeyEl.innerText = data.user.id;
        if (planEl) planEl.innerText = "Free";
        if (usageEl) usageEl.innerText = "0";

        // Regenerate API key button
        const regenBtn = document.getElementById("regenBtn");
        if (regenBtn) {
            regenBtn.addEventListener("click", async () => {
                console.log("Regenerate button clicked");

                const response = await fetch("/regenerate-key", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: data.user.id })
                });

                const result = await response.json();
                console.log("New key:", result.newKey);

                if (apiKeyEl) apiKeyEl.innerText = result.newKey;
            });
        }

    } catch (err) {
        console.error("Unexpected error:", err);
        // DO NOT REDIRECT — prevents infinite loop
    }
});
