document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('appointment-date').value;

    // Check if all fields are filled
    if (name && email && appointmentDate) {
        // Show success message (could integrate with a backend API here)
        alert(`Appointment successfully booked for ${name} on ${appointmentDate}`);
        // Reset form after submission
        e.target.reset();
    } else {
        // Show an error message if fields are not complete
        alert("Please fill out all fields before submitting.");
    }
});
