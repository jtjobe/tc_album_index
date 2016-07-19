# tc_album_index

## The Postmortem

### TL;DR: I thought getting fancy with some raw SQL and saved IDs in Redis would speed up DB calls and offset lots of DB calls with saved responses in the form of song IDs. It didn't, at least, not nearly enough.

If I had to do this again, I would change a few things:

- Only initiate search via AJAX on form submit, rather than every key stroke
- Structure DB calls to go in a specific order when multiple models are being searched (i.e. Artist & Album or Song & Artist, etc.). After the first model is searched, return the matching IDs and only search the associated objects in the other Model based off of those IDS. This would make only the first Model search scan all rows and drastically lower the rows of the next one or two Model searches.