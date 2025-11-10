const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// এখানে তোমার Manus AI API key বসাও 👇
const API_KEY = "curl --request POST \
--url https://api.manus.ai/v1/tasks \
--header 'API_KEY: <api-key>' \
--header 'Content-Type: application/json' \
--data '{
"prompt": "Write a function to calculate fibonacci numbers",
"agentProfile": "manus-1.5"
}'"; // <-- এখানে তোমার key দাও

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  addMessage("🤖 Manus AI ভাবছে...", "bot");

  try {
    const res = await fetch("https://api.manus.ai/v1/tasks", {
      method: "POST",
      headers: {
        "API_KEY": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: text,
        agentProfile: "manus-1.5"
      })
    });

    const data = await res.json();
    chatBox.lastChild.remove();

    if (data.error) {
      addMessage("❌ ত্রুটি: " + data.error.message, "bot");
    } else {
      const reply = data.output || data.response || "কোনো উত্তর পাওয়া যায়নি।";
      addMessage(reply, "bot");
    }
  } catch (err) {
    chatBox.lastChild.remove();
    addMessage("❌ নেটওয়ার্ক সমস্যা: " + err.message, "bot");
  }
}

function addMessage(content, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
