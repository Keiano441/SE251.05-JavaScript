/*
    When the page loads:
    - Check localStorage for `posts`
    - If found, parse JSON and render each saved post
*/
if (localStorage.getItem('posts')) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    posts.forEach(value => {
        $('#output').innerHTML += value;
    });

    // Add a hidden checkbox to each loaded post (if it does not already have one)
    // (written in the style of the W3Schools Array.reduce() example)
    var loadedPosts = document.querySelectorAll('.post');
    Array.prototype.reduce.call(loadedPosts, function (total, value, index, array) {
        var check = value.querySelector('input[type="checkbox"]');
        if (!check) {
            check = document.createElement('input');
            check.type = 'checkbox';
            check.classList.add('hidden');
            value.insertBefore(check, value.firstChild);
        }
        return total;
    }, 0);
}

/*
Function to select an element. 
Selects a list of elements and returns either the list or a single element in the list.
argument: an element selector
return:
    a: if the node list is longer than one item return the node list
    b: if the node list contains one item return the one element
*/
function $(_element) {
    let e = document.querySelectorAll(_element);
    return (e.length > 1) ? e : e[0];
}

/* --- Global references and helpers --- */

// "Add" button
const addBtn = $('button')[0];

// "Bulk Delete" button
const bulkBtn = $('button')[1];

// "Select All" button (must exist in the HTML with id="all")
const selectAllBtn = $('#all');

// "Confirm" button (must exist in the HTML with id="confirm")
const confirmBtn = $('#confirm');

// Textarea and output container
const textarea = $('textarea');
const output = $('#output');

// Are we in "bulk delete" selection mode?
let selectionMode = false;

/*
    Helper: save all current .post elements to localStorage
    (new code written in a style similar to the W3Schools Array.reduce() example)
*/
function savePosts() {
    var postNodes = document.querySelectorAll('.post');

    // Use reduce to build an array of outerHTML strings
    var postsArray = Array.prototype.reduce.call(
        postNodes,
        function (total, value, index, array) {
            total.push(value.outerHTML);
            return total;
        },
        []
    );

    if (postsArray.length > 0) {
        localStorage.setItem('posts', JSON.stringify(postsArray));
    } else {
        localStorage.removeItem('posts');
    }
}

/*
    When the `Add` button is clicked:
        - creates a div for a post
        - gives it a `post` class
        - creates a <p> tag with the textarea's value
        - creates a <time> element with system time
        - creates a hidden checkbox
        - appends everything to #output
        - saves all posts to localStorage
*/
addBtn.addEventListener('click', function (e) {
    let post = document.createElement('div');
    post.setAttribute('class', 'post');

    // checkbox for bulk delete
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.classList.add('hidden'); // hidden by default

    let p = document.createElement('p');
    p.innerHTML = textarea.value;

    let time = document.createElement('time');
    time.innerHTML = new Date().toLocaleTimeString();

    post.appendChild(check);
    post.appendChild(time);
    post.appendChild(p);
    output.appendChild(post);

    savePosts();
    textarea.value = '';
});

/*
    Bulk Delete button:
    - Toggles selection mode
    - Shows/hides all checkboxes
    - Shows/hides Select All and Confirm buttons
    (loops written using Array.reduce() style)
*/
bulkBtn.addEventListener('click', function (e) {
    selectionMode = !selectionMode;

    var checkboxes = document.querySelectorAll('.post input[type="checkbox"]');

    Array.prototype.reduce.call(
        checkboxes,
        function (total, value, index, array) {
            if (selectionMode) {
                value.classList.remove('hidden');
                value.checked = false;
            } else {
                value.classList.add('hidden');
                value.checked = false;
            }
            return total;
        },
        0
    );

    if (selectionMode) {
        selectAllBtn.classList.remove('hidden');
        confirmBtn.classList.remove('hidden');
    } else {
        selectAllBtn.classList.add('hidden');
        confirmBtn.classList.add('hidden');
    }
});

/*
    Select All button:
    - Changes all checkbox input's checked property to true
    (using Array.reduce() style)
*/
selectAllBtn.addEventListener('click', function (e) {
    var checkboxes = document.querySelectorAll('.post input[type="checkbox"]');

    Array.prototype.reduce.call(
        checkboxes,
        function (total, value, index, array) {
            value.checked = true;
            return total;
        },
        0
    );
});

/*
    Confirm button:
    - Deletes checked posts from the page
    - Saves remaining posts to localStorage
    - Exits selection mode and hides checkboxes + buttons
    (also using a reduce-style loop)
*/
confirmBtn.addEventListener('click', function (e) {
    var checkboxes = document.querySelectorAll('.post input[type="checkbox"]');

    // First, remove all checked posts
    Array.prototype.reduce.call(
        checkboxes,
        function (total, value, index, array) {
            if (value.checked && value.parentElement && value.parentElement.classList.contains('post')) {
                value.parentElement.remove();
            }
            return total;
        },
        0
    );

    // Save remaining posts
    savePosts();

    // Turn off selection mode and hide checkboxes/buttons
    selectionMode = false;

    var remainingCheckboxes = document.querySelectorAll('.post input[type="checkbox"]');
    Array.prototype.reduce.call(
        remainingCheckboxes,
        function (total, value, index, array) {
            value.classList.add('hidden');
            value.checked = false;
            return total;
        },
        0
    );

    selectAllBtn.classList.add('hidden');
    confirmBtn.classList.add('hidden');
});
