const supabaseUrl = "https://sddppkcbaoohygmmmjlb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------------------------------------
// PASSWORD EYE TOGGLE
// ----------------------------------------------------
const passwordInput = document.getElementById("password");
const toggleEye = document.getElementById("toggle-eye");
const eyeIcon = document.getElementById("eye-icon");

if (toggleEye && passwordInput && eyeIcon) {
    toggleEye.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";

        // Swap icon
        eyeIcon.innerHTML = isHidden
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a19.77 19.77 0 0 1 5.06-5.94M9.88 9.88A3 3 0 0 1 14.12 14.12M1 1l22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`
            : `<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle>`;
    });
}

// ----------------------------------------------------
// SIGNUP LOGIC
// ----------------------------------------------------
document.getElementById("signup-btn").addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Email and password required.");
        return;
    }

    // Create auth user
    const { data, error } = await sb.auth.signUp({ email, password });

    if (error) {
        alert(error.message);
        return;
    }

    const user = data.user;

    // Insert into users table
    await sb.from("users").insert({
        id: user.id,
        email: email,
        plan: "Free"
    });

    // Insert API key
    await sb.from("apikeys").insert({
        user_id: user.id,
        api_key: crypto.randomUUID(),
        active: true
    });

    // Insert usage row
    await sb.from("usage").insert({
        user_id: user.id,
        daily_count: 0
    });

    alert("Signup successful!");
    window.location.href = "dashboard.html";
});
