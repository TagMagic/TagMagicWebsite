// -------------------------------
// Supabase Initialization
// -------------------------------
const supabase = supabase.createClient(
  "https://sddppkcbaoohygmmmjlb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw"
);

// -------------------------------
// STOP ALL FORM SUBMISSION
// (Mobirise tries to submit the form → causes "page not working")
// -------------------------------
document.querySelectorAll("form").forEach(f => {
  f.addEventListener("submit", e => e.preventDefault());
});

// -------------------------------
// FIND THE LOGIN BUTTON
// Mobirise changes URLs, so we find it by TEXT instead.
// -------------------------------
const btn = [...document.querySelectorAll("a, button")]
  .find(el => el.textContent.trim().toLowerCase() === "login");

if (!btn) {
  console.error("Login button NOT found.");
} else {
  btn.id = "loginBtn";

  // -------------------------------
  // LOGIN HANDLER
  // -------------------------------
  btn.onclick = async () => {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  };
}
