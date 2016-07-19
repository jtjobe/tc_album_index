# == Schema Information
#
# Table name: artists
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Artist, type: :model do
  let(:artist) { build(:artist) }
  
  it "has a valid factory" do
    expect(artist).to be_valid
  end

  it "has_many albums" do 
    expect(artist.albums).to be_a ActiveRecord::Associations::CollectionProxy
  end

  it "has_many songs" do 
    expect(artist.songs).to be_a ActiveRecord::Associations::CollectionProxy
  end

  context "without a name" do 
    it "is invalid" do 
      no_name_artist = build(:artist, name: nil)
      expect(no_name_artist).to_not be_valid
    end
  end

end
