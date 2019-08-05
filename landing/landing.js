function toggle2(id, link) {
  var e = document.getElementById(id);
  if (e.style.display == '') {
    e.style.display = 'none';
    link.innerHTML = 'Expand';
  } else {
    e.style.display = '';
    link.innerHTML = 'Collapse';
  }
}