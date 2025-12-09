/*
    Check to see if `posts` exists in local storage
    if it does parse the JSON string
    loop through the returned array and add each string to the page as innerHTML.
*/
if (localStorage.getItem(`posts`)) {
    var posts = JSON.parse(localStorage.getItem(`posts`));
    posts.forEach(value => $(`#output`).innerHTML += value);
}

/*
    When the `Add` button is clicked:
        creates a div for a post
        gives it a `post` class
        creates a <p> tag
        add the textareas value to the <p> tag's innerHTML
        create a <time> element
        add the system time to the time elements innerHTML
        add the <time> and <p> to the <div>
        add the <div> to the #output <section>
        create an array of the post's outerHTML strings
        Store the array in local storage as a JSON String
*/
$(`button`)[0].addEventListener(`click`, e => {
    let post = document.createElement(`div`);
    post.setAttribute(`class`, `post`);

    // checkbox (hidden by default)
    let check = document.createElement(`input`);
    check.setAttribute(`type`, `checkbox`);
    check.classList.add(`hidden`);

    let p = document.createElement(`p`);
    p.innerHTML = $(`textarea`).value;

    let time = document.createElement(`time`);
    time.innerHTML = new Date().toLocaleTimeString();

    post.appendChild(check);
    post.appendChild(time);
    post.appendChild(p);
    $(`#output`).appendChild(post);

    // Save all posts to localStorage
    let posts = document.querySelectorAll('.post');
    let arr = Array.from(posts).map(value => value.outerHTML);
    localStorage.setItem(`posts`, JSON.stringify(arr));
});


// ---------- BULK DELETE MODE ----------

let bulkMode = false;  // tracks whether we're in bulk delete mode

// Bulk Delete button
$(`button`)[1].addEventListener(`click`, e => {
    bulkMode = !bulkMode;

    let checks = document.querySelectorAll('.post input[type="checkbox"]');

    checks.forEach(cb => {
        if (bulkMode) {
            cb.classList.remove('hidden'); // show checkboxes
        } else {
            cb.classList.add('hidden');    // hide and reset when turning off
            cb.checked = false;
        }
    });

    if (bulkMode) {
        $(`#all`).classList.remove('hidden');
        $(`#confirm`).classList.remove('hidden');
    } else {
        $(`#all`).classList.add('hidden');
        $(`#confirm`).classList.add('hidden');
    }
});

// Select All button
$(`#all`).addEventListener(`click`, e => {
    let checks = document.querySelectorAll('.post input[type="checkbox"]');
    checks.forEach(cb => {
        if (!cb.classList.contains('hidden')) {
            cb.checked = true;
        }
    });
});

// Confirm button
$(`#confirm`).addEventListener(`click`, e => {
    let posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        let cb = post.querySelector('input[type="checkbox"]');
        if (cb && cb.checked) {
            post.remove(); // Delete checked posts from the page
        }
    });

    // Save remaining posts to localStorage
    let remaining = Array.from(document.querySelectorAll('.post')).map(p => p.outerHTML);

    if (remaining.length > 0) {
        localStorage.setItem('posts', JSON.stringify(remaining));
    } else {
        localStorage.removeItem('posts');
    }
});


/*
Function to select an element. 
selects a list of elements and returns either the list or a single element in the list.
argument: an element selector
return:
    a: if the node list is longer than one item return the node list
    b: if the node list contains one item return the one element
*/
function $(_element) {
    let e = document.querySelectorAll(_element);
    return (e.length > 1) ? e : e[0];
}
