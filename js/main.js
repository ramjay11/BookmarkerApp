//listen for form submit
//when submit is clicked, it will call the function saveBookmark
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
//(e) is an event parameter, method preventDefault prevents the flashing behavior
function saveBookmark(e) {
	//get form values// "siteName" and "siteURL" are the input Id
	var siteName = document.getElementById('siteName').value; //.value grabs the input.
	var siteUrl = document.getElementById('siteUrl').value;

	if (!siteName || !siteUrl) {
		alert("Fill in the form. It's not that difficult, Dumbass! It’s scary to think that people like you did graduate from college(if you ever did!)");
		return false;
	}

	// this regex code looks more harder to break than the Da Vinci Code.
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert('/For god' / 's sake, enter a valid URL or get a high five, in the face with a chair');
		return false;
	}

	//saving it as an array of objects
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	//local storage only stores strings by default, but we can parse json into a string
	//local storage test
	//localStorage is part of HTML5// test is the key, "" is the value
	/*localStorage.setItem('test', 'Hello " "');
	console.log(localStorage.getItem('test')); //fetching it from localStorage
	localStorage.removeItem('test');*/

	//test if bookMarks array is null
	if (localStorage.getItem('bookmarks') === null) {
		//initialized array
		var bookmarks = [];
		//add to array that has form values
		bookmarks.push(bookmark);
		///set to localStorage//JSON.stringify will turn json object to string 
		//before we store it to localStorage 
		//it will be stored as string formatted json array
		//re-set it back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//get bookMarks from localStorage
		//JSON.parse will turn sting into json
		var bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookMark to array
		bookMmrks.push(bookmark);
		//reset it back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//re-fetch bookMarks
	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

//delete bookmark
function deleteBookmark() {
	//console.log(url); for testing
	//get bookMarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookMarks
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			//.splice will remove from array
			bookmarks.splice(i, 1);
		}
	}
	//re-set it back to localStorage after we delete it
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	//re-fetch bookMarks
	fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {			
	//get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output
	//innerHTML will put the html that put into bookmarksResults
	//btn btn-default_blank creates a visit button that will route you to the url's website 
	//btn-danger will make it red//href="#" on delete because it won't go anywhere
	//bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="well">' +
			'<h3>' + name +
			'<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
			'<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
			'</h3>' +
			'</div>';
	}

}


