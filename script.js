const skillsList = document.getElementById("skills-list");
const resumeForm = document.getElementById("resume-form");
const shareButton = document.getElementById("share-link");
const downloadButton = document.getElementById("download-pdf");

const newSkill = (skill) => {
  const li = document.createElement("li");
  li.textContent = skill;
  return li;
};

resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const skillInput = document.getElementById("skill-input");
  const skill = skillInput.value;
  if (skill) {
    skillsList.appendChild(newSkill(skill));
    skillInput.value = ""; // Clear input field
  }
});

// Unique URL Functionality
const createResumeLink = () => {
  const username = document.getElementById("username").value;
  const uniqueURL = `${window.location.origin}/resume/${username}`;
  return uniqueURL; // Generate unique URL
};

// Share Link Functionality
shareButton.addEventListener("click", () => {
  const resumeLink = createResumeLink(); // Generate unique link
  navigator.clipboard.writeText(resumeLink).then(() => {
    document.getElementById("share-message").textContent = "Link copied to clipboard!";
  });
});

// PDF Download Functionality
downloadButton.addEventListener("click", () => {
  const resumeContent = `
    Name: ${document.getElementById("name").value}
    Title: ${document.getElementById("title").value}
    Skills: ${Array.from(skillsList.children).map(li => li.textContent).join(', ')}
  `;
  
  const blob = new Blob([resumeContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.pdf';
  a.click();
  URL.revokeObjectURL(url);
});
