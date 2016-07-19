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

FactoryGirl.define do
  factory :album do
    sequence(:album_title) { |n| "Album #{n}" }
    artist
  end
end
