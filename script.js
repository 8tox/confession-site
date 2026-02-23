const SUPABASE_URL = "https://zbbidcbmqelfdzmyujex.supabase.co";
const SUPABASE_KEY = "sb_publishable_88HCkBeBTMGM4FQ_BAIr6g_zO3toX8E";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

