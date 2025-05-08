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
setInterval(() => spawnCloud(), 3000);

// 
window.addEventListener('resize', function(){
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
    animatedBook[0].src = "assets/Open-Close/Open/1.png";
    leftArrow[0].style.display = "none";
    rightArrow[0].style.display = "block";
    hidePages();
    animatedPage[0].src = "assets/Content-Appear/13.png";
    animatedPage[1].src = "assets/Content-Appear/13.png";
    updateBookPosition();
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
        } else{
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
        if (page < TotalPages - 1 ) {
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

function animateNext() {
    var animation_index = 0;
    isAnimating = true;
    // change the src of the image to if page = 0 then "assets/Open-Close/Open/1.png" then "assets/Open-Close/Open/2.png" etc with a delay of 0.5s
    if (page == 0) {
        var animation_length = 6;
        animatedBook[0].src = "assets/Open-Close/Open/1.png";
        var animation = setInterval(function() {
            if (animation_index < animation_length) {
                animation_index++;
                animatedBook[0].src = "assets/Open-Close/Open/" + animation_index + ".png";
            } else {
                clearInterval(animation);
            }
        }, 100);
        // reveal content after animation
        setTimeout(function() {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 600);
        setTimeout(function() {
            page1[0].style.display = "block";
            page1[1].style.display = "block";
        }, 700);
    } else {
        var animation_length = 8;
            animatedBook[0].src = "assets/Page-Flip/Left/1.png";
            hide_content();
            setTimeout(function() {
                hidePages();
            }, 650);
            setTimeout(function() {
            bookContainer[0].style.opacity = "0";
            var animation = setInterval(function() {
                if (animation_index < animation_length) {
                    animation_index++;
                    animatedBook[0].src = "assets/Page-Flip/Left/" + animation_index + ".png";
                } else {
                    clearInterval(animation);
                }
            }, 100);
        }, 650);
        setTimeout(function() {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 1450);
        setTimeout(function() {
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
    setTimeout(function() {
        isAnimating = false;
    }, 2000);
}

function animatePrev() {
    var animation_index = 0;
    isAnimating = true;

    if (page == 1) {
        var animation_length = 6;
        hide_content();
        setTimeout(function() {
            hidePages();
            bookContainer[0].style.opacity = "0";
            animatedBook[0].src = "assets/Open-Close/Close/1.png";
            var animation = setInterval(function() {
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
        setTimeout(function() {
            hidePages();
        }, 650);
        setTimeout(function() {
                bookContainer[0].style.opacity = "0";
            var animation = setInterval(function() {
                if (animation_index < animation_length) {
                    animation_index++;
                    animatedBook[0].src = "assets/Page-Flip/Right/" + animation_index + ".png";
                } else {
                    clearInterval(animation);
                }
            }, 100);
        }, 650);
        setTimeout(function() {
            bookContainer[0].style.opacity = "1";
            reveal_content();
        }, 1450);
        setTimeout(function() {
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
    setTimeout(function() {
        isAnimating = false;
    }, 2000);
}

function reveal_content() {
    console.log("reveal");
    var animation_length = 13;
    var animation_index = 0;
    animatedPage[0].src = "assets/Content-Appear/1.png";
    animatedPage[1].src = "assets/Content-Appear/1.png";
    var animation = setInterval(function() {
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
    var animation = setInterval(function() {
        if (animation_index > 1) {
            animation_index--;
            animatedPage[0].src = "assets/Content-Appear/" + animation_index + ".png";
            animatedPage[1].src = "assets/Content-Appear/" + animation_index + ".png";
        } else {
            clearInterval(animation);
        }
    }, 50);
}


// Item selector
let items = [
    {name: 'stock vids video', image: 'assets/stockVids.png', info: 'This is a video of the stock videos website.', link: 'https://www.youtube.com/watch?v=brLTOFDcQHU', github: "https://github.com/Bob1883/stock-vids", date: "2024-05-24"},
    {name: 'stock vids kod', image: 'assets/stockVids.png', info: 'Code for the stock videos website.', link: "https://github.com/Bob1883/stock-vids", github: "", date: "2024-05-24"},
    {name: 'stock vids docs', image: 'assets/stockVids.png', info: 'Documentation for the stock videos website.', link: "https://docs.google.com/document/d/1FJIr05hah-VGdzvD1f5c4jaUU-FCmGCKkkLCnMR8sw4/edit?usp=sharing", github: "", date: "2024-05-24"},
    {name: 'Datamodellering', image: 'assets/D.png', info: 'Datamodellering uppgift', link: 'assets/Datamodellering.pdf', date: "2024-03-17"},
    {name: 'P2', image: 'assets/p2-logo.png', info: 'login form', link: 'https://github.com/Bob1883/WebDev-P-2', github: "", date: "2024-03-17"},
    {name: 'P2 desc', image: 'assets/p2-logo.png', info: 'login form desc', link: 'https://youtu.be/jOm2448Xadc', github: "", date: "2024-03-17"},
    {name: 'SQL uppgifter', image: 'assets/adophin.png', info: 'Uppgifter till SQL', link: 'https://docs.google.com/document/d/1BehLc0F-AZpSZYI2JZH28w5CxRChdZ7_3P91NmsBrcc/edit?usp=sharing', github: "", date: "2024-02-29"},
    {name: 'TODO app', image: 'assets/TODO_logo.png', info: 'TODO app, video link and code on github included', link: 'https://youtu.be/VLLHL51Aeyw', github: "https://github.com/Bob1883/TODO-app", date: "2024-02-01"},
    {name: 'TODO app', image: 'assets/TODO_logo.png', info: 'TODO app Documentation', link: 'https://docs.google.com/document/d/1ZqOVgFElVdqhXdjkLaPjqh6QGuNo4dPNrZi6sclVeec/edit?usp=sharing', github: "", date: "2024-01-30"},    
    {name: 'istock documentation', image: 'assets/istock_logo.png', info: 'Documentation for the istock website.', link: 'https://www.itgwebb.se/klass/webb2/august/dokumentation.pdf', github: "", date: "2024-01-11"},
    {name: 'istock', image: 'assets/istock_logo.png', info: 'This is a website for looking at stocks and their information.', link: 'https://www.itgwebb.se/klass/webb2/august/istock_market/', github: "", date: "2024-01-11"},
    {name: 'Sleeq', image: 'assets/sleeqLogo.png', info: "This is a mock-up website for a clothing company; it was just a small school project, so I didn't put too much effort into it.", link: 'https://sleeq.com.sg/', github: "https://github.com", date: "2021-01-01"},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
    {name: 'Empty', image: '', info: ''},
];

let inventoryGrid = document.querySelector('.inventory_grid');
let selectedItemImage = document.querySelector('.selected_item_image');
let selectedItemName = document.querySelector('.selected_item_name');
let selectedItemInfo = document.querySelector('.selected_item_info');
let selectedItemLink = document.querySelector('.selected_item_link');
let selectedItemGithub = document.querySelector('.selected_item_github');
let selectedItemDate = document.querySelector('.selected_item_date');

items.forEach((item, index) => {
    let img = document.createElement('img');
    img.src = item.image;
    // make width 20px 
    if (window.innerWidth > 600) {
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.marginTop = '20%';
    img.style.padding = '10px';
    img.style.border = '4px solid #F7BA43';
    } else {
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginTop = '10%';
        img.style.padding = '10px';
        img.style.border = '4px solid #F7BA43';
    }
    if (item.image !== '') {
        img.style.cursor = 'pointer';
    }

    img.onclick = function() {
        if (item.image === '') {
            return;
        }
        selectedItemImage.src = item.image;
        selectedItemName.textContent = item.name;
        selectedItemInfo.textContent = item.info;
        selectedItemLink.href = item.link;
        selectedItemLink.textContent = item.link;
        selectedItemGithub.href = item.github;
        selectedItemGithub.textContent = item.github;
        selectedItemDate.textContent = item.date;
    };
    inventoryGrid.appendChild(img);

    if (index === 0) {
        img.click();
    }
});

// if size changes, update the size of the images
window.addEventListener('resize', function() {
    inventoryGrid.innerHTML = '';
    items.forEach((item, index) => {
        let img = document.createElement('img');
        img.src = item.image;
        // make width 20px 
        if (window.innerWidth > 600) {
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.marginTop = '20%';
        img.style.padding = '10px';
        img.style.border = '4px solid #F7BA43';
        } else {
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.marginTop = '10%';
            img.style.padding = '10px';
            img.style.border = '4px solid #F7BA43';
        }
        if (item.image !== '') {
            img.style.cursor = 'pointer';
        }

        img.onclick = function() {
            if (item.image === '') {
                return;
            }
            selectedItemImage.src = item.image;
            selectedItemName.textContent = item.name;
            selectedItemInfo.textContent = item.info;
            selectedItemLink.href = item.link;
            selectedItemLink.textContent = item.link;
            selectedItemGithub.href = item.github;
            selectedItemGithub.textContent = item.github;
            selectedItemDate.textContent = item.date;
        };
        inventoryGrid.appendChild(img);

        if (index === 0) {
            img.click();
        }
    });
});