function movePictureToFrontWindow($i_picture, $i_frontWindow) {
	if (!$i_frontWindow) {
		return
	}

	$i_frontWindow.textContent = ''
	if ($i_picture) {
		$i_frontWindow.appendChild($i_picture.cloneNode(true))
	}
}

document.querySelectorAll('.picture-gallery[data-interactive]').forEach(($gallery) => {
	$frontWindow = $gallery.querySelector('.picture-gallery__front-window')
	if (!$frontWindow) {
		return
	}

	const $pictures = $gallery.querySelectorAll('.picture-gallery__pictures > .picture-gallery__picture')
	if ($pictures.length > 0) {
		movePictureToFrontWindow($pictures.item(0), $frontWindow, null, $pictures.item(1))
	}
	$pictures.forEach(($picture, $i) => {
		$picture.addEventListener('click', function(e) {
			movePictureToFrontWindow($picture, $frontWindow, $i > 0 ? $pictures.item($i - 1) : null, $i < $pictures.length ? $pictures.item($i + 1) : null)
		})
	})
})
