# == Schema Information
#
# Table name: songs
#
#  id         :integer          not null, primary key
#  song_title :string
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Song, type: :model do
  let(:song) { build(:song) }
  
  it "has a valid factory" do
    expect(song).to be_valid
  end

  it "belongs_to an album" do 
    expect(song.album).to be_a Album
  end

  it "belongs_to an artist" do 
    expect(song.artist).to be_a Artist
  end

  context "without a title" do 
    it "is invalid" do 
      no_title_song = build(:song, song_title: nil)
      expect(no_title_song).to_not be_valid
    end
  end

  context "without an album" do 
    it "is invalid" do 
      no_album_song = build(:song, album_id: nil)
      expect(no_album_song).to_not be_valid
    end
  end
end
