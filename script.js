const PRELOAD_PATHS = [];

for (let i = 1; i <= 6; i++) {
    PRELOAD_PATHS.push(`assets/Open-Close/Open/${i}.png`);
    PRELOAD_PATHS.push(`assets/Open-Close/Close/${i}.png`);
}
for (let i = 1; i <= 8; i++) {
    PRELOAD_PATHS.push(`assets/Page-Flip/Left/${i}.png`);
    PRELOAD_PATHS.push(`assets/Page-Flip/Right/${i}.png`);
}
for (let i = 1; i <= 13; i++) {
    PRELOAD_PATHS.push(`assets/Content-Appear/${i}.png`);
}

PRELOAD_PATHS.push(
    'assets/book.png',
    'assets/close.png',
    'assets/arrowRight.png',
    'assets/profilePic.png',
    'assets/profile_frame.png',
    'assets/item_holder.png',
    'assets/D.png',
    'assets/p2-logo.png',
    'assets/adophin.png',
    'assets/TODO_logo.png',
    'assets/istock_logo.png',
    'assets/sleeqLogo.png',
);

function preloadImages(paths, onProgress) {
    let loaded = 0;
    const total = paths.length;
    paths.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
            loaded++;
            if (onProgress) onProgress(loaded, total);
        };
    });
}

window.addEventListener('load', () => {
    preloadImages(PRELOAD_PATHS, (done, total) => {
        console.log(`Preloaded ${done} / ${total} images`);
        if (done === total) {
            console.log('Images preloaded');
        }
    });
});

const book = document.getElementsByClassName('book_cover');
const bookPopup = document.getElementsByClassName('book_popup');
const animatedBook = document.getElementsByClassName('animated_book');
const animatedPage = document.getElementsByClassName('animated_page');
const leftArrow = document.getElementsByClassName('arrow_left');
const rightArrow = document.getElementsByClassName('arrow_right');
const bookContainer = document.getElementsByClassName('book_container');
const page1 = document.getElementsByClassName('page_1');
const page2 = document.getElementsByClassName('page_2');
const page3 = document.getElementsByClassName('page_3');

var page = 0;
var TotalPages = window.innerWidth < 1000 ? 6 : 3;
var isAnimating = false;

const book_rec = document.getElementById("book");
const room = document.querySelector(".room");
book_rec.addEventListener("mouseenter", () => room.classList.add("glow"));
book_rec.addEventListener("mouseleave", () => room.classList.remove("glow"));

const CLOUD_TYPES = [
    "assets/background/Room-Cloud1.png",
    "assets/background/Room-Cloud2.png"
];
const container = document.getElementById("cloud-container");

function spawnCloud(initial = false) {
    const c = document.createElement("img");
    c.className = "cloud";
    c.src = CLOUD_TYPES[Math.random() < 0.5 ? 0 : 1];

    const sz = 20 + Math.random() * 30;
    c.style.width = sz + "%";

    const start = initial
        ? Math.random() * (100 + sz) - sz
        : -sz;
    c.style.setProperty("--start-left", start + "%");
    c.style.left = start + "%";
    c.style.top = Math.random() * 80 + "%";

    const dur = 80 + Math.random() * 40;
    c.style.setProperty("--slide-duration", dur + "s");
    c.style.setProperty("--blur", ((50 - sz) / 10) + "px");
    c.style.setProperty("--opacity", (0.4 + (sz / 50) * 0.4));

    c.addEventListener("animationend", e => {
        if (e.animationName === "slideCloud") c.remove();
    });

    container.appendChild(c);
}

for (let i = 0; i < 8; i++) spawnCloud(true);

let cloudInterval = null;
function startClouds() {
    if (cloudInterval) return;
    cloudInterval = setInterval(() => spawnCloud(), 3000);
}
function stopClouds() {
    clearInterval(cloudInterval);
    cloudInterval = null;
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopClouds();
    else startClouds();
});

if (!document.hidden) startClouds();

window.addEventListener('resize', function () {
    if (window.innerWidth < 1000) {
        if (page3[0].style.display === "block" || page === 3) {
            page = 5;
            rightArrow[0].style.display = "block";
        }
        TotalPages = 6;
        updateBookPosition();
    } else {
        if (TotalPages > 3) {
            page = 0;
            animatedBook[0].src = "assets/Open-Close/Open/1.png";
            leftArrow[0].style.display = "none";
            rightArrow[0].style.display = "block";
            hidePages();
            animatedPage[0].src = "assets/Content-Appear/13.png";
            animatedPage[1].src = "assets/Content-Appear/13.png";
            updateBookPosition();
        }
        TotalPages = 3;
        updateBookPosition();
    }
});

function updateBookPosition() {
    if (window.innerWidth < 1000) {
        if (page % 2 === 0) {
            animatedBook[0].style.transform = "translate(-67%, -55%)";
            bookContainer[0].style.transform = "translate(-67%, -55%)";
        } else {
            animatedBook[0].style.transform = "translate(-30%, -55%)";
            bookContainer[0].style.transform = "translate(-30%, -55%)";
        }
    } else {
        animatedBook[0].style.transform = "translate(-50%, -55%)";
        bookContainer[0].style.transform = "translate(-50%, -55%)";
    }
}

//  on book pressed 
function bookPressed() {
    bookPopup[0].style.opacity = "1";
    bookPopup[0].style.pointerEvents = "auto";

    page = 0;
    hidePages();
    animatedPage[0].src = "assets/Content-Appear/13.png";
    animatedPage[1].src = "assets/Content-Appear/13.png";
    updateBookPosition();

    nextPage();
}


function closeBook() {
    bookPopup[0].style.opacity = "0";
    bookPopup[0].style.pointerEvents = "none";
}

function hidePages() {
    page1[0].style.display = "none";
    page1[1].style.display = "none";
    page2[0].style.display = "none";
    page2[1].style.display = "none";
    page3[0].style.display = "none";
    page3[1].style.display = "none";
}

function nextPage() {
    updateBookPosition();
    console.log(page);
    if (window.innerWidth > 1000) {
        if (isAnimating == false) {
            animateNext();
            if (page < TotalPages - 1) {
                page++;
                leftArrow[0].style.display = "block";
                rightArrow[0].style.display = "block";
            } else {
                page = TotalPages;
                rightArrow[0].style.display = "none";
            }
        }
    } else {
        if (isAnimating == false) {
            if (page % 2 === 0) {
                animateNext();
            }
            if (page === 0) {
                animateNext();
            }
            if (page < TotalPages - 1) {
                page++;
                leftArrow[0].style.display = "block";
                rightArrow[0].style.display = "block";
            } else {
                page = TotalPages;
                rightArrow[0].style.display = "none";
            }
            updateBookPosition();
        }
    }
}

function prevPage() {
    updateBookPosition();
    if (window.innerWidth > 1000) {
        if (isAnimating == false) {
            animatePrev();
            if (page > 1) {
                page--;
                leftArrow[0].style.display = "block";
                rightArrow[0].style.display = "block";
            } else {
                page = 0;
                leftArrow[0].style.display = "none";
            }
        }
    } else {
        if (isAnimating == false) {
            if (page % 2 === 1) {
                animatePrev();
            }
            if (page === 1) {
                animatePrev();
            }
            if (page > 1) {
                page--;
                leftArrow[0].style.display = "block";
                rightArrow[0].style.display = "block";
            } else {
                page = 0;
                leftArrow[0].style.display = "none";
            }
            updateBookPosition();
        }
    }
}

let pageContentElements = [];

document.addEventListener('DOMContentLoaded', () => {
    pageContentElements = [
        page1[0], page1[1],
        page2[0], page2[1],
        page3[0], page3[1]
    ].filter(el => el);
});

function animateNext() {
    var animation_index = 0;
    isAnimating = true;

    if (page == 0) {
        var animation_length = 6;
        animatedBook[0].src = "assets/Open-Close/Open/1.png";
        var animation = setInterval(function () {
            if (animation_index < animation_length) {
                animation_index++;
                animatedBook[0].src = "assets/Open-Close/Open/" + animation_index + ".png";
            } else {
                clearInterval(animation);
            }

        }, 100);
       
        setTimeout(function () {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 600);

        setTimeout(function () {
            page1[0].style.display = "block";
            page1[1].style.display = "block";
        }, 700);

    } else {
        var animation_length = 8;
        animatedBook[0].src = "assets/Page-Flip/Left/1.png";
        hide_content();
        setTimeout(function () {
            hidePages();
        }, 650);
        setTimeout(function () {
            bookContainer[0].style.opacity = "0";
            var animation = setInterval(function () {
                if (animation_index < animation_length) {
                    animation_index++;
                    animatedBook[0].src = "assets/Page-Flip/Left/" + animation_index + ".png";
                } else {
                    clearInterval(animation);
                }
            }, 100);
        }, 650);
        setTimeout(function () {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 1450);
        setTimeout(function () {
            if (window.innerWidth > 1000) {
                if (page === 2) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "block";
                    page2[1].style.display = "block";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 3) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "block";
                    page3[1].style.display = "block";
                }
            } else {
                if (page === 1 || page === 2) {
                    page1[0].style.display = "block";
                    page1[1].style.display = "block";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 3 || page === 4) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "block";
                    page2[1].style.display = "block";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 5 || page === 6) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "block";
                    page3[1].style.display = "block";
                }
            }
        }, 1550);
    }
    setTimeout(function () {
        isAnimating = false;
    }, 2000);
}

function animatePrev() {
    var animation_index = 0;
    isAnimating = true;

    if (page == 1) {
        var animation_length = 6;
        hide_content();
        setTimeout(function () {
            hidePages();
            bookContainer[0].style.opacity = "0";
            animatedBook[0].src = "assets/Open-Close/Close/1.png";
            var animation = setInterval(function () {
                if (animation_index < animation_length) {
                    animation_index++;
                    animatedBook[0].src = "assets/Open-Close/Close/" + animation_index + ".png";
                } else {
                    clearInterval(animation);
                }
            }, 100);
        }, 650);
    }
    else {
        var animation_length = 8;
        animatedBook[0].src = "assets/Page-Flip/Right/1.png";
        hide_content();
        setTimeout(function () {
            hidePages();
        }, 650);
        setTimeout(function () {
            bookContainer[0].style.opacity = "0";
            var animation = setInterval(function () {
                if (animation_index < animation_length) {
                    animation_index++;
                    animatedBook[0].src = "assets/Page-Flip/Right/" + animation_index + ".png";
                } else {
                    clearInterval(animation);
                }
            }, 100);
        }, 650);
        setTimeout(function () {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 1450);
        setTimeout(function () {
            if (window.innerWidth > 1000) {
                if (page === 1) {
                    page1[0].style.display = "block";
                    page1[1].style.display = "block";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 2) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "block";
                    page2[1].style.display = "block";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 3) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "block";
                    page3[1].style.display = "block";
                }
            } else {
                if (page === 1 || page === 2) {
                    page1[0].style.display = "block";
                    page1[1].style.display = "block";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 3 || page === 4) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "block";
                    page2[1].style.display = "block";
                    page3[0].style.display = "none";
                    page3[1].style.display = "none";
                } else if (page === 5 || page === 6) {
                    page1[0].style.display = "none";
                    page1[1].style.display = "none";
                    page2[0].style.display = "none";
                    page2[1].style.display = "none";
                    page3[0].style.display = "block";
                    page3[1].style.display = "block";
                }
            }
        }, 1550);
    }
    setTimeout(function () {
        isAnimating = false;
    }, 2000);
}

function reveal_content() {
    console.log("reveal");
    var animation_length = 13;
    var animation_index = 0;
    animatedPage[0].src = "assets/Content-Appear/1.png";
    animatedPage[1].src = "assets/Content-Appear/1.png";
    var animation = setInterval(function () {
        if (animation_index < animation_length) {
            animation_index++;
            animatedPage[0].src = "assets/Content-Appear/" + animation_index + ".png";
            animatedPage[1].src = "assets/Content-Appear/" + animation_index + ".png";
        } else {
            clearInterval(animation);
        }
    }, 50);
}

function hide_content() {
    var animation_index = 13;
    animatedPage[0].src = "assets/Content-Appear/13.png";
    animatedPage[1].src = "assets/Content-Appear/13.png";
    var animation = setInterval(function () {
        if (animation_index > 1) {
            animation_index--;
            animatedPage[0].src = "assets/Content-Appear/" + animation_index + ".png";
            animatedPage[1].src = "assets/Content-Appear/" + animation_index + ".png";
        } else {
            clearInterval(animation);
        }
    }, 50);
}

const categories = [
    'All', 'Fullstack', 'Frontend', 'Backend', 'Python', 'C++',
    'AI', 'Website', 'C#', 'Flutter', 'JS Fwks'
];

const filterToggle = document.getElementById('filterToggle');
const filterDropdown = document.getElementById('filterDropdown');
const btnText = filterToggle.querySelector('.btn-text');

function populateFilter() {
    filterDropdown.innerHTML = '';
    categories.forEach((cat, i) => {
        const opt = document.createElement('div');
        opt.className = 'filter-option';
        opt.dataset.value = cat;

        // pick the correct slice-image
        const bg = document.createElement('img');
        bg.className = 'opt-bg';
        if (i === 0) bg.src = 'assets/filter-list-top.png';
        else if (i === categories.length - 1)
            bg.src = 'assets/filter-list-bottom.png';
        else bg.src = 'assets/filter-list-middle.png';

        const txt = document.createElement('span');
        txt.className = 'opt-text';
        txt.textContent = cat;

        opt.append(bg, txt);
        filterDropdown.appendChild(opt);

        opt.addEventListener('click', () => {
            btnText.textContent = cat;
            filterDropdown.style.display = 'none';
            buildInventory();
        });
    });
}

// toggle open/closed
filterToggle.addEventListener('click', () => {
    filterDropdown.style.display =
        filterDropdown.style.display === 'block' ? 'none' : 'block';
});

populateFilter();

// Item selector
let items = [
    {
        name: 'AI Stock Trading',
        image: 'assets/trading-icon.png',
        background_img: 'assets/AI-trading-gif.gif',
        info: 'An AI-powered stock trading system that predicts stock prices and executes trades using web-scraped data and the Alpaca API.',
        link: 'https://github.com/august-b-f/AI-driven-stock-trading',
        github: 'https://github.com/august-b-f/AI-driven-stock-trading',
        categories: ['Backend', 'AI', 'Python',]
    },
    {
        name: 'Encrypted notes',
        image: 'assets/encrypted-notes-app-icon.png',
        background_img: 'assets/encrypted-notes-app-image.png',
        info: 'Encrypted Notes is a C++ desktop app under development that lets you securely store encrypted notes and passwords.',
        link: 'https://www.figma.com/design/POcSSwrrosPtGsnhS3Hdv6/encrypted-notes-app-refined?node-id=0-1&p=f&t=0TWUhWkqDf4VW0oj-0',
        github: 'https://www.figma.com/design/POcSSwrrosPtGsnhS3Hdv6/encrypted-notes-app-refined?node-id=0-1&p=f&t=0TWUhWkqDf4VW0oj-0',
        categories: ['Fullstack', 'Frontend', 'Backend', 'C++']
    },
    {
        name: 'Kernel AI assistant',
        image: 'assets/kernel-ai-assistent-icon.png',
        background_img: 'assets/Kernel-AI-assistant-gif.gif',
        info: 'A Python-based desktop tool that streamlines workflows through AI-powered text creation and advanced, realistic input automation.',
        link: 'https://github.com/August-B-F/Kernel-AI-assistant',
        github: 'https://github.com/August-B-F/Kernel-AI-assistant',
        categories: ['Fullstack', 'Frontend', 'Backend', 'Python', 'AI']
    },
    {
        name: 'Wave',
        image: 'assets/wave-icon.png',
        background_img: 'assets/wave-bg-gig.gif.gif',
        info: 'Wavy is a wave-based pixel art survival game developed during a one-day school hackathon.',
        link: 'https://play.unity.com/en/games/e1ffa6d4-4a72-4122-a6a7-e14b0a1fb984/wavy',
        github: 'https://github.com/august-b-f/WAVY',
        categories: ['Fullstack', 'Frontend', 'Backend', 'AI', 'C#']
    },
    {
        name: 'Cube app',
        image: 'assets/cube-app-icon.png',
        background_img: 'assets/cube-app-gif.gif',
        info: 'Electron.js desktop app for decoding and showcasing multimedia projects hidden inside Alberto Frigo’s 8*8*8 m cube.',
        link: 'https://github.com/august-b-f/cube-app',
        github: 'https://github.com/august-b-f/cube-app',
        categories: ['Frontend', 'JS Fwks']
    },
    {
        name: 'Video platform',
        image: 'assets/Video-platform-icon.png',
        background_img: 'assets/Video-platform-image.png',
        info: 'A React + SQL video platform with content discovery, search, watchlists, and bookmarking in a responsive UI.',
        link: 'https://www.figma.com/design/rtc4oTpJa9aFaPrYSwnrDr/Video-platform?node-id=0-1&p=f&t=kv4hO7lw9fmFz1C3-0',
        github: 'https://github.com/august-b-f/stock-vids',
        categories: ['Fullstack', 'Frontend', 'Backend', 'Website', 'JS Fwks']
    },
    {
        name: 'Cube compiler',
        image: 'assets/Cube-compiler-icon.png',
        background_img: 'assets/Cube-compiler-image.png',
        info: 'This software converts diverse recorded data into engaging multimedia experiences, specifically MP3 audio and MP4 video files.',
        link: 'https://github.com/August-B-F/Cube-convert',
        github: 'https://github.com/August-B-F/Cube-convert',
        categories: ['Fullstack', 'Frontend', 'Backend', 'Python', 'AI']
    },
    {   
        name: 'Ecommerce website',
        image: 'assets/Ecommerce-website-icon.png',
        background_img: 'assets/Ecommerce-website-gif.gif   ',
        info: 'This React front-end provides an e-commerce experience, allowing users to browse products, add items to a cart, and manage their accounts.',
        link: 'https://sleeq.netlify.app/',
        github: 'https://github.com/August-B-F/Ecommerce-website',
        categories: ['Frontend', 'Website', 'JS Fwks']
    },
    {
        name: 'Chatbot website',
        image: 'assets/chat-bot-icon.png',
        background_img: 'assets/chat-bot-gif.gif',
        info: 'A lightweight Davinci-powered chatbot, released before ChatGPT, that forwards your prompts to the OpenAI API and returns responses.',
        link: 'https://august-b-f.github.io/Chatbotium/',
        github: 'https://github.com/august-b-f/Chatbotium',
        categories: ['Frontend', 'AI', 'Website']
    },
    {
        name: 'Demon Back',
        image: 'assets/DemonBack-icon.png',
        background_img: 'assets/DemonBack-bg-gig.gif',
        info: 'My first real project. It features a short story where you help a frog recover his stolen cookies from goblins.',
        link: 'https://github.com/august-b-f/Demon-Back',
        github: 'https://github.com/august-b-f/Demon-Back',
        categories: ['Fullstack', 'Frontend', 'Backend', 'Python']
    },
    {
        name: 'Workout app',
        image: 'assets/Workout-mobile-app-icon.png',
        background_img: 'assets/Workout-app-image.png',
        info: 'A mobile app to create, time, and track custom workout routines with local data storage and progress statistics.',
        link: 'https://www.figma.com/design/IoADShBeWmjrnEeNZBG6Pa/Untitled?node-id=0-1&p=f&t=LGk0WFHv6AM1ozAH-0',
        github: 'https://github.com/August-B-F/Workout-app',
        categories: ['Fullstack', 'Frontend', 'Backend', 'Flutter']
    },
    {
        name: 'Portfolio website',
        image: 'assets/portfolio-wed-icon.png',
        background_img: 'assets/portfolio-bg-gif.gif',
        info: 'An interactive portfolio website showcasing projects and skills through a pixel art book style interface.',
        link: 'https://august-b-f.github.io/retro-pixel-art-portfolio-website/',
        github: "https://github.com/august-b-f/retro-pixel-art-portfolio-website",
        categories: ['Frontend', 'Website']
    },
];

const inventoryGrid = document.querySelector('.inventory_grid');
const selectedItemImage = document.querySelector('.selected_item_image');
const selectedItemName = document.querySelector('.selected_item_name');
const selectedItemInfo = document.querySelector('.selected_item_info');
const selectedItemLink = document.querySelector('.selected_item_link');
const selectedItemGithub = document.querySelector('.selected_item_github');
const selectedItemTags = document.querySelector('.selected_item_tag')

function clearAllFrames() {
    document.querySelectorAll('.list_item')
        .forEach(el => el.style.backgroundImage = '');
}

function buildInventory() {
    const chosenCat = btnText.textContent;

    inventoryGrid.innerHTML = '';

    items
        .filter(item =>
            chosenCat === 'All' ||
            (item.categories && item.categories.includes(chosenCat))
        )
        .forEach((item, idx) => {
            const tile = document.createElement('div');
            tile.className = 'list_item';

            const img = new Image();
            img.src = item.image;
            img.style.cursor = item.image ? 'pointer' : 'default';

            img.addEventListener('click', () => {
                if (!item.image) return;
                clearAllFrames();
                tile.style.backgroundImage = "url('assets/item_frame_glow.png')";
                selectedItemImage.src = item.background_img;
                selectedItemName.textContent = item.name;
                selectedItemInfo.textContent = item.info;
                selectedItemLink.href = item.link;
                selectedItemGithub.href = item.github;
                selectedItemTags.textContent = item.categories.join(", ");
            });

            tile.appendChild(img);
            inventoryGrid.appendChild(tile);

            if (idx === 0) img.click();
        });
}

buildInventory();