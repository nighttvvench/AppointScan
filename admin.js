<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        
        body {
            background: 
                linear-gradient(rgba(0, 0, 0, 0.2), 
                rgba(0, 0, 0, 0.2)),
                url('CIT-U_GLE_Building_01.original.png') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Transparent navbar */
        .navbar {
            background-color: transparent !important;
            box-shadow: none;
            border-bottom: none;
            padding: 15px 0;
        }

        /* Logo styling */
        .navbar img {
            background-color: transparent !important;
            filter: drop-shadow(0 0 3px rgba(0,0,0,0.5));
        }

        .container-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .card {
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.93);
            backdrop-filter: blur(2px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        footer {
            flex-shrink: 0;
            background-color: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(2px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Table styling */
        .table {
            background-color: rgba(255, 255, 255, 0.7);
        }

        /* Badge styling */
        .badge.bg-warning {
            background-color: #fef3c7 !important;
            color: #92400e !important;
        }
        
        .badge.bg-success {
            background-color: #d1fae5 !important;
            color: #065f46 !important;
        }
        
        .badge.bg-danger {
            background-color: #fee2e2 !important;
            color: #b91c1c !important;
        }

        /* Button styling */
        .btn-outline-primary {
            border-color: #0d6efd;
            color: #0d6efd;
        }
        
        .btn-outline-primary:hover {
            background-color: #0d6efd;
            color: white;
        }
        
        .btn-outline-danger {
            border-color: #dc3545;
            color: #dc3545;
        }
        
        .btn-outline-danger:hover {
            background-color: #dc3545;
            color: white;
        }
        
        .home-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="container-wrapper">
        <!-- Transparent Navigation Bar -->
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img src="rnlogo.png" width="250" height="150" class="me-2" alt="CIT-U Logo">
            </div>
        </nav>

        <!-- Admin Dashboard Section -->
        <section class="container my-5">
            <div class="row justify-content-center">
                <div class="col-md-11">
                    <div class="card shadow-lg border-0">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h3 class="card-title">Appointments Dashboard</h3>
                                <div class="d-flex gap-3 align-items-center">
                                    <div class="form-group mb-0">
                                        <label for="filter-status" class="form-label me-2">Filter by Status:</label>
                                        <select id="filter-status" class="form-select">
                                            <option value="all">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <button id="refresh-btn" class="btn btn-primary">
                                        <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                                    </button>
                                </div>
                            </div>
                            
                            <div class="table-responsive">
                                <table class="table table-hover" id="appointments-table">
                                    <thead class="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Student Number</th>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Checkup Type</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="appointments-tbody">
                                        <!-- Appointment rows will be added here via JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <div id="no-appointments" class="text-center py-4 d-none">
                                <i class="bi bi-calendar-x fs-1 text-muted"></i>
                                <p class="text-muted mt-2">No appointments found. When students book appointments, they will appear here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Home Button -->
        <a href="index.html" class="btn btn-success home-button rounded-circle p-3" title="Back to Homepage">
            <i class="bi bi-house-door-fill fs-4"></i>
        </a>

        <!-- Footer -->
        <footer class="text-white text-center py-3">
            <p>&copy; 2025 PROJECT RNATION | All Rights Reserved</p>
        </footer>
    </div>

    <!-- Confirmation Modal -->
    <div class="modal fade" id="confirmation-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Confirm Action</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body">
                    Are you sure you want to proceed with this action?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirm-action-btn">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script>
        // Quiet debugging - doesn't output directly to page
        function debugAppointments() {
            const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            if (appointments.length === 0) {
                console.log('No appointments found in localStorage');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Debug silently
            debugAppointments();
            
            loadAppointments();
            
            // Event listeners
            document.getElementById('filter-status').addEventListener('change', loadAppointments);
            document.getElementById('refresh-btn').addEventListener('click', loadAppointments);
        });
        
        // Load appointments from localStorage
        function loadAppointments() {
            const tbody = document.getElementById('appointments-tbody');
            const noAppointmentsMsg = document.getElementById('no-appointments');
            const filterStatus = document.getElementById('filter-status').value;
            
            // Clear existing rows
            tbody.innerHTML = '';
            
            // Get appointments from localStorage
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            
            // Filter appointments if needed
            if (filterStatus !== 'all') {
                appointments = appointments.filter(apt => apt.status === filterStatus);
            }
            
            // Check if there are any appointments
            if (appointments.length === 0) {
                noAppointmentsMsg.classList.remove('d-none');
                return;
            } else {
                noAppointmentsMsg.classList.add('d-none');
            }
            
            // Create a row for each appointment
            appointments.forEach(apt => {
                // Initialize status as pending if not set
                if (!apt.status) {
                    apt.status = 'pending';
                }
                
                // Ensure the appointment has an ID
                if (!apt.id) {
                    apt.id = Date.now().toString().substring(6);
                }
                
                // Format date for display
                let formattedDate = '';
                try {
                    const appointmentDate = new Date(apt.date);
                    formattedDate = appointmentDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                } catch (e) {
                    formattedDate = apt.date || '';
                }
                
                // Format time for display
                let formattedTime = '';
                if (apt.time) {
                    const timeParts = apt.time.split(':');
                    if (timeParts.length === 2) {
                        const hour = parseInt(timeParts[0]);
                        const minute = timeParts[1];
                        const period = hour >= 12 ? 'PM' : 'AM';
                        const hour12 = hour % 12 || 12;
                        formattedTime = `${hour12}:${minute} ${period}`;
                    } else {
                        formattedTime = apt.time;
                    }
                }
                
                // Create table row
                const tr = document.createElement('tr');
                
                // Generate formatted appointment ID for display
                const displayId = apt.id ? `APT-${apt.id.toString().padStart(6, '0')}` : `APT-${Date.now().toString().substring(6)}`;
                
                // Status badge class
                let statusBadgeClass = '';
                switch(apt.status) {
                    case 'pending':
                        statusBadgeClass = 'bg-warning';
                        break;
                    case 'confirmed':
                        statusBadgeClass = 'bg-success';
                        break;
                    case 'cancelled':
                        statusBadgeClass = 'bg-danger';
                        break;
                    default:
                        statusBadgeClass = 'bg-warning';
                }
                
                tr.innerHTML = `
                    <td>${displayId}</td>
                    <td>${apt.studentNumber || ''}</td>
                    <td>${apt.fullname || apt.name || ''}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedTime}</td>
                    <td>${apt.checkupType || apt.type || ''}</td>
                    <td><span class="badge ${statusBadgeClass} text-capitalize">${apt.status}</span></td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary btn-confirm" data-id="${apt.id}" ${apt.status === 'confirmed' ? 'disabled' : ''}>
                                <i class="bi bi-check-circle me-1"></i> Confirm
                            </button>
                            <button class="btn btn-outline-danger btn-cancel" data-id="${apt.id}" ${apt.status === 'cancelled' ? 'disabled' : ''}>
                                <i class="bi bi-x-circle me-1"></i> Cancel
                            </button>
                        </div>
                    </td>
                `;
                
                tbody.appendChild(tr);
            });
            
            // Add event listeners for action buttons
            document.querySelectorAll('.btn-confirm').forEach(btn => {
                btn.addEventListener('click', function() {
                    const appointmentId = this.getAttribute('data-id');
                    updateAppointmentStatus(appointmentId, 'confirmed');
                });
            });
            
            document.querySelectorAll('.btn-cancel').forEach(btn => {
                btn.addEventListener('click', function() {
                    const appointmentId = this.getAttribute('data-id');
                    updateAppointmentStatus(appointmentId, 'cancelled');
                });
            });
        }
        
        // Update appointment status
        function updateAppointmentStatus(appointmentId, newStatus) {
            // Get appointments from localStorage
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            
            // Find the appointment by ID
            const appointmentIndex = appointments.findIndex(apt => apt.id == appointmentId);
            
            if (appointmentIndex !== -1) {
                // Update the status
                appointments[appointmentIndex].status = newStatus;
                
                // Save back to localStorage
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Reload the table
                loadAppointments();
            }
        }
        
        // Helper function to test creating a sample appointment
        function createSampleAppointment() {
            const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            
            const newAppointment = {
                id: Date.now().toString().substring(6),
                studentNumber: '12345678',
                fullname: 'Test Student',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                checkupType: 'Regular',
                status: 'pending'
            };
            
            appointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            // Reload appointments
            loadAppointments();
            return "Sample appointment created successfully!";
        }
    </script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
