Mobilebone.onpagefirstinto = function(pageinto) {
	// image size
	var ele_screen_shot = null, src_screen_shot = '';
	if (pageinto.id == "pageChatList" && (ele_screen_shot = document.getElementById("screenShot"))) {
		src_screen_shot = ele_screen_shot.getAttribute("data-src");
		if (!ele_screen_shot.src) ele_screen_shot.src = src_screen_shot;
		// ensure image size
		ele_screen_shot.width = window.innerWidth;
		ele_screen_shot.height = Math.round(ele_screen_shot.width * 2405 / 720);
	}

	// bind custom scroll events for content
	var weChatScroll = new IScroll(pageinto.querySelector(".content"), {
		tap: true
	});
	/Android/i.test(navigator.userAgent) && pageinto.addEventListener('tap', Mobilebone.handleTapEvent, false);
};

Mobilebone.callback = function(pageinto, pageout) {
	var header = document.querySelector("body > .header"), menu = document.querySelector(".menu");

	// element of link at bottom
	var ele_link_in = null, ele_link_out = null;
	// element of header
	var ele_header_in = null, ele_header_out = null;
	if (pageinto) {
		ele_link_in = menu.querySelector("a[href$="+ pageinto.id +"]");
		ele_header_in = pageinto.querySelector(".header");
		if (pageout) {
			ele_link_out = menu.querySelector("a[href$="+ pageout.id +"]");
			ele_header_out = pageout.querySelector(".header");
		} else if (ele_header_in == null) {
			header.className = "header in";	
			menu.className = "menu in";		
		}
		if (ele_header_in == null) {
			ele_link_in && ele_link_in.classList.add("active");
			ele_link_out && ele_link_out.classList.remove("active");
			
			if (ele_header_out != null) {
				header.className = "header slide reverse in";	
				menu.className = "menu slide reverse in";		
			}
		} else if (pageout && ele_header_out == null) {
			// include header, slide-out fixed header
			header.className = "header slide out";	
			menu.className = "menu slide out";	
		}
	}
};