document.getElementById("RegisterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    Swal.fire({
        icon: "info",
        title: "Working on it!",
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    fetch("/api/register/register", {   // ✅ correct endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            UserName: document.getElementById("UserName").value,
            UserEmail: document.getElementById("UserEmail").value,
            UserContact: document.getElementById("Usercontact").value,
            UserAddress: document.getElementById("Useraddress").value,
            UserPassword: document.getElementById("UserPassword").value
        })
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
                    // 🔥 Token save karo
                    localStorage.setItem("token", res.Token);
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
});