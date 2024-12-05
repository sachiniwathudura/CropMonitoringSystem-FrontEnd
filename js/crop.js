// let selectedRow = null;

// // Base API URL 
// const API_URL = "http://localhost:8080/cropMonitor/api/v1/crops";

// // Save Crop function
// async function saveCrop() {
//     const cropData = getFormData();
    
//     if (cropData && selectedRow === null && Object.values(cropData).every(value => value !== "")) {
//         try {
//             const formData = new FormData();
//             appendFormData(formData, cropData); 
//             const response = await fetch(API_URL, {
//                 method: "POST",
//                 body: formData,
//             });

//             if (response.ok) {
//                 alert("Crop details added successfully");
//                 const newCrop = await response.json();
//                 addRowToTable(newCrop);
//                 resetForm();
//                 $('#addCropModal').modal('hide');
//             } else {
//                 alert("Failed to save crop. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error saving crop:", error);
//         }
//     } else {
//         alert("Please fill in all fields or use Update for existing entries.");
//     }
// }

// // Update Crop function
// async function updateCrop() {
//     const cropData = getFormData();
//     if (cropData && selectedRow !== null && Object.values(cropData).every(value => value !== "")) {
//         const cropCode = $(selectedRow).find("td:eq(1)").text();
//         const logCodes = []; 

//         try {
//             const formData = new FormData();
//             appendFormData(formData, cropData);
//             formData.append("logCode", JSON.stringify(logCodes)); // Append logCode list as JSON string
            
//             const response = await fetch(`${API_URL}/${cropCode}`, {
//                 method: "PATCH",
//                 body: formData,
//             });

//             if (response.ok) {
//                 alert("crop update successfully")
//                 updateRowInTable(selectedRow, cropData);
//                 resetForm();
//                 $('#addCropModal').modal('hide');
//             } else {
//                 alert("Failed to update crop. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error updating crop:", error);
//         }
//     } else {
//         alert("Select a crop to update or fill in all fields.");
//     }
// }

// // Delete Crop function
// async function deleteCrop() {
//     if (selectedRow !== null) {
//         const cropCode = $(selectedRow).find("td:eq(1)").text();
//         try {
//             const response = await fetch(`${API_URL}/${cropCode}`, {
//                 method: "DELETE",
//             });

//             if (response.ok) {
//                 alert("Crop delete successfully")
//                 $(selectedRow).remove();
//                 resetForm();
//                 $('#addCropModal').modal('hide');
//             } else {
//                 alert("Failed to delete crop. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error deleting crop:", error);
//         }
//     } else {
//         alert("Select a crop to delete.");
//     }
// }

// // Get All Crops function
// async function getAllCrops() {
//     try {
//         const response = await fetch(`${API_URL}/allcrops`);

//         if (response.ok) {
//             const crops = await response.json();
//             populateTable(crops);
//         } else {
//             alert("Failed to fetch crops. Please try again.");
//         }
//     } catch (error) {
//         console.error("Error fetching crops:", error);
//     }
// }

// // Populate table with data
// function populateTable(crops) {
//     const tbody = $('table tbody');
//     tbody.empty();
//     crops.forEach(crop => addRowToTable(crop));
// }

// // Add a new row to the table
// function addRowToTable(crop) {
//     const newRow = `
//         <tr>
//             <td><input type="checkbox"></td>
//             <td>${crop.cropCode}</td>
//             <td>${crop.commonName}</td>
//             <td>${crop.scientificName}</td>
//             <td>${crop.category}</td>
//             <td>${crop.cropSeason}</td>
//             <td>${crop.fieldCode}</td>
//             <td>${crop.image ? `<img src="data:image/jpeg;base64,${crop.image}" alt="Preview" width="100" height="100">` : 'N/A'}</td>
//             <td>
//                 <button class="btn btn-warning btn-sm" onclick="editCrop(this)">Edit</button>
//                 <button class="btn btn-danger btn-sm" onclick="removeCrop(this)">Delete</button>
//             </td>
//         </tr>
//     `;
//     $('table tbody').append(newRow);
// }

// // Update a row in the table
// function updateRowInTable(row, cropData) {
//     $(row).find("td:eq(1)").text(cropData.cropCode);
//     $(row).find("td:eq(2)").text(cropData.commonName);
//     $(row).find("td:eq(3)").text(cropData.scientificName);
//     $(row).find("td:eq(4)").text(cropData.category);
//     $(row).find("td:eq(5)").text(cropData.cropSeason);
//     $(row).find("td:eq(6)").text(cropData.fieldCode);
//     $(row).find("td:eq(7)").html(cropData.image ? `<img src="data:image/jpeg;base64,${cropData.image}" alt="Preview" width="100" height="100">` : 'N/A');
// }

// // Edit Crop function
// function editCrop(button) {
//     selectedRow = $(button).closest("tr");
//     const cropData = {
//         cropCode: $(selectedRow).find("td:eq(1)").text(),
//         commonName: $(selectedRow).find("td:eq(2)").text(),
//         scientificName: $(selectedRow).find("td:eq(3)").text(),
//         category: $(selectedRow).find("td:eq(4)").text(),
//         cropSeason: $(selectedRow).find("td:eq(5)").text(),
//         fieldCode: $(selectedRow).find("td:eq(6)").text(),
//     };
    
//     $("#cropCode").val(cropData.cropCode);
//     $("#commonName").val(cropData.commonName);
//     $("#scientificName").val(cropData.scientificName);
//     $("#category").val(cropData.category);
//     $("#cropSeason").val(cropData.cropSeason);
//     $("#fieldCode").val(cropData.fieldCode);
// }

// // Remove Crop function
// function removeCrop(button) {
//     const row = $(button).closest("tr");
//     row.remove();
// }

// // Get form data
// function getFormData() {
//     const cropData = {
//         cropCode: $("#cropCode").val(),
//         commonName: $("#commonName").val(),
//         scientificName: $("#scientificName").val(),
//         category: $("#category").val(),
//         cropSeason: $("#cropSeason").val(),
//         fieldCode: $("#fieldCode").val(),
//         image: $("#image")[0].files[0]
//     };
    
//     return cropData;
// }

// // Append form data to FormData object
// function appendFormData(formData, cropData) {
//     formData.append("cropCode", cropData.cropCode);
//     formData.append("commonName", cropData.commonName);
//     formData.append("scientificName", cropData.scientificName);
//     formData.append("category", cropData.category);
//     formData.append("cropSeason", cropData.cropSeason);
//     formData.append("fieldCode", cropData.fieldCode);
    
//     if (cropData.image) {
//         formData.append("image", cropData.image);
//     }
// }

// // Reset form
// function resetForm() {
//     selectedRow = null;
//     $("#cropForm")[0].reset();
//     $("#category").val("");  
// }
// // Initialize the crop table on page load
// $(document).ready(function () {
//     getAllCrops();
// });

let selectedRow = null;

// Base API URL 
const API_URL = "http://localhost:8080/cropMonitor/api/v1/crops";

// Save Crop function
async function saveCrop() {
    const cropData = getFormData();
    
    if (cropData && selectedRow === null && Object.values(cropData).every(value => value !== "")) {
        try {
            const formData = new FormData();
            appendFormData(formData, cropData); 
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Crop details added successfully");
                getAllCrops();
                const newCrop = await response.json();
                addRowToTable(newCrop);
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to save crop. Please try again.");
            }
        } catch (error) {
            console.error("Error saving crop:", error);
        }
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Crop function
async function updateCrop() {
    const cropData = getFormData();
    if (cropData && selectedRow !== null && Object.values(cropData).every(value => value !== "")) {
        const cropCode = $(selectedRow).find("td:eq(1)").text();
        const logCodes = []; 

        try {
            const formData = new FormData();
            appendFormData(formData, cropData);
            formData.append("logCode", JSON.stringify(logCodes)); // Append logCode list as JSON string
            
            const response = await fetch(`${API_URL}/${cropCode}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                alert("crop update successfully")
                updateRowInTable(selectedRow, cropData);
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to update crop. Please try again.");
            }
        } catch (error) {
            console.error("Error updating crop:", error);
        }
    } else {
        alert("Select a crop to update or fill in all fields.");
    }
}

// Delete Crop function
async function deleteCrop() {
    if (selectedRow !== null) {
        const cropCode = $(selectedRow).find("td:eq(1)").text();
        try {
            const response = await fetch(`${API_URL}/${cropCode}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Crop delete successfully")
                $(selectedRow).remove();
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to delete crop. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting crop:", error);
        }
    } else {
        alert("Select a crop to delete.");
    }
}

// Get All Crops function
async function getAllCrops() {
    try {
        const response = await fetch(`${API_URL}/allcrops`);

        if (response.ok) {
            const crops = await response.json();
            populateTable(crops);
        } else {
            alert("Failed to fetch crops. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching crops:", error);
    }
}

// Populate table with data
function populateTable(crops) {
    const tbody = $('table tbody');
    tbody.empty();
    crops.forEach(crop => addRowToTable(crop));
}

// Add a new row to the table
function addRowToTable(crop) {
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${crop.cropCode}</td>
            <td>${crop.commonName}</td>
            <td>${crop.scientificName}</td>
            <td>${crop.category}</td>
            <td>${crop.cropSeason}</td>
            <td>${crop.fieldCode}</td>
            <td>${crop.image ? `<img src="data:image/jpeg;base64,${crop.image}" alt="Preview" width="100" height="100">` : 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCrop(this)">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="removeCrop(this)">Delete</button>
            </td>
        </tr>
    `;
    $('table tbody').append(newRow);
}

// Update a row in the table
function updateRowInTable(row, cropData) {
    $(row).find("td:eq(1)").text(cropData.cropCode);
    $(row).find("td:eq(2)").text(cropData.commonName);
    $(row).find("td:eq(3)").text(cropData.scientificName);
    $(row).find("td:eq(4)").text(cropData.category);
    $(row).find("td:eq(5)").text(cropData.cropSeason);
    $(row).find("td:eq(6)").text(cropData.fieldCode);
    $(row).find("td:eq(7)").html(cropData.image ?`<img src="data:image/jpeg;base64,${cropData.image}" alt="Preview" width="100" height="100">` : 'N/A');
}

// Edit Crop function
function editCrop(button) {
    selectedRow = $(button).closest("tr");
    const cropData = {
        cropCode: $(selectedRow).find("td:eq(1)").text(),
        commonName: $(selectedRow).find("td:eq(2)").text(),
        scientificName: $(selectedRow).find("td:eq(3)").text(),
        category: $(selectedRow).find("td:eq(4)").text(),
        cropSeason: $(selectedRow).find("td:eq(5)").text(),
        fieldCode: $(selectedRow).find("td:eq(6)").text(),
    };
    
    $("#cropCode").val(cropData.cropCode);
    $("#commonName").val(cropData.commonName);
    $("#scientificName").val(cropData.scientificName);
    $("#category").val(cropData.category);
    $("#cropSeason").val(cropData.cropSeason);
    $("#fieldCode").val(cropData.fieldCode);
}

// Remove Crop function
function removeCrop(button) {
    const row = $(button).closest("tr");
    row.remove();
}

// Get form data
function getFormData() {
    const cropData = {
        cropCode: $("#cropCode").val(),
        commonName: $("#commonName").val(),
        scientificName: $("#scientificName").val(),
        category: $("#category").val(),
        cropSeason: $("#cropSeason").val(),
        fieldCode: $("#fieldCode").val(),
        image: $("#image")[0].files[0]
    };
    
    return cropData;
}

// Append form data to FormData object
function appendFormData(formData, cropData) {
    formData.append("cropCode", cropData.cropCode);
    formData.append("commonName", cropData.commonName);
    formData.append("scientificName", cropData.scientificName);
    formData.append("category", cropData.category);
    formData.append("cropSeason", cropData.cropSeason);
    formData.append("fieldCode", cropData.fieldCode);
    
    if (cropData.image) {
        formData.append("image", cropData.image);
    }
}

// Reset form
function resetForm() {
    selectedRow = null;
    $("#cropForm")[0].reset();
    $("#category").val("");  
}
// Initialize the crop table on page load
$(document).ready(function () {
    getAllCrops();
});