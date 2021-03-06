10.times do 
  Artist.create(name: Faker::Name.name)
end

Artist.all.each do |artist|
  10.times do
    artist.albums.create(album_title: Faker::Hipster.words(2).map(&:capitalize).join(' '))
  end
end

Album.all.each do |album|
  5.times do 
    album.songs.create(song_title: Faker::Hipster.word.capitalize)
  end
end