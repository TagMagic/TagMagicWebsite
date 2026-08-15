// Initialize Supabase client
const supabaseUrl = "https://YOUR-SUPABASE-PROJECT.supabase.co";
const supabaseKey = "YOUR-ANON-KEY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Dashboard.js loaded");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.warn("No user logged in — redirecting to login.");
        window.location.href = "login.html";
        return;
    }

    console.log("User:", user);

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            await supabase.auth.signOut();
            window.location.href = "login.html";
        });
    }
});
