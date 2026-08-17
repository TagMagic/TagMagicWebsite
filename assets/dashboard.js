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
    // LOAD PLAN FROM users TABLE
    // -------------------------------
    const { data: userRow, error: userError } = await sb
        .from("users")
        .select("plan")
        .eq("id", user.id)
        .single();

    if (userError || !userRow) {
        alert("User record not found.");
        return;
    }

    document.getElementById("plan").textContent = userRow.plan || "Free";

    // -------------------------------
    // LOAD API KEY FROM apikeys TABLE
    // -------------------------------
    const { data: keyRow, error: keyError } = await sb
        .from("apikeys")
        .select("api_key")
        .eq("user_id", user.id)
        .eq("active", true)
        .single();

    if (keyError || !keyRow) {
        alert("API key not found.");
        return;
    }

    document.getElementById("api-key").textContent = keyRow.api_key;

    // -------------------------------
    // LOAD USAGE FROM usage TABLE
    // -------------------------------
    const { data: usageRow, error: usageError } = await sb
        .from("usage")
        .select("daily_count")
        .eq("user_id", user.id)
        .single();

    if (usageError || !usageRow) {
        document.getElementById("usage").textContent = 0;
    } else {
        document.getElementById("usage").textContent = usageRow.daily_count;
    }

    // -------------------------------
    // REGENERATE KEY
    // -------------------------------
    document.getElementById("regen-key").addEventListener("click", async () => {
        const newKey = crypto.randomUUID();

        const { error: updateError } = await sb
            .from("apikeys")
            .update({ api_key: newKey })
            .eq("user_id", user.id)
            .eq("active", true);

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
