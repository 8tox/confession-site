const SUPABASE_URL = "https://zbbidcbmqelfdzmyujex.supabase.co";
const SUPABASE_KEY = "sb_publishable_88HCkBeBTMGM4FQ_BAIr6g_zO3toX8E";

const client = window.supabase.createClient("https://zbbidcbmqelfdzmyujex.supabase.co" , "sb_publishable_88HCkBeBTMGM4FQ_BAIr6g_zO3toX8E");

async function loadPending() {
  const { data, error } = await client
    .from("confessions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("pendingList");
  container.innerHTML = "";

  data.forEach(confession => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${confession.content}</p>
      <button onclick="approve('${confession.id}')">Approve</button>
      <button onclick="remove('${confession.id}')">Delete</button>
      <hr/>
    `;

    container.appendChild(div);
  });
}

async function approve(id) {
  await client
    .from("confessions")
    .update({ status: "approved" })
    .eq("id", id);

  loadPending();
}

async function remove(id) {
  await client
    .from("confessions")
    .delete()
    .eq("id", id);

  loadPending();
}

loadPending();
