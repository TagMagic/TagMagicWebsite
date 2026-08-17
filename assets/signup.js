const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("signup-btn").addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Email and password required.");
        return;
    }

    const { data, error } = await sb.auth.signUp({ email, password });

    if (error) {
        alert(error.message);
        return;
    }

    const user = data.user;

    await sb.from("profiles").insert({
        id: user.id,
        api_key: crypto.randomUUID(),
        plan: "Free",
        usage: 0
    });

    alert("Signup successful!");
    window.location.href = "dashboard.html";
});
