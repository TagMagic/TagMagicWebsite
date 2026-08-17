const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {

    // -------------------------------
    // CHECK SESSION
    // -------------------------------
    const { data: { session } } = await sb.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
        return;
    }

    const user = session.user;

    // -------------------------------
    // LOAD USER PROFILE
    // -------------------------------
    const { data: profile, error } = await sb
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        alert("Profile not found.");
        return;
    }

    // Fill dashboard fields
    document.getElementById("api-key").textContent = profile.api_key || "No key found";
    document.getElementById("plan").textContent = profile.plan || "Free";
    document.getElementById("usage").textContent = profile.usage || 0;

    // -------------------------------
    // REGENERATE KEY
    // -------------------------------
    document.getElementById("regen-key").addEventListener("click", async () => {
        const newKey = crypto.randomUUID();

        const { error: updateError } = await sb
            .from("profiles")
            .update({ api_key: newKey })
            .eq("id", user.id);

        if (updateError) {
            alert("Error regenerating key.");
            return;
        }

        document.getElementById("api-key").textContent = newKey;
        alert("New API key generated.");
    });

    // -------------------------------
    // LOGOUT
    // -------------------------------
    document.getElementById("logout").addEventListener("click", async () => {
        await sb.auth.signOut();
        window.location.href = "login.html";
    });
});
