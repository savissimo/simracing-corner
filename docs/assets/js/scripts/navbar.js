document.querySelectorAll('.navbar-item').forEach(($navbarItem) => {
	const $childrenItemsContainer = $navbarItem.querySelector('.navbar-item-children')
	$navbarItem.addEventListener('click', (e) => {
		$childrenItemsContainer.classList.toggle('open')
		e.stopPropagation()
		return false
	})
})
