function movePictureToFrontWindow($i_picture, $i_frontWindow, $i_prevPictureBtn, $i_nextPictureBtn, $i_pictures) {
	if (!$i_frontWindow) {
		return
	}

	$i_frontWindow.textContent = ''
	if ($i_picture) {
		$i_frontWindow.appendChild($i_picture.cloneNode(true))

		const pictureIndex = $i_pictures.findIndex($p => $p === $i_picture)
		console.log('now showing ' + pictureIndex + '/' + $i_pictures.length)
		if (pictureIndex < 0) {
			$i_prevPictureBtn && ($i_prevPictureBtn.style.display = 'none')
			$i_nextPictureBtn && ($i_nextPictureBtn.style.display = 'none')
		}
		else {
			const prevIndex = pictureIndex > 0 ? pictureIndex - 1 : $i_pictures.length - 1
			const nextIndex = pictureIndex < $i_pictures.length - 1 ? pictureIndex + 1 : 0

			const $newPrevButton = $i_prevPictureBtn.cloneNode(true)
			const $newNextButton = $i_nextPictureBtn.cloneNode(true)

			if ($i_prevPictureBtn) {
				$i_prevPictureBtn.style.display = 'block'
				$i_prevPictureBtn.replaceWith($newPrevButton) // removes all previously registered event listeners
				$newPrevButton.addEventListener('click', function(e) {
					console.log(' ==> moving to ' + prevIndex + '/' + $i_pictures.length)
					movePictureToFrontWindow($i_pictures[prevIndex], $i_frontWindow, $newPrevButton, $newNextButton, $i_pictures)
				})
				console.log('prev now moves to ' + prevIndex + '/' + $i_pictures.length)
			}
			if ($i_nextPictureBtn) {
				$i_nextPictureBtn.style.display = 'block'
				$i_nextPictureBtn.replaceWith($newNextButton) // removes all previously registered event listeners
				$newNextButton.addEventListener('click', function(e) {
					console.log(' ==> moving to ' + nextIndex + '/' + $i_pictures.length)
					movePictureToFrontWindow($i_pictures[nextIndex], $i_frontWindow, $newPrevButton, $newNextButton, $i_pictures)
				})
				console.log('next now moves to ' + nextIndex + '/' + $i_pictures.length)
			}
		}
	}
	else {
		$i_prevPictureBtn && ($i_prevPictureBtn.style.display = 'none')
		$i_nextPictureBtn && ($i_nextPictureBtn.style.display = 'none')
	}
}

document.querySelectorAll('.picture-gallery[data-interactive]').forEach(($gallery) => {
	$frontWindow = $gallery.querySelector('.picture-gallery__front-window')
	if (!$frontWindow) {
		return
	}
	
	const $pictures = [].slice.call($gallery.querySelectorAll('.picture-gallery__pictures > .picture-gallery__picture'))
	if ($pictures.length > 0) {
		const $prevPictureBtn = $gallery.querySelector('.picture-gallery__control[data-action="prev"]')
		const $nextPictureBtn = $gallery.querySelector('.picture-gallery__control[data-action="next"]')
		movePictureToFrontWindow($pictures[0], $frontWindow, $prevPictureBtn, $nextPictureBtn, $pictures)
	}
	$pictures.forEach(($picture, $i) => {
		$picture.addEventListener('click', function(e) {
			const $prevPictureBtn = $gallery.querySelector('.picture-gallery__control[data-action="prev"]')
			const $nextPictureBtn = $gallery.querySelector('.picture-gallery__control[data-action="next"]')
			movePictureToFrontWindow($picture, $frontWindow, $prevPictureBtn, $nextPictureBtn, $pictures)
		})
	})
})
