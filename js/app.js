/**
 * 
 * Programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * 
 * First: Create the content to be rendred in the page and save it in array of objetcs
 * This could represent an API response or data from CMS
 *  
*/ 

var content = [];
for(let i = 1; i <= 4 ; i++) {

    content.push({
        sectionNumber: i,
        firstPar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.',
        secondPar: 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.'
    });

}


/**
 * Start Helper Functions

*/

// 1. Function to dynamically build the sections & main content (Add 4th section)
const buildMainContent = () => {

    const mainTag = document.getElementsByTagName('MAIN')[0];

    mainTag.innerHTML = `<header class="main__hero"> <h1>Landing Page</h1> </header>`;
    
    content.forEach(section => {
        mainTag.innerHTML += 
        `<section id="section${section.sectionNumber}" data-nav="Section ${section.sectionNumber}">` + 
        `<div class="landing__container"> <h2>Section ${section.sectionNumber}</h2>` +
        `<p>${section.firstPar}</p>` +
        `<p>${section.secondPar}</p>` +
        `</div> </section>`;
    });
    
};

// 2. Function to check if element is in viewport
//    Source: https://stackoverflow.com/questions/22326971/add-class-only-for-the-element-in-view
const isScrolledIntoView = (elem) => {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};

// 3. Function to build the navigation menu
const buildNavMenu = () => {

    const navBar = document.getElementById('navbar__list');
    
    content.forEach(section => {

        navBar.innerHTML += 
        `<li>` + 
        `<a href="#section${section.sectionNumber}" class="menu__link">Section ${section.sectionNumber}</a>`+
        `</li>`;

    });
    
};

// 4. Function to display navigation menu when scroll
//    Source: https://www.w3schools.com/howto/howto_js_navbar_slide.asp
const scrollFunction = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.querySelector('.navbar__menu').style.top = "0";
    } else {
        document.querySelector('.navbar__menu').style.top = "-50px";
    }
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// 1. Dynamically build the main content
buildMainContent();

// 2. Dynamically build the navigation menu
buildNavMenu();


/**
 * End Main Functions
 * Begin Events
 * 
*/

/**  
 * 1.
 * Slide down the navigation menu when user scrolls down from the top of the document.
 * 
 * 2.
 * Add Class (your-active-class) when section element is in viewport while scrolling.
 * 
 */
window.onscroll = () => {

    scrollFunction();
    
    $("section").each(function () {
       if (isScrolledIntoView(this) === true) {
            // element is in the viewport
           $(this).addClass('your-active-class');

       }else {
            // element is out of viewport
            $(this).removeClass('your-active-class');
            
        }
    });

 }