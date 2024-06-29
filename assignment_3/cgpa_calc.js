// Adjusted code to include credit value inputs and improved grade points mapping

document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    const totalCourses = parseInt(document.getElementById('totalCourses').value, 10);
    const inputContainer = document.getElementById('inputContainer');

    // Clear previous inputs
    inputContainer.innerHTML = '';
 
    for (let i = 0; i < totalCourses; i++) {
        // Create input for course name
        const courseInput = document.createElement('input');
        courseInput.type = 'text';
        courseInput.placeholder = `Course ${i + 1} Code`;
        courseInput.id = `courseCode${i}`;
        inputContainer.appendChild(courseInput);

        // Create input for credit value
        const creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.placeholder = 'Credits';
        creditInput.id = `credits${i}`;
        inputContainer.appendChild(creditInput);

        // Create select for grade
        const gradeSelect = document.createElement('select');
        gradeSelect.id = `grade${i}`;
        ['A', 'B', 'C', 'D', 'F'].forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.text = grade;
            gradeSelect.appendChild(option);
        });
        inputContainer.appendChild(gradeSelect);

        // Line break
        inputContainer.appendChild(document.createElement('br'));
    }

    document.getElementById('calculateCGPA').style.display = 'block'; // Show calculate button
});

const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 }; // Adjusted grade points mapping

document.getElementById('calculateCGPA').addEventListener('click', function() {
    const totalCourses = parseInt(document.getElementById('totalCourses').value, 10);
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < totalCourses; i++) {
        const courseCode = document.getElementById(`courseCode${i}`).value;
        const grade = document.getElementById(`grade${i}`).value;
        const creditValue = parseInt(document.getElementById(`credits${i}`).value, 10); // Use entered credit value

        const points = gradePoints[grade] * creditValue;

        totalPoints += points;
        totalCredits += creditValue;
    }

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0; // Prevent division by zero
    document.getElementById('cgpaResult').innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;
});