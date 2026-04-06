
document.addEventListener("DOMContentLoaded", function () {
    let title = document.getElementById("Title");
    let desc = document.getElementById("Description");

    function onlyText(e) {
        e.target.value = e.target.value.replace(/[^A-Za-z\s.,]/g, "");
    }

    title.addEventListener("input", onlyText);
    desc.addEventListener("input", onlyText);
});

document.addEventListener("DOMContentLoaded", function () {
    let title = document.getElementById("Title");
    let desc = document.getElementById("Description");
    let status = document.getElementById("Status");
    let date = document.getElementById("UploadDate");
    let file = document.getElementById("UploadFile");

    // 🔥 Real-time remove error
    title.addEventListener("input", () => title.classList.remove("error"));
    desc.addEventListener("input", () => desc.classList.remove("error"));
    status.addEventListener("change", () => status.classList.remove("error"));
    date.addEventListener("change", () => date.classList.remove("error"));
    file.addEventListener("change", () => file.classList.remove("error"));
});

function validateForm() {
    let isValid = true;
    let title = document.getElementById("Title");
    let desc = document.getElementById("Description");
    let status = document.getElementById("Status");
    let date = document.getElementById("UploadDate");
    let file = document.getElementById("UploadFile");
    // Title
    if (title.value.trim() === "") {
        title.classList.add("error");
        isValid = false;
    }
    // Description
    if (desc.value.trim() === "") {
        desc.classList.add("error");
        isValid = false;
    }
    // Status
    if (status.value === "Select Status") {
        status.classList.add("error");
        isValid = false;
    }
    // Date
    if (date.value === "") {
        date.classList.add("error");
        isValid = false;
    }
    // File Validation
    if (file.value === "") {
        file.classList.add("error");
        isValid = false;
    }
    else {
        let allowedExtensions = /(\.pdf|\.doc|\.docx|\.jpg|\.jpeg|\.png|\.zip)$/i;

        // Check if file exists
        if (!file.files || file.files.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please select a file.",
            });
            isValid = false;
            return;
        }

        let fileName = file.files[0].name;

        // File type check
        if (!allowedExtensions.test(fileName)) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Only PDF, DOC, DOCX, JPG, PNG, ZIP files are allowed.",
            });
            file.classList.add("error");
            file.value = "";
            isValid = false;
        }

        // File size check (3GB)
        else if (file.files[0].size > 3 * 1024 * 1024 * 1024) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "File size must be less than 3GB.",
            });
            file.classList.add("error");
            file.value = "";
            isValid = false;
        }
    }
    return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
    var id = $('#TaskID').val();
    $.get('/api/Task/GetTaskById?id=' + id)
        .then(function (res) {
            if (res.Status === "Success") {
                $('#Title').val(res.Data.Title);
                $('#Description').val(res.Data.Description);
                $('#Status').val(res.Data.Status); // ✅ important
                var date = res.Data.UploadDate.split('T')[0];
                $('#UploadDate').val(date);
            }
            else if (res.Status === "CatchError") {
                window.location.href = res.URL;
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: res.Message
                });
            }
        })
        .catch(function (err) {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "API error occurred"
            });
        });
});

document.getElementById("UpdateTask").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // 🔹 Loading Alert
    Swal.fire({
        icon: "info",
        title: "Working on it!",
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    let fileInput = document.getElementById("UploadFile");
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0]; // ✅ ADD THIS
        let reader = new FileReader();
        reader.onload = function () {
            let data = {
                TaskID: document.getElementById("TaskID").value,
                Title: document.getElementById("Title").value,
                Description: document.getElementById("Description").value,
                Status: document.getElementById("Status").value,
                UploadDate: document.getElementById("UploadDate").value,
                FileBase64: reader.result,
                FileName: file.name // ✅ ADD THIS
            };
            fetch("/api/task/UpdateTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.Status === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: "Good Job!",
                            text: res.Message,
                            showConfirmButton: true
                        }).then(() => {
                            window.location.href = res.URL;
                        });
                    }
                    else if (res.Status === "CatchError") {
                        window.location.href = res.URL;
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: res.Message,
                            showConfirmButton: true
                        }).then(() => {
                            if (res.URL) {
                                window.location.href = res.URL;
                            }
                        });
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: "API error occurred",
                        showConfirmButton: true
                    });
                });
        };
        reader.readAsDataURL(file);
    }
    //fetch("/api/task/UpdateTask", {
    //    method: "POST",
    //    headers: {
    //        "Content-Type": "application/json"
    //    },
    //    body: JSON.stringify({
    //        TaskID: document.getElementById("TaskID").value,
    //        Title: document.getElementById("Title").value,
    //        Description: document.getElementById("Description").value,
    //        Status: document.getElementById("Status").value,
    //        UploadDate: document.getElementById("UploadDate").value
    //    })
    //})
    //    .then(res => res.json())
    //    .then(res => {

    //        // 🔹 Success Case
    //        if (res.Status === "Success") {
    //            Swal.fire({
    //                icon: "success",
    //                title: "Good Job!",
    //                text: res.Message,
    //                showConfirmButton: true
    //            }).then(() => {
    //                window.location.href = res.URL;
    //            });
    //        }
    //        else if (res.Status === "CatchError") {
    //            window.location.href = res.URL;
    //        }
    //        else {
    //            Swal.fire({
    //                icon: "error",
    //                title: "Error!",
    //                text: res.Message,
    //                showConfirmButton: true
    //            }).then(() => {
    //                if (res.URL) {
    //                    window.location.href = res.URL;
    //                }
    //            });
    //        }
    //    })
    //    .catch(err => {
    //        console.log(err);

    //        Swal.fire({
    //            icon: "error",
    //            title: "Failed!",
    //            text: "API error occurred",
    //            showConfirmButton: true
    //        });
    //    });
});

function updateDateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Greeting based on time
    let greeting = "Hello!";
    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon!";
    } else if (hours >= 17 && hours < 21) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }
    // Update DOM
    document.getElementById("greeting").innerText = greeting;
    document.getElementById("date-time").innerText = `${day} | ${hours}:${minutes}:${seconds}`;
}
// Update every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call