document.addEventListener("DOMContentLoaded", () => {
    getAllLogs();
});

// Save new monitoring log
function saveLog() {
    const logData = getLogData();

    if (logData && selectedRow === null) {
        const formData = new FormData();

        // Append regular form data
        formData.append('logCode', logData.logCode);
        formData.append('logDate', logData.logDate);
        formData.append('observationDetails', logData.observationDetails);
        formData.append('fieldCode', logData.fieldCode);

        // Append image file if available
        appendImageFiles(formData);

        $.ajax({
            url: "http://localhost:8080/cropMonitor/api/v1/monitoring",  
            method: "POST",
            data: formData,
            processData: false,  // Prevent jQuery from processing the data
            contentType: false,  // Let the browser set the content type for file uploads
            success: function () {
                alert("Log added successfully.");
                resetForm();
                getAllLogs();
            },
            error: function () {
                alert("Error adding log.");
            }
        });
    }
}

// Update existing monitoring log
function updateLog() {
    const logData = getLogData();

    if (logData && selectedRow !== null) {
        const formData = new FormData();
        const logCode = $(selectedRow).find("td:eq(1)").text();  // Get log code for the update

        // Append regular form data
        formData.append('logCode', logData.logCode);
        formData.append('logDate', logData.logDate);
        formData.append('observationDetails', logData.observationDetails);
        formData.append('fieldCode', logData.fieldCode);

        // Append image file if available
        appendImageFiles(formData);

        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,  
            method: "PATCH",
            data: formData,
            processData: false,  // Prevent jQuery from processing the data
            contentType: false,  // Let the browser set the content type for file uploads
            success: function () {
                alert("Log updated successfully.");
                resetForm();
                getAllLogs();
                $('#addLogModal').modal('hide');
            },
            error: function () {
                alert("Error updating log.");
            }
        });
    }
}

// Fetch all monitoring logs
function getAllLogs() {
    $.ajax({
        url: "http://localhost:8080/cropMonitor/api/v1/monitoring/allLogs", 
        method: "GET",
        success: function (response) {
            const tbody = $('table tbody');
            tbody.empty();

            response.forEach(log => {
                const row = `
                    <tr data-id="${log.logCode}">
                        <td><input type="checkbox"></td>
                        <td>${log.logCode}</td>
                        <td>${log.logDate}</td>
                        <td>${log.observationDetails}</td>
                        <td>${log.observedImage ? `<img src="${log.observedImage}" alt="Observed Image" width="50" height="50">` : 'N/A'}</td>
                        <td>${log.fieldCode}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editLog(${log.logCode})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteLog(${log.logCode})">Delete</button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        },
        error: function (error) {
            console.error("Error:", error);
            alert("Failed to fetch logs data.");
        }
    });
}

// Edit Log (populate form with data for editing)
function editLog(logCode) {
    $.ajax({
        url: `http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,  
        method: "GET",
        success: function (log) {
            $('#logCode').val(log.logCode);
            $('#logDate').val(log.logDate);
            $('#observationDetails').val(log.observationDetails);
            $('#fieldCode').val(log.fieldCode);

            // Show image preview if available
            displayImagePreview(log.observedImage, '#observedImagePreview');

            $('#addLogModal').modal('show');
        },
        error: function (error) {
            console.error("Error:", error);
            alert("Failed to fetch log details.");
        }
    });
}

// Delete Log
function deleteLog(logCode) {
    if (confirm("Are you sure you want to delete this log?")) {
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,  
            method: "DELETE",
            success: function () {
                alert("Log deleted successfully!");
                getAllLogs();
            },
            error: function (error) {
                console.error("Error:", error);
                alert("Failed to delete log.");
            }
        });
    }
}

// Get data from the form
function getLogData() {
    return {
        logCode: $('#logCode').val(),
        logDate: $('#logDate').val(),
        observationDetails: $('#observationDetails').val(),
        fieldCode: $('#fieldCode').val()
    };
}

// Reset form
function resetForm() {
    $('#logForm')[0].reset();
    selectedRow = null;
    $('#observedImagePreview').html('');
}

// Append image file to form data
function appendImageFiles(formData) {
    const observedImage = $('#observedImage')[0].files[0];

    if (observedImage) formData.append('observedImage', observedImage);
}

// Display image preview
function displayImagePreview(imageUrl, previewElementId) {
    if (imageUrl) {
        $(previewElementId).html(`<img src="${imageUrl}" alt="Image" width="100" height="100">`);
    }
}
