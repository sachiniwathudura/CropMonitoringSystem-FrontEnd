let selectedRow = null;

document.addEventListener("DOMContentLoaded", () => {
    getAllLogs();
});

// JWT Token Configuration
const jwtToken = localStorage.getItem("jwtToken");

// Save new monitoring log
function saveLog() {
    const logData = getLogData();

    if (logData) {
        const formData = new FormData();

        // Append form data
        formData.append("logCode", logData.logCode);
        formData.append("logDate", logData.logDate);
        formData.append("observationDetails", logData.observationDetails);
        formData.append("fieldCode", logData.fieldCode);

        // Append image file if available
        appendImageFile("#observedImage", formData, "observedImage");

        $.ajax({
            url: "http://localhost:8080/cropMonitor/api/v1/monitoring",
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Log added successfully.");
                resetForm();
                getAllLogs();
            },
            error: function (xhr) {
                alert(`Error adding log: ${xhr.responseText}`);
            },
        });
    }
}

// Update monitoring log
function updateLog() {
    const logData = getLogData();

    if (logData && selectedRow) {
        const formData = new FormData();
        const logCode = $(selectedRow).data("id");

        formData.append("logCode", logData.logCode);
        formData.append("logDate", logData.logDate);
        formData.append("observationDetails", logData.observationDetails);
        formData.append("fieldCode", logData.fieldCode);

        appendImageFile("#observedImage", formData, "observedImage");

        $.ajax({
            url:`http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Log updated successfully.");
                resetForm();
                getAllLogs();
                $("#addLogModal").modal("hide");
            },
            error: function (xhr) {
                alert(`Error updating log: ${xhr.responseText}`);
            },
        });
    } else {
        alert("No row selected for updating.");
    }
}

// Fetch all monitoring logs
function getAllLogs() {
    $.ajax({
        url: "http://localhost:8080/cropMonitor/api/v1/monitoring/allLogs",
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        success: function (response) {
            const tbody = $("table tbody");
            tbody.empty();

            response.forEach((log) => {
                const row = `
                    <tr data-id="${log.logCode}">
                        <td><input type="checkbox"></td>
                        <td>${log.logCode}</td>
                        <td>${log.logDate}</td>
                        <td>${log.observationDetails}</td>
                        <td>${
                            log.observedImage
                                ? `<img src="data:image/jpeg;base64,${log.observedImage}" alt="Image" width="50" height="50">`
                                : "N/A"
                        }</td>
                        <td>${log.fieldCode}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editLog('${log.logCode}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteLog('${log.logCode}')">Delete</button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        },
        error: function (xhr) {
            alert(`Failed to fetch logs data: ${xhr.responseText}`);
        },
    });
}

// Edit monitoring log
function editLog(logCode) {
    const row = `$(tr[data-id="${logCode}"])`;
    selectedRow = row[0];

    $.ajax({
        url:`http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        success: function (log) {
            $("#logCode").val(log.logCode);
            $("#logDate").val(log.logDate);
            $("#observationDetails").val(log.observationDetails);
            $("#fieldCode").val(log.fieldCode);
            $("#addLogModal").modal("show");
        },
        error: function (xhr) {
            alert(`Failed to fetch log details: ${xhr.responseText}`);
        },
    });
}

// Delete monitoring log
function deleteLog() {
    if (selectedRow !== null) {
        const logCode = $(selectedRow).find("td:eq(1)").text();
        $.ajax({
            url:`http://localhost:8080/cropMonitor/api/v1/monitoring/${logCode}`,
            type: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
            success: function (response) {
                alert("Log deleted successfully!");
                $(selectedRow).remove();
                resetForm();
            },
            error: function (error) {
                alert("Error deleting log: " + error.responseText);
            }
        });
    } else {
        alert("Select a log to delete.");
    }
}

// Get form data
function getLogData() {
    return {
        logCode: $("#logCode").val(),
        logDate: $("#logDate").val(),
        observationDetails: $("#observationDetails").val(),
        fieldCode: $("#fieldCode").val(),
    };
}

// Reset form
function resetForm() {
    $("#logForm")[0].reset();
    selectedRow = null;
    $("#observedImagePreview").html("");
}

// Append image file
function appendImageFile(inputSelector, formData, fieldName) {
    const fileInput = $(inputSelector)[0];
    if (fileInput.files.length > 0) {
        formData.append(fieldName, fileInput.files[0]);
    }
}

// Display image preview
function displayImagePreview(imageBase64, previewSelector) {
    $(previewSelector).html(
        `<img src="data:image/jpeg;base64,${imageBase64}" alt="Preview" width="100" height="100">`
    );
}