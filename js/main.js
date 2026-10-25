const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const navigationLinks = document.querySelectorAll(".sidebar a[href^=\"#\"]");
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactEmail = "ranikumari01936@gmail.com";
const profilePhotoButton = document.getElementById("profile-photo-button");
const profilePhotoInput = document.getElementById("profile-photo-input");
const profilePhoto = document.getElementById("profile-photo");
const profilePhotoPlaceholder = document.getElementById("profile-photo-placeholder");
const profilePhotoStatus = document.getElementById("profile-photo-status");
const photoCropDialog = document.getElementById("photo-crop-dialog");
const photoCropStage = document.getElementById("photo-crop-stage");
const photoCropImage = document.getElementById("photo-crop-image");
const photoCropZoom = document.getElementById("photo-crop-zoom");
const photoCropCancel = document.getElementById("photo-crop-cancel");
const photoCropSave = document.getElementById("photo-crop-save");
const profilePhotoStorageKey = "rani-portfolio-profile-photo";
const maxProfilePhotoSize = 10 * 1024 * 1024;
const maxProfilePhotoDimension = 512;
const cropPreviewSize = 280;
let pendingProfilePhoto = null;
let pendingProfilePhotoUrl = null;
let cropOffsetX = 0;
let cropOffsetY = 0;
let cropPointerPosition = null;

function displayProfilePhoto(photoData) {
    profilePhoto.src = photoData;
    profilePhoto.hidden = false;
    profilePhotoPlaceholder.hidden = true;
    profilePhotoButton.setAttribute("aria-label", "Change profile photo");
    profilePhotoButton.title = "Change profile photo";
}

try {
    const savedProfilePhoto = localStorage.getItem(profilePhotoStorageKey);

    if (savedProfilePhoto) {
        if (savedProfilePhoto.startsWith("data:image/jpeg;base64,")) {
            displayProfilePhoto(savedProfilePhoto);
        } else {
            profilePhotoStatus.textContent = "Saved profile photo data is invalid. Choose a new image.";
        }
    }
} catch (error) {
    profilePhotoStatus.textContent = "Profile photo storage is unavailable in this browser.";
    console.error("Could not load the saved profile photo.", error);
}

profilePhotoButton.addEventListener("click", () => {
    profilePhotoInput.click();
});

function updateCropPreview() {
    if (!pendingProfilePhoto) {
        return;
    }

    const zoom = Number(photoCropZoom.value);
    const scale = Math.max(
        cropPreviewSize / pendingProfilePhoto.width,
        cropPreviewSize / pendingProfilePhoto.height
    ) * zoom;
    const width = pendingProfilePhoto.width * scale;
    const height = pendingProfilePhoto.height * scale;
    const maxOffsetX = Math.max(0, (width - cropPreviewSize) / 2);
    const maxOffsetY = Math.max(0, (height - cropPreviewSize) / 2);

    cropOffsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, cropOffsetX));
    cropOffsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, cropOffsetY));
    photoCropImage.style.width = `${width}px`;
    photoCropImage.style.height = `${height}px`;
    photoCropImage.style.transform = `translate(calc(-50% + ${cropOffsetX}px), calc(-50% + ${cropOffsetY}px))`;
}

function closeCropDialog() {
    if (photoCropDialog.open) {
        photoCropDialog.close();
    }

    pendingProfilePhoto?.close();
    pendingProfilePhoto = null;
    if (pendingProfilePhotoUrl) {
        URL.revokeObjectURL(pendingProfilePhotoUrl);
        pendingProfilePhotoUrl = null;
    }
    photoCropImage.removeAttribute("src");
    cropOffsetX = 0;
    cropOffsetY = 0;
    cropPointerPosition = null;
    profilePhotoButton.focus();
}

profilePhotoInput.addEventListener("change", async () => {
    const [file] = profilePhotoInput.files;

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        profilePhotoStatus.textContent = "Choose an image file to use as your profile photo.";
        profilePhotoInput.value = "";
        return;
    }

    if (file.size > maxProfilePhotoSize) {
        profilePhotoStatus.textContent = "Choose an image smaller than 10 MB.";
        profilePhotoInput.value = "";
        return;
    }

    try {
        pendingProfilePhoto = await createImageBitmap(file);
        cropOffsetX = 0;
        cropOffsetY = 0;
        photoCropZoom.value = "1";
        pendingProfilePhotoUrl = URL.createObjectURL(file);
        photoCropImage.src = pendingProfilePhotoUrl;
        updateCropPreview();
        photoCropDialog.showModal();
        photoCropZoom.focus();
    } catch (error) {
        pendingProfilePhoto?.close();
        pendingProfilePhoto = null;
        if (pendingProfilePhotoUrl) {
            URL.revokeObjectURL(pendingProfilePhotoUrl);
            pendingProfilePhotoUrl = null;
        }
        profilePhotoStatus.textContent = "Could not open that photo. Try another image format.";
        console.error("Could not open the selected profile photo.", error);
    } finally {
        profilePhotoInput.value = "";
    }
});

photoCropZoom.addEventListener("input", updateCropPreview);

photoCropStage.addEventListener("pointerdown", (event) => {
    if (!pendingProfilePhoto) {
        return;
    }

    cropPointerPosition = { x: event.clientX, y: event.clientY };
    photoCropStage.setPointerCapture(event.pointerId);
});

photoCropStage.addEventListener("pointermove", (event) => {
    if (!cropPointerPosition) {
        return;
    }

    cropOffsetX += event.clientX - cropPointerPosition.x;
    cropOffsetY += event.clientY - cropPointerPosition.y;
    cropPointerPosition = { x: event.clientX, y: event.clientY };
    updateCropPreview();
});

photoCropStage.addEventListener("pointerup", () => {
    cropPointerPosition = null;
});

photoCropStage.addEventListener("pointercancel", () => {
    cropPointerPosition = null;
});

photoCropStage.addEventListener("keydown", (event) => {
    const movement = event.shiftKey ? 25 : 10;
    const directions = {
        ArrowUp: [0, movement],
        ArrowDown: [0, -movement],
        ArrowLeft: [movement, 0],
        ArrowRight: [-movement, 0],
    };
    const direction = directions[event.key];

    if (!direction) {
        return;
    }

    event.preventDefault();
    cropOffsetX += direction[0];
    cropOffsetY += direction[1];
    updateCropPreview();
});

photoCropCancel.addEventListener("click", closeCropDialog);

photoCropDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeCropDialog();
});

photoCropDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        event.preventDefault();
        closeCropDialog();
    }
}, true);

photoCropDialog.addEventListener("click", (event) => {
    if (event.target === photoCropDialog) {
        closeCropDialog();
    }
});

photoCropSave.addEventListener("click", async () => {
    if (!pendingProfilePhoto) {
        return;
    }

    photoCropSave.disabled = true;

    try {
        const zoom = Number(photoCropZoom.value);
        const scale = Math.max(
            cropPreviewSize / pendingProfilePhoto.width,
            cropPreviewSize / pendingProfilePhoto.height
        ) * zoom;
        const sourceSize = cropPreviewSize / scale;
        const sourceX = (pendingProfilePhoto.width - sourceSize) / 2 - cropOffsetX / scale;
        const sourceY = (pendingProfilePhoto.height - sourceSize) / 2 - cropOffsetY / scale;
        const canvas = document.createElement("canvas");
        canvas.width = maxProfilePhotoDimension;
        canvas.height = maxProfilePhotoDimension;

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("The browser could not prepare the selected image.");
        }

        context.drawImage(
            pendingProfilePhoto,
            sourceX,
            sourceY,
            sourceSize,
            sourceSize,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const croppedPhoto = await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("The cropped image could not be created."));
                }
            }, "image/jpeg", 0.85);
        });
        const photoData = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("The cropped image could not be read."));
                }
            }, { once: true });
            reader.addEventListener("error", () => reject(reader.error), { once: true });
            reader.readAsDataURL(croppedPhoto);
        });

        localStorage.setItem(profilePhotoStorageKey, photoData);
        displayProfilePhoto(photoData);
        profilePhotoStatus.textContent = "Cropped profile photo saved in this browser.";
        closeCropDialog();
    } catch (error) {
        profilePhotoStatus.textContent = "Could not save the cropped photo. Check browser storage and try again.";
        console.error("Could not crop or save the profile photo.", error);
    } finally {
        photoCropSave.disabled = false;
    }
});

sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("active");

    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        if (!sidebar.contains(anchor)) {
            return;
        }

        if (anchor.matches("ul a")) {
            navigationLinks.forEach((link) => link.removeAttribute("aria-current"));
            anchor.setAttribute("aria-current", "page");
        }

        sidebar.classList.remove("active");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.setAttribute("aria-label", "Open navigation");
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const formData = new FormData(contactForm);
    const senderName = formData.get("name").trim();
    const senderEmail = formData.get("email").trim();
    const message = formData.get("message").trim();
    const subject = `Portfolio message from ${senderName}`;
    const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    contactStatus.textContent = "Opening your email app. Review the message there and select Send to contact Rani.";
    window.location.assign(mailtoUrl);
});
