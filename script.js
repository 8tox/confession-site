const SUPABASE_URL = "https://zbbidcbmqelfdzmyujex.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function toggleDark() {
  document.body.classList.toggle("dark");
}

async function loadConfessions() {
  const { data, error } = await supabase
    .from("confessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("confessions");
  container.innerHTML = "";

  data.forEach(confession => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${confession.content}</p>
      <hr/>
    `;
    container.appendChild(div);
  });
}

loadConfessions();

async function submitConfession() {
  const input = document.getElementById("confessionInput");
  const content = input.value.trim();

  if (!content) {
    alert("Please write something.");
    return;
  }

  const { error } = await supabase
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
