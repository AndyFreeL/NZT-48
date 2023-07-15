export function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.querySelector('body').classList.add(className);
	});
}

//MenuBurger===========================================
let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
if (iconMenu != null) {
    let menuBody = document.querySelector(".menu__body");
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
        body.classList.toggle("_no-scroll")
    });
}
;
//====================================================

//MenuDropdown===========================================
const el = document.querySelector(".dropdown-menu")

document.addEventListener('click',function (e){
    let open = document.querySelector(".open");
    if (e.target === el || el.contains(e.target) || e.target === open) {
        return;
    }
    if(open){
        open.classList.remove("open")
    }
})

const ddMenus = document.querySelectorAll(".menu__link");
if (ddMenus != null) {
    for (let i = 0; i < ddMenus.length; ++i) {
        ddMenus[i].addEventListener('click', function (e) {
            setTimeout(()=>{ddMenus[i].classList.toggle("open")},50)
        });
    }
}
//====================================================
