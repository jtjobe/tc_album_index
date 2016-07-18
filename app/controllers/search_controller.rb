class SearchController < ApplicationController
  before_action :set_query

  def home
  end

  def search
    puts "PARAMS = #{params}"


    if params[:song_ids]
      songs = Song.where(find_ids_statement(params[:song_ids])).find_each
      songs = songs.map{|song| {song: song.song_title, album: song.album.album_title, artist: song.artist.name}}
    else
      songs = nil
    end
    render json: songs
  end

  def artists
    song_ids_by_artist = Artist.where('lower(name) LIKE ?', "%#{@query}%").all.map{|artist| artist.songs.map(&:id)}
    render json: song_ids_by_artist
  end

  def albums
    song_ids_by_album = Album.where('lower(album_title) LIKE ?', "%al%").all.map{|album| album.songs.map(&:id)}
    render json: song_ids_by_album
  end

  def songs
    song_ids = Song.joins(:album).where('lower(song_title) LIKE ?', "%#{@query}%").all.ids
    render json: song_ids
  end

  private

    def set_query
      if params['query']
        @query = params['query'].downcase
      end
    end

    def find_ids_statement(ids)
      # creates a long OR chain of IDs to look up Songs
      ids.map{|id| " id = #{id} OR "}.join.chomp(' OR ')
    end

end