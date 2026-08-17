const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

// LOAD DASHBOARD
async function loadDashboard() {
    const { data: sessionData } = await sb.auth.getSession();

    if (!sessionData.session) {
        window.location.href = "login.html";
        return;
    }

    const user = sessionData.session.user;

    // USERS TABLE
    const { data: userRow } = await sb
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    document.getElementById("plan").innerText =
        userRow ? userRow.plan : "Unknown";

    // API KEY
    const { data: keyRow } = await sb
        .from("apikeys")
        .select("*")
        .eq("user_id", user.id)
        .single();

    document.getElementById("api-key").innerText =
        keyRow ? keyRow.api_key : "No API key found";

    // USAGE
    const { data: usageRow } = await sb
        .from("usage")
        .select("*")
        .eq("user_id", user.id)
        .single();

    document.getElementById("usage").innerText =
        usageRow ? usageRow.daily_count : "0";
}

loadDashboard();

// LOGOUT
document.getElementById("logout").addEventListener("click", async () => {
    await sb.auth.signOut();
    window.location.href = "login.html";
});

// REGENERATE KEY
document.getElementById("regen-key").addEventListener("click", async () => {
    const { data: sessionData } = await sb.auth.getSession();
    const user = sessionData.session.user;

    const newKey = (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

    await sb
        .from("apikeys")
        .update({ api_key: newKey })
        .eq("user_id", user.id);

    document.getElementById("api-key").innerText = newKey;

    alert("API key regenerated.");
});
