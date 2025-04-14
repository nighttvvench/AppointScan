// Load all appointments from localStorage
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const tableBody = document.getElementById('appointmentsTable');
    tableBody.innerHTML = '';

    // Update statistics
    document.getElementById('totalAppointments').textContent = appointments.length;
    
    const today = new Date().toISOString().split('T')[0];
    const todayCount = appointments.filter(a => a.date === today).length;
    document.getElementById('todayAppointments').textContent = todayCount;

    // Populate table
    appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.className = 'appointment-row';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${appointment.studentNumber}</td
            <td>${appointment.name}</td>
            <td>${appointment.email}</td>
            <td>${appointment.phone}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteAppointment(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete an appointment
function deleteAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments(); // Refresh the table
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadAppointments);
