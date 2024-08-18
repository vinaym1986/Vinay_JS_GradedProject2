let resumes = []; // read and store resume data
let currentIndex = 0;
let filteredResumes = [];

document.addEventListener('DOMContentLoaded', function () {
   fetch('http://localhost:8000/resume')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data); 
        resumes = Array.isArray(data) ? data : []
        filteredResumes = resumes;
        displayResume(currentIndex);
    })
    .catch(error => console.error('Error fetching data:', error));
});

function displayResume(index) {
    const resume = filteredResumes[index];
    const resumeDisplay = document.getElementById('resumeDisplay');
    
    if (resume) {
        resumeDisplay.innerHTML = `
            <div class="header">
                <h1>${resume.basics.name}</h1>
                <p><strong>Applied For:</strong> ${resume.basics.AppliedFor}</p>
            </div>

            <div class="resume-body">
                <div class="sidebar">
                    <div class="personal-info">
                        <h2>Personal Information</h2>
                        <p>Phone: ${resume.basics.phone}</p>
                        <p>Email: ${resume.basics.email}</p>
                        <p>LinkedIn: <a href="${resume.basics.profiles.url}" target="_blank">${resume.basics.profiles.network}</a></p>
                    </div>

                    <div class="technical-skills">
                        <h2>Technical Skills</h2>
                        <ul>
                            ${resume.skills.keywords.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="hobbies">
                        <h2>Hobbies</h2>
                        <ul>
                            ${resume.interests.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="content">
                    <div class="work-experience section">
                        <h2>Work Experience in previous company</h2>
                        <p><strong>Company Name:</strong> ${resume.work.company}</p>
                        <p><strong>Position:</strong> ${resume.work.position}</p>
                        <p><strong>Start Date:</strong> ${resume.work.startDate}</p>
                        <p><strong>End Date:</strong> ${resume.work.endDate}</p>
                        <p><strong>Summary:</strong> ${resume.work.Summary}</p>
                    </div>

                    <div class="projects section">
                        <h2>Projects</h2>
                        <p><strong>${resume.projects.name}:</strong> ${resume.projects.description}</p>
                    </div>

                    <div class="education section">
                        <h2>Education</h2>
                        <ul>
                            <li><strong>UG:</strong> ${resume.education.UG.institute}, ${resume.education.UG.course}, ${resume.education.UG.startDate} - ${resume.education.UG.endDate}, ${resume.education.UG.cgpa}</li>
                            <li><strong>PU:</strong> ${resume.education.PU.institute}, ${resume.education.PU.cgpa}</li>
                            <li><strong>High School:</strong> ${resume.education.School.institute}, ${resume.education.School.cgpa}</li>
                        </ul>
                    </div>

                    <div class="internship section">
                        <h2>Internship</h2>
                        <ul>
                            <li><strong>Company Name:</strong> ${resume.Internship.company}</li>
                            <li><strong>Position:</strong> ${resume.Internship.position}</li>
                            <li><strong>StartDate:</strong> ${resume.Internship.startDate}</li>
							<li><strong>EndDate:</strong> ${resume.Internship.endDate}</li>
                            <li><strong>Summary:</strong>${resume.Internship.Summary}</li>
                            </li>
                        </ul>
                    </div>

                    <div class="achievements section">
                        <h2>Achievements</h2>
                        <ul>
                            ${resume.achievements.Summary.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Set up button visibility
        document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display = index === filteredResumes.length - 1 ? 'none' : 'inline-block';
    } else {
        resumeDisplay.innerHTML = 'No resume available';
    }
}


function nextResume() {
    if (currentIndex < filteredResumes.length - 1) {
        currentIndex++;
        displayResume(currentIndex);
    }
}

function prevResume() {
    if (currentIndex > 0) {
        currentIndex--;
        displayResume(currentIndex);
    }
}


function filterResumes() {
    const searchValue = document.getElementById('jobSearch').value.toLowerCase();
    
    if (resumes) {
		// Check if searchValue is empty
    if (searchValue === '') {
        // Show error message if search value is empty
        document.getElementById('resumeDisplay').innerHTML = `
            <div style="text-align:center; display: flex; justify-content: center; align-items: center; border: 2px solid #f44336; padding: 20px; border-radius: 8px; background-color: #fbe9e7;">
                <p style="font-size: 48px; margin-right: 15px; color: #f44336;">⚠️</p>
                <p style="margin: 0; font-size: 18px; color: #f44336;">No search results found</p>
            </div>
        `;
        document.getElementById('prevBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'none';
        filteredResumes = []; 
		return;
    }
	
        filteredResumes = resumes.filter(resume => resume.basics.AppliedFor.toLowerCase().includes(searchValue));
    
        if (filteredResumes.length === 0) {
            document.getElementById('resumeDisplay').innerHTML = `
            <div style="text-align:center; display: flex; justify-content: center; align-items: center; border: 2px solid #f44336; padding: 20px; border-radius: 8px; background-color: #fbe9e7;">
                <p style="font-size: 48px; margin-right: 15px; color: #f44336;">⚠️</p>
                <p style="margin: 0; font-size: 18px; color: #f44336;">No search results found</p>
            </div>
        `;
            document.getElementById('prevBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
        } else {
            currentIndex = 0;
            displayResume(currentIndex);
        }
    } else {
        console.error('Resumes data is not available.');
    }
}

