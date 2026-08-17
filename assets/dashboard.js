const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------------------------------------
// LOAD USER SESSION
// ----------------------------------------------------
async function loadDashboard() {
    const { data: sessionData } = await sb.auth.getSession();

    if (!sessionData.session) {
        window.location.href = "login.html";
        return;
    }

    const user = sessionData.session.user;

    // ----------------------------------------------------
    // LOAD USERS TABLE ROW
    // ----------------------------------------------------
    const { data: userRow } = await sb
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!userRow) {
        document.getElementById("user-email").innerText = "User record not found";
        return;
    }

    document.getElementById("user-email").innerText = userRow.email;
    document.getElementById("user-plan").innerText = userRow.plan;

    // ----------------------------------------------------
    // LOAD API KEY
    // ----------------------------------------------------
    const { data: keyRow } = await sb
        .from("apikeys")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (!keyRow) {
        document.getElementById("api-key").innerText = "No API key found";
    } else {
        document.getElementById("api-key").innerText = keyRow.api_key;
    }

    // ----------------------------------------------------
    // LOAD USAGE
    // ----------------------------------------------------
    const { data: usageRow } = await sb
        .from("usage")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (!usageRow) {
        document.getElementById("usage-count").innerText = "0";
    } else {
        document.getElementById("usage-count").innerText = usageRow.daily_count;
    }
}

loadDashboard();

// ----------------------------------------------------
// LOGOUT
// ----------------------------------------------------
document.getElementById("logout-btn").addEventListener("click", async () => {
    await sb.auth.signOut();
    window.location.href = "login.html";
});

// ----------------------------------------------------
// REGENERATE API KEY
// ----------------------------------------------------
document.getElementById("regen-key-btn").addEventListener("click", async () => {

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
