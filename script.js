const { createClient } = supabase;

const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

function toggleDark() {
  document.body.classList.toggle("dark");
}

async function loadConfessions() {
  const { data, error } = await client
    .from("confessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("confessions");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(confession => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${confession.content}</p><hr/>`;
    container.appendChild(div);
  });
}

async function submitConfession() {
  const input = document.getElementById("confessionInput");
  if (!input) return;

  const content = input.value.trim();

  if (!content) {
    alert("Please write something.");
    return;
  }

  const { error } = await client
    .from("confessions")
    .insert([{ content: content, status: "pending" }]);

  if (error) {
    console.error(error);
    alert("Error submitting confession.");
    return;
  }

  input.value = "";
  alert("Confession submitted for review.");
}

loadConfessions();
