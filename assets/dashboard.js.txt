// -------------------------------
// Supabase Initialization
// -------------------------------
const supabase = supabase.createClient(
  "https://sddppkcbaoohygmmmjlb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHBwa2NiYW9vaHlnbW1tamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjc3ODcsImV4cCI6MjEwMjMwMzc4N30.fcKirjCJftWeHSyv9YYPWjA9BkU38FcqRJQ7NyOUXmw"
);

// -------------------------------
// FIND THE REGEN BUTTON
// (Mobirise changes URLs → find by text)
// -------------------------------
const regenBtn = [...document.querySelectorAll("a, button")]
  .find(el => el.textContent.trim().toLowerCase().includes("regen"));

if (!regenBtn) {
  console.error("Regen button NOT found.");
}

// -------------------------------
// CHECK LOGIN STATUS
// -------------------------------
supabase.auth.getUser().then(async ({ data }) => {
  if (!data.user) {
    window.location.href = "login.html";
    return;
  }

  const user = data.user;

  // -------------------------------
  // LOAD DASHBOARD DATA
  // -------------------------------
  const response = await fetch("https://api.tagmagicapi.com/dashboard?uid=" + user.id);
  const info = await response.json();

  document.getElementById("apiKey").innerText = info.api_key;
  document.getElementById("plan").innerText = info.plan;
  document.getElementById("usage").innerText = info.usage;

  // -------------------------------
  // REGENERATE API KEY
  // -------------------------------
  if (regenBtn) {
    regenBtn.onclick = async () => {
      const regen = await fetch("https://api.tagmagicapi.com/regenerate-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id })
      });

      const newKey = await regen.json();
      document.getElementById("apiKey").innerText = newKey.api_key;
    };
  }
});
