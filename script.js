let noClicks = 0;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("Momary-chan");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = [
    "assets/images/4-opt.webp",
    "assets/images/2-opt.webp",
    "assets/images/1-opt.webp",
    "assets/images/3-opt.webp"
];

// // Preload all webp images from gifs array
// gifs.forEach(src => {
//     const img = new Image();
//     img.src = src;
// });

// at top of file
const preloaded = gifs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// array of messages
const buttonMessages = [
    "Are you sure??", "please", "PLEASE", "You can't do this to me!", "You can't do this to me!"
];

// no button clicked
noButton.addEventListener("click", () => {
    // if (noClicks < maxNoClicks) {
    //     // change image
    //     gifElement.src = gifs[noClicks];
    // }

    if (noClicks < preloaded.length) {
        // change image
        // gifElement.src = gifs[noClicks];
        gifElement.src = preloaded[noClicks].src;
    }

    // change no button text
    noButton.textContent = buttonMessages[noClicks % maxNoClicks];

    // Adjust button width to fit text
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    // decrease the size of the no button
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Calculate the scaled width of the yesButton
    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; // Reflects the actual visual size of the button

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

    // Check if the scaled width is less than the max width
    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; // Increment scale by a smaller step
        yesButton.style.transform = `scale(${yesScale})`;

        // Get the current gap scale factor from CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        // Adjust the gap dynamically
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
        buttonContainer.style.gap = `${newGap}px`;
    }

    // increment the number of clicks
    noClicks++;
});
