require 'rails_helper'

RSpec.describe CatalogSearchService do 

  describe '.call' do 

    before(:all) do
      @one_album_artist = create(:artist, :one_album_artist)
      @two_album_artist = create(:artist, :two_album_artist)
    end
    
    ##
    # Searching by SONG_TITLE only section 
    #  - This section also includes tests for:
    #     1) Complete v. Partial queries
    #     2) Case Sensitivity
    ##

    context 'searching by song_title only + query variation tests' do 

      context 'with a unique query that should only return one song' do 
        
        before(:all) do
          @new_song = create(:song, song_title: 'north_carolina')
        end

        context 'complete v. partial queries' do 
        
          context 'with a complete song_title' do 

            before(:all) do 
              @complete_title = @new_song.song_title
              @query = {song_title: @complete_title}
            end

            subject(:results) { CatalogSearchService.new(@query).call }

            it 'returns only one song' do 
              expect(results.count).to eq 1
            end

            it 'returns the correct song' do 
              expect(results.first[:song_title]).to eq @complete_title 
            end
          end

          context 'with a partial song_title' do 

            before(:all) do 
              @partial_title = @new_song.song_title[2..5]
              @query = {song_title: @partial_title}
            end

            subject(:results) { CatalogSearchService.new(@query).call }

            it 'returns only one song' do
              expect(results.count).to eq 1
            end

            it 'returns the correct song' do
              expect(results.first[:song_title]).to eq @new_song.song_title
            end
          end
        end

        context 'uppercase v. lowercase queries' do 

          context 'with an all uppercase song_title' do 

            before(:all) do 
              @complete_title = @new_song.song_title
              @query = {song_title: @complete_title.upcase}
            end

            subject(:results) { CatalogSearchService.new(@query).call }

            it 'returns only one song' do 
              expect(results.count).to eq 1
            end

            it 'returns the correct song' do 
              expect(results.first[:song_title]).to eq @complete_title 
            end
          end

          context 'with an all lowercase song_title' do 

            before(:all) do 
              @complete_title = @new_song.song_title
              @query = {song_title: @complete_title.downcase}
            end

            subject(:results) { CatalogSearchService.new(@query).call }

            it 'returns only one song' do 
              expect(results.count).to eq 1
            end

            it 'returns the correct song' do 
              expect(results.first[:song_title]).to eq @complete_title 
            end
          end

        end
      end

      context 'with a non-unique query that should return 7 songs' do 

        before(:all) do 
          # All factory songs have song_title's of format "Song X", where X is an incrementing integer
          @partial_title = 'Song'
          @query = {song_title: @partial_title}
        end

        subject(:results) { CatalogSearchService.new(@query).call }

        it 'returns all 6 songs' do 
          expect(results.count).to eq 7
        end
      end
    end

    ##
    # Searching by ALBUM only section 
    ##

    context 'searching by album title only' do

      context 'for an album with two songs' do

        before(:all) do 
          @album = @two_album_artist.albums.first
          @album_title = @album.album_title
          @query = {album_title: @album_title}
        end

        subject(:results) { CatalogSearchService.new(@query).call }

        it 'returns only two songs' do 
          expect(results.count).to eq 2
        end

        it 'returns only songs from the album' do 
          expect(results.first[:album_title]).to eq @album_title
          expect(results.second[:album_title]).to eq @album_title
        end

      end 

      context 'for an album with three songs' do 

        before(:all) do 
          @album = @two_album_artist.albums.second
          @album_title = @album.album_title
          @query = {album_title: @album_title}
        end

        subject(:results) { CatalogSearchService.new(@query).call }

        it 'returns only three songs' do 
          expect(results.count).to eq 3
        end

        it 'returns only songs from the album' do 
          expect(results.first[:album_title]).to eq @album_title
          expect(results.second[:album_title]).to eq @album_title
          expect(results.third[:album_title]).to eq @album_title
        end

      end
    end

    ##
    # Searching by ARTIST only section 
    ##

    context 'searching by artist title only' do

      context 'for an an artist with one album and two songs' do

        before(:all) do 
          @artist_name = @one_album_artist
          @query = {artist_name: @artist_name}
        end

        subject(:results) { CatalogSearchService.new(@query).call }

        it 'returns only one album' do 
          expect(results.map(:album_name)).to eq 2
        end

        it 'returns the correct album' do 
        end

        it 'returns only two songs' do 
        end

        it 'returns the correct songs' do 
        end

      end 

      # context 'for an album with three songs' do 

      #   before(:all) do 
      #     @album = @two_album_artist.albums.second
      #     @album_title = @album.album_title
      #     @query = {album_title: @album_title}
      #   end

      #   subject(:results) { CatalogSearchService.new(@query).call }

      #   it 'returns only three songs' do 
      #     expect(results.count).to eq 3
      #   end

      #   it 'returns only songs from the album' do 
      #     expect(results.first[:album_title]).to eq @album_title
      #     expect(results.second[:album_title]).to eq @album_title
      #     expect(results.third[:album_title]).to eq @album_title
      #   end

      # end
    end
  end
end