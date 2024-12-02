// Dynamic data for staff designation breakdown
const staffDesignations = ['Manager', 'Supervisor', 'Worker', 'Clerk']; // Replace with dynamic data
const staffCounts = [5, 10, 20, 8]; // Replace with dynamic data

// Display total staff count in the statistics section
const totalStaffCount = staffCounts.reduce((a, b) => a + b, 0);
document.getElementById("staffCount").textContent = totalStaffCount;

// Pie chart for staff designation breakdown
const designationCtx = document.getElementById('designationChart').getContext('2d');
const designationChart = new Chart(designationCtx, {
type: 'pie',
data: {
labels: staffDesignations,
datasets: [{
    label: 'Staff Designation Distribution',
    data: staffCounts,
    backgroundColor: [
        '#1fb469', // Blue (Manager)
        '#6acb9a', // Orange (Supervisor)
        '#609e7f', // Green (Worker)
        '#cff6e3'  // Red (Clerk)
    ]
}]
},
options: {
responsive: true,
plugins: {
    legend: {
        display: false // Disable default legend
    }
}
}
});