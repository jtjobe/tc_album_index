# == Schema Information
#
# Table name: artists
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :artist do
    sequence(:name) { |n| "Artist #{n}" }

    # IMPORTANT - a lot of tests depend on the exact setup below, 
    # change carefully and re-check and adjust tests as you proceed
    #
    # creates an artist with one album with 2 songs
    trait :one_album_artist do
      after(:create) do |artist|
        album = create(:album, artist_id: artist.id)
        2.times do
          create(:song, album_id: album.id)
        end
      end
    end

    # IMPORTANT - a lot of tests depend on the exact setup below, 
    # change carefully and re-check and adjust tests as you proceed
    #
    # creates an artist with two albums, one with 2 songs, one with 3 songs
    trait :two_album_artist do
      after(:create) do |artist|
        2.times do |x|
          album = create(:album, artist_id: artist.id)
          if x % 2 == 0
            2.times do
              create(:song, album_id: album.id)
            end
          else
            3.times do
              create(:song, album_id: album.id)
            end
          end
        end
      end
    end

  end
end
