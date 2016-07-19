class CatalogSearchService

  def initialize(params)
    @song_title = params[:song_title]
    @album_title = params[:album_title]
    @artist_name = params[:artist_name]
  end

  def call

    # retrieve song_ids that match query through private method get_song_ids
    song_ids = get_song_ids(resource: 'song', query: @song_title)
    album_song_ids = get_song_ids(resource: 'album', query: @album_title)
    artist_song_ids = get_song_ids(resource: 'artist', query: @artist_name)

    # return '0' or '1' for each field based on whether a query was submitted for that field
    # this is used in the following 2 sections (see 'query_makeup')
    song_query = (song_ids == :no_input ? '0' : '1')
    album_query = (album_song_ids == :no_input ? '0' : '1')
    artist_query = (artist_song_ids == :no_input ? '0' : '1')

    # create query_makeup to determine which fields are involved in search
    query_makeup = song_query + album_query + artist_query

    # use query_makeup to find relevant intersections of song_ids from different fields
    case query_makeup
    when '100'
      song_ids = song_ids
    when '010'
      song_ids = album_song_ids
    when '001'
      song_ids = artist_song_ids
    when '110'
      song_ids = song_ids & album_song_ids
    when '011'
      song_ids = album_song_ids & artist_song_ids
    when '111'
      song_ids = song_ids & album_song_ids & artist_song_ids
    end

    # if any songs fit entire query, get songs with song IDs, 
    # then extract and format the relevant information
    if song_ids.any?
      songs = Song.where(multiple_id_lookup(song_ids)).find_each
      songs_info = songs.map{|song| {song_title: song.song_title, album_title: song.album.album_title, artist_name: song.artist.name}}
    else
      songs_info = nil
    end

    return songs_info
  end 

    private

    # creates a long OR chain of IDs to look up Song, ex: Song.where("id = 1 OR id = 3")
    def multiple_id_lookup(ids)
      ids.map{|id| " id = #{id} OR "}.join.chomp(' OR ')
    end

    # get_song_ids checks if the query results already exist in redis based on a 'simple_id', 
    # returns saved results if so, otherwise makes a new search and saves results to redis
    def get_song_ids(resource:, query:)
      # simple ID for Redis key = 'resource-query', ex: artist-jamesbrown, song-whatawonderfulworld
      # most queries will only be part of a word, ex: artist-ja, song-whata
      # uniform format with reg exps to remove whitespace and all lowercase
      if query.present?
        simple_id = resource.gsub(/\s+/, "").downcase + '-' + query.gsub(/\s+/, "").downcase
        resource_ids = $redis.get(simple_id) || set_redis(resource: resource, query: query.downcase, simple_id: simple_id)
        JSON.parse(resource_ids)
      else
        :no_input
      end
    end

    # saves results to Redis for quicker future lookup of same query
    def set_redis(resource:, query:, simple_id:)
      
      case resource
      when 'song'
        resource_ids = Song.where('lower(song_title) LIKE ?', "%#{query}%").all.map(&:id)
      when 'album'
        resource_ids = Album.where('lower(album_title) LIKE ?', "%#{query}%").all.map{|album| album.songs.map(&:id)}.flatten
      when 'artist'
        resource_ids = Artist.where('lower(name) LIKE ?', "%#{query}%").all.map{|artist| artist.songs.map(&:id)}.flatten
      end
      
      $redis.set(simple_id, resource_ids.to_json)
      $redis.expire(simple_id, 12.hour.to_i)
      resource_ids.to_json
    end


end
