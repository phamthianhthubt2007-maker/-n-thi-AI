const generateBtn = document.getElementById("generate");
const submitBtn = document.getElementById("submit");
const questionDiv = document.getElementById("question");
const resultDiv = document.getElementById("result");
const answerInput = document.getElementById("answer");
const subjectSelect = document.getElementById("subject");

// Hàm gọi AI tạo bài tập
generateBtn.addEventListener("click", async () => {
  const subject = subjectSelect.value;
  const prompt = `Hãy tạo 1 câu hỏi ôn thi THPT môn ${subject === "toan" ? "Toán" : "Vật Lý"} lớp 12, có cả đáp án.`;
  
  questionDiv.innerHTML = `<b>Đang tạo bài tập...</b>`;
  
  const question = await callAI(prompt);
  questionDiv.innerHTML = `<b>Bài tập:</b><br>${question}`;
});

// Hàm gọi AI chấm điểm
submitBtn.addEventListener("click", async () => {
  const userAnswer = answerInput.value;
  
  if (!userAnswer.trim()) {
    resultDiv.innerHTML = `<b style="color: red;">Vui lòng nhập câu trả lời!</b>`;
    return;
  }
  
  const subject = subjectSelect.value;
  const prompt = `Đề bài: ${questionDiv.innerText}. Học sinh trả lời: ${userAnswer}. Hãy chấm điểm (0-10) và nhận xét chi tiết.`;
  
  resultDiv.innerHTML = `<b>Đang chấm điểm...</b>`;
  
  const result = await callAI(prompt);
  resultDiv.innerHTML = `<b>Kết quả:</b><br>${result}`;
});

// Hàm gọi backend API (sử dụng Gemini AI)
async function callAI(prompt) {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.error("Error calling AI:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại.";
  }
}
