document.querySelectorAll('.navbar-item').forEach(($navbarItem) => {
	const $childrenItemsContainer = $navbarItem.querySelector('.navbar-item-children')
	if (!$childrenItemsContainer) {
		return
	}
	const $navbarLink = $navbarItem.querySelector('.navbar-link')
	$navbarLink.addEventListener('click', (e) => {
		$childrenItemsContainer.classList.toggle('open')
		e.stopPropagation()
		return false
	})
})

document.addEventListener('click', (e) => {
	document.querySelectorAll('.navbar-item').forEach(($navbarItem) => {
		const $childrenItemsContainer = $navbarItem.querySelector('.navbar-item-children')
		if (!$childrenItemsContainer) {
			return
		}
		if (!$navbarItem.contains(e.target)) {
			$childrenItemsContainer.classList.remove('open')
		}
	})
})
