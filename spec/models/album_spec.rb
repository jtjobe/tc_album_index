# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  album_title :string
#  artist_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Album, type: :model do
  let(:album) { build(:album) }
  
  it "has a valid factory" do
    expect(album).to be_valid
  end

  it "belongs_to an artist" do 
    expect(album.artist).to be_a Artist
  end

  it "has_many songs" do 
    expect(album.songs).to be_a ActiveRecord::Associations::CollectionProxy
  end

  context "without a title" do 
    it "is invalid" do 
      no_title_album = build(:album, album_title: nil)
      expect(no_title_album).to_not be_valid
    end
  end

  context "without an artist" do 
    it "is invalid" do 
      no_artist_album = build(:album, artist_id: nil)
      expect(no_artist_album).to_not be_valid
    end
  end

end
